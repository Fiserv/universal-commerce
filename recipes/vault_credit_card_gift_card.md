
# Step 1: Create a customer profile using POST /v1/customers

## POST /v1/customers

Parameters

| Name| Data Type| Parameter Type| Required| Max Length
|:----------|:----------|:----------|:----------|:----------
| externalId| string| body| yes| 50

## Sample Request 
```json
 {
 	"customer": {
 		"externalId": "17395001"
 	}
 }
```
## Response (201 - Created)
```json
{
    "id": "96328bee7fc64adc91e20064ca230e43",
    "externalId": "17395001"
}
```

# Step 2: Retrieve Token & Encryption Key using POST - /v1/ tokens

## Retrieve Token & Encryption Key

## Parameters

| Name| Data Type| Parameter Type| Required| Max Length
|:----------|:----------|:----------|:----------|:----------
| fdCustomerId| string| body| Conditional*| 32
| publicKeyRequired| Boolean| body| yes| 

* Either fdCustomerId or deviceInfo has to be provided
## Sample Request with fdcustomerID
```json
{
    "token": {
        "fdCustomerId": "26f2988101f34d05b226fb697320f4d7"
    },
    "deviceInfo": {
        "data": [
            {
                "dataCapture": {
                    "dataEventId": "10b7f7a0-fb7f-42bd-9d8a-edc82d2e43a8"
                },
                "provider": "RAVELIN"
            }
        ],
        "id": "10b7f7a0-fb7f-42bd-9d8a-edc82d2e43a8",
        "kind": "MOBILE"
    },
    "publicKeyRequired": true
}
```
## Sample Response 

```json
{
	"tokenId": "e66kfaIZ2WzeOwlYaSAYSVwDzppO",
	"issuedOn": 1667932973722,
	"expiresInSeconds": 1199,
	"publicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxxH8qqCcFjSFFz/yet93DDoyEniR1+J+befEqdWfGuEIuur+yXQiqITeBAWfRjRsWBsagaaBvskQjp6W0be+ehSJjdpDxm6AHcsmoRE1iEv7FP/jLUVkryUBTB8+cMePQ7JJ2gpmTFzVXwMUMJJluYYzzDmrL5XP2g3dlOyxYWE0POYaVh2+QjzFBA/aRaneB7jSfcda8ZNTBdDHw6JKoessLxFVpddh1j1NJIvtFv9BOi9MG9hC4er1/a6mOo1R4iyq+Pny0ZDcP5HGgDZGwE4zu1de1hEdJUlbjt9Kv5T7H2zSs0Daj2DwXYydPzIED4cwx19EsUg7aJt0SrZSoQIDAQAB",
	"algorithm": "RSA/NONE/PKCS1Padding",
	"status": "ACTIVE"
}
```

# Step 3: Obtain a Nonce 

**Here you will have 2 options to obtain a nonce:** 

1) By Encrypting PAN details using POST \- /v1/account\-tokens API call. 

2) Through Hosted Pages (if applicable). A nonce is generated through hosted pages after a user submits credit card details.

## 1) Encrypting PAN details using POST - /v1/account-tokens

## HTTP Header parameters for this API

Authorization: - Bearer <Oauth Token ID>
Api-Key:-  <apiKey>
Timestamp:- <timestamp>
Client-Request-Id: - <clientRequestId>

## Encrypted PAN details for Generating Nonce.

## Parameters

| Name| Data Type| Parameter Type| Required| Max Length
|:----------|:----------|:----------|:----------|:----------
| cardNumber| string| body| yes| -
| type| string| body| yes| 7
| securityCode| string| body| yes| -
| billingAddress| String| body| Yes| -
| referenceToken| String| body| Yes| -
| tokenType| String| body| Yes| -
| fdCustomerId| string| body| Yes| 32
| billingPhone| String| Body| Optional (Mandatory only if Fraud is enabled)| -

## Sample Request 
```json
 {
  "account": {
    "type": "CREDIT",
    "credit": {
      "cardNumber": "ENC_[av51dbDpLj+k0a81v0G0Hb….tLyUNMpnhwf9fuWdA==]",
      "nameOnCard": "John Smith",
      "cardType": "AMEX",
      "billingAddress": {
        "type": "work",
        "streetAddress": "100 Universal City Plaza",
        "locality": "Hollywood",
        "region": "CA",
        "postalCode": "91608",
        "country": "US",
        "formatted": "100 Universal City Plaza\nHollywood, CA 91608 US",
        "primary": true
      },
      "expiryDate": {
        "month": "ENC_[LJijU+vw0zMrYRg9nDRzHSc7cP…1qgAqu+k4p9L/pbOg==]",
        "year": "ENC_[jIUaIaBWixHK9PngOefGg+… qoZmBqC6596iTlR3f5FIEg==]"
      },
      "securityCode": "ENC_[AWFVyD2c…BXbHOh3YgkGpwdvAddKniNVOHxC69ifOg==]"
    }
  },
  "token": {
    "tokenType": "CLAIM_CHECK_NONCE"
  }
}

 
```
## Sample Response 

```json
{
   "token": {
      "tokenId": "a16cd463-88e8-4a9e-b2a6-d0985e3af45e",
      "tokenProvider": "UCOM",
      "tokenType": "CLAIM_CHECK_NONCE"
   }
}

  ```
  
# Step 4: Create an Account using POST /v1/customers/{fdCustomerId}/accounts

## POST /v1/customers/{fdCustomerId}/accounts 

## HTTP Header parameter for this API

Api-Key: <key>
Authorization: HMAC <signature>
Content-Type: application/json
Timestamp: <time>
Client-Request-Id: <$guid>
Client-Token: <accessToken>

Parameters

| Name| Data Type| Parameter Type| Required| Max Length
|:----------|:----------|:----------|:----------|:----------
| fdCustomerId| string| path| yes| 32
| tokenId| string| body| yes| 36
| tokenProvider| string| body| yes| 4
| tokenType| string| body| yes| 17
| type| String| Body| Yes| 7
| cardNumber| String| Body| Yes| 16
| securityCode| String| Body| Yes| 8
| expiryDate| String| Body| Yes| -

## Sample Request (Nonce Enrollment) 
```json
 {
“account”: {
   “token”: {
        “tokenId”: “85886d56-6204-4829-9bd9-eb4f83b2d725”,
        “tokenProvider”: “UCOM”,
        “tokenType”: “CLAIM_CHECK_NONCE”
       }
     }
}
  ```

## Sample Request - Physical GiftCard Enrollment
```json
{
“account”:{ 
      “type”:”PREPAID”,
      “prepaid”:{ 
         “cardNumber”: “7777090732176755”,
         “securityCode”:”54112073”,
        “expiryDate”: {
              “month”: “12”,
              “year”: “20”
          }
      }
   }
}
```  

## Response (201 - Created)

| Sample Response
|:----------
| {    "fdAccountId": "8a7faa266838a04d01683d220fd8001b",    "type": "CREDIT",    "status": "ACTIVE",    "credit": {        "alias": "0024",        "cardType": "VISA",        "expiryDate": {            "month": "06",            "year": "19",            "singleValue": "0619"        }    }}

# Step 5: Make a payment using POST /v1/payments/sales

## Sale transaction 

## HTTP Header parameter for this API (Only for Nonce based sale)

| Api-Key: <key>Authorization: HMAC <signature>Content-Type: application/jsonTimestamp: <time>Client-Request-Id: <$guid>Client-Token: <accessToken>
|:----------

## Parameters

| Attributes| Data Type| Required| Max Length
|:----------|:----------|:----------|:----------
| fdCustomerId| String| Optional| Maximum 36 characters.
| orderId| String| Required| Maximum 36 characters.
| storeId| String| Conditional| FD Issued - Alpha-Numeric 
| fundingSource| String| Optional| Credit, prepaid
| requestedAmount| String| Required| Dollars. Cents
| Number| Integer| Required| USD = 840
| nameOnCard| String| Optional| Maximum 50 characters
| cardType| String| Required| VISA, MASTERCARD,DISCOVER,AMEX
| securityCode| String| Optional| Payment card security code (for Gift card)
| Type| String| Optional| Canonical type values of "work", "home", and "other".
| streetAddress| String| Optional| The full street address component, which may include house number, street name, P.O. box, and multi-line extended street address information.
| Locality| String| Optional| The city or locality component.
| Region| String| Optional| 4
| postalCode| String| Required| 5
| Country| String| Optional| The country name component. When specified, the value MUST be in ISO 3166-1 "alpha-2" code format; e.g., the United States and Sweden are "US" and "SE", respectively.
| Formatted| String| Optional| The full mailing address, formatted for display or use with a mailing label.
| Primary| boolean| Optional| Indicates if this is the default address for the associated resource. It only has meaning when used in a set or array of addresses.
| Month| String| Required| Month format ‘MM’
| Year| String| Required| Year format ‘YY’
| Data*| String| Required for all inapps| 
| Signature*| String| Required for apple pay| 
| ephemeralPublicKey*| String| Required for apple pay| 
| public key hash*| String| Required for all inapps| 
| transactionId *| String| Required for apple pay only| 
| application data*| String| Required for apple pay only| 
| billingPhone| String| Required for anonymous sale, apple and google pay sale Optional for anonymous sale, apple and google pay sale (Mandatory only if Fraud is enabled)| 

* \- Only for Inapp Sale requests

## Request  

| Sample Request - anonymous credit card sale transaction ( Nonce Payment)
|:----------
| {    "fdCustomerId": "cfd7421e5aa741c882cb0d5da4c9e41b",      "sale": {       "storeId":"99999",        "fundingInfo": {            "fundValue": 1,            "currencyCode": {                "code": "USD",                "number": 840,                "digits": 2,                "currency": "US Dollar"            },            "fundingSource": {              "saveToVault": false,                "token":{                  "tokenId":"a7f45edc-a901-4ff3-8ec7-3816b537cbcd",                  "tokenProvider":"CLAIM_CHECK_NONCE"                }            }        }    }    }

## Request  

| Sample Request - Vaulted card sale transaction
|:----------
| {      "fdCustomerId":" s014368kjkda1ordercbb0c1cba131",   "sale":{         "orderId":"s0143684e1a1ordercbb0c1cba131",      "storeId":"999999",      "requestedAmount":100,      "currencyCode":{            "number":840      },      "vaultedAccount": {        "fdAccountId": "muid-3d4f2ac...c91014f2dc1"      },       }}

## Request  

| Sample Request - Applepay sale transaction
|:----------
| {     "fdCustomerId":" s014368kjkda1ordercbb0c1cba131",   "sale":{         "orderId":"s0143684e1a1ordercbb0c1cba131",      "storeId":"999999",      "requestedAmount":100,      "currencyCode":{            "number":840      },"fundingSource":{      "applePay": {        "version": "EC_v1",        "decryptAlias": "merchant.com.XXXXX.test.applepay",        "signature": "MIAGCSqGSIb......AAAA==",        "data": "3CguW5ecfTz...Yuhw=",        "applicationData": "VEVTVA==",        "dPanLast4": "9876",        "header": {          "applicationDataHash": "string",          "ephemeralPublicKey": "MFkwEwYHKoZIzj0CIKoZIz.....NBQQ==",          "publicKeyHash": "+vbONwRlVqJX0........",          "transactionId": "3827c5a02638.....34d50"        },          "billingPhone": {          "value": "555-555-5555",          "type": "billing",          "extension": "2145"        }      }   }}

## Request

| Sample Request - Google Pay sale transaction
|:----------
| {     "sale": {        "orderId": "TestPerfdSondic",        "storeId":"99999",       "requestedAmount": "2",       "currencyCode": {"number": 840},      "fundingSource":{        "googlePay": {        "version": "ECv1",                       "data": "{\"encryptedMessage\":\"bqCKEUsCO7uGTCb4o32BH0D0igGlGSqa1uDGK8cApzPvWxSrZQQuniTs3heCjaxp09V6RE3d0a\/hvhTlgTnXRV9Tn5yYArnBaVnxPGauaYVofdtEZsA+XovtFhPEsyTCnc1KK04InYJHb0i4rdxNnpH2D49mHPyre5goRlOPWQUby90a6iqy1Nyjy291NhztSQ\/uy9pTOkBigblLq3GSwgaZONpHPn54gnX2+LZoW3RVKTbmRt\/gnk4d\/jQzgVmfF22niZXL8\/+lR0ouxv6t5Y8F3jHrA0XpSRYOKC1zLy6+yzwt6yD3Pn+ZlcFKbPjvQbS2OTu0jiSC7KauObuEonr2Olx3ctRd68MxQ8MbJs7npJDbHBQhw7G+XgtZnnAAggILKyrt77e2HVClyxWtf53qXtH+gqdB4c5NmrthagWzul5K2fti1B+wrneDft5cC7Zq1\/s\\u003d\",\"ephemeralPublicKey\":\"BMxNQ97eYcjx\/snrpvvekV\/MAi9AKB+srihFADynCh485FGLSxMwvqUk6uOH+wx2qUkB4G63Pf4FY1I+Jnq4vjM\\u003d\",\"tag\":\"hgBcRJv7O7lhxme2MhM6W8xJidBPEnaVTtLxCV6g6M0\\u003d\"}","signature":"MEUCIBhqVEhzzYTMlju2pH7P5e0jXP1cj7GrBnTg\/ROq6ORzAiEA\/AcI3101a\/Cp+AhvqjEX31TFw6IjyFAP0+2PE6haykA=",                          "billingAddress":{                    "type":"work",                    "streetAddress":"200 Universal City Plaza",                    "locality":"Hollywood",                    "region":"CA",                    "postalCode":"11747",                    "country":"US",                    "formatted":"100 Universal City Plaza\nHollywood, CA 91608 USA",                    "primary":true                },          "billingPhone": {          "value": "555-555-5555",          "type": "billing",          "extension": "2145"        }        }        }       }     }

| Sample Request - Prepaid Sale (Anonymous)
|:----------
| {       "sale": {        "orderId": "order0977555ai2733d",        "storeId": "88888",        "requestedAmount": 1,         "currencyCode": {"number": 840},        "fundingSource": {           "prepaid": {        "cardNumber": "7777127476383261",        "securityCode": "58505705",        "expiryDate": {          "month": "09",          "year": "25"        }      }        }    }}

## Request:

| Sample Request - Vaulted gift card sale transaction
|:----------
| {      "fdCustomerId":" s014368kjkda1ordercbb0c1cba131",   "sale":{         "orderId":"s0143684e1a1ordercbb0c1cba131",      "storeId":"88888",      "requestedAmount":100,      "currencyCode":{            "number":840      },      "vaultedAccount": {        "fdAccountId": "muid-3d4f2ac...c91014f2dc1"      },       }}

## Response (201 Created)

| Sample Response  - anonymous Credit card sale transaction
|:----------
| {      "fdSaleId":"75f83f1c1c1b4d8992231d348063b4f3",   "status":"APPROVED",   "requestedAmount":1,   "approvedAmount":1,   "currencyCode":{         "number":840   },  "hostExtraInfo":[ {            "name":"APPROVAL_NUMBER",         "value":"876673"      },        {            "name":"SEQUENCE_NUMBER",         "value":"876543"      }   ],   "transactionDateTime":"2017-10-04T20:25:19.726"}

| Sample Response   - Prepaid Sale(Anonymous)
|:----------
| {    "transactionDateTime": "2018-04-24T10:35:33-0400",    "fdSaleId": "8a7ffab962dcb2240162f814c45602aa",    "status": "APPROVED",    "orderId": "order0977555ai2733d",    "requestedAmount": 1,    "approvedAmount": 1,    "currencyCode": {        "number": 840    },    "fundingSource": {        "type": "PREPAID",        "prepaid": {            "alias": "3261",            "expiryDate": {},            "balance": {                "currentBalance": 6,                "beginBalance": 7,                "currencyCode": {                    "number": 840                },                "currencyType": "TRANSACTION"            }        }    },    "hostExtraInfo": [        {            "name": "APPROVAL_NUMBER",            "value": "460484"        },        {            "name": "SEQUENCE_NUMBER",            "value": "285664"        }    ]}

| Sample Response  - Vaulted gift card sale
|:----------
| {    "status": "APPROVED",    "orderId": "Order7051345",    "corporateMerchant": false,    "requestedAmount": 2,    "approvedAmount": 2,    "currencyCode": {        "code": "USD",        "number": 840    },    "fundingSource": {        "type": "VAULTED_ACCOUNT",        "vaultedAccount": {            "fdAccountId": "8a7f0ba96ec9f2bb016ed016b2e70086"        }    },    "transactionDateTime": "2019-12-04T03:47:00-0500",    "outdoorSale": false,    "partialPaymentAllowed": true,    "fdSaleId": "18ffe9ef1a9a4a3c9cf8fd74c93de06d",    "hostExtraInfo": [        {            "name": "APPROVAL_NUMBER",            "value": "208994"        },        {            "name": "SEQUENCE_NUMBER",            "value": "260743"        }    ]}

