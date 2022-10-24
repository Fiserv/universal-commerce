| uCommerce Services Step by Step Guide to Vault Credit Cards & Gift Cards
|:----------

# Step 1: Create a customer profile using POST /v1/customers

## POST /v1/customers

Parameters

| Name| Data Type| Parameter Type| Required| Max Length
|:----------|:----------|:----------|:----------|:----------
| externalId| string| body| yes| 50

## Request 

| Sample Request
|:----------
| {  "customer": {    "externalId": "17395001"  },  }

## Response (201 - Created)

| Sample Response
|:----------
| {    "externalId": "17395001",    "id": "e3aab31243f94be6afda9dc89e48820e"}

# Step 2: Retrieve Token & Encryption Key using POST - /v1/ tokens

## Retrieve Token & Encryption Key

## Parameters

| Name| Data Type| Parameter Type| Required| Max Length
|:----------|:----------|:----------|:----------|:----------
| fdCustomerId| string| body| Conditional*| 32
| publicKeyRequired| Boolean| body| yes| 

> *\- Either fdCustomerId or deviceInfo has to be provided
| Sample Request 
|:----------
| {  "token": {    "fdCustomerId": "4fc2eabf5f8c4f7cb98ce9f6fd8d3ea1"  },    "deviceInfo": {    "id": "537edec8-d33e-4ee8-93a7-b9f61876950cs",    "kind": "mobile",    "details": [{      "provider": "InAuth",      "dataCapture": {        "rawData": "aaaaaXREUVZGRlFY…aMV",        "dataEventId": "BB8E4E92…Fz1E063113",        "captureTime": "2016-04-16T16:06:05Z"      }    }]  },  "publicKeyRequired": true}

| Sample Response 
|:----------
| {     "tokenId":"0OcWjNTKu8rjfVb0AJnAUGTM9dWx",   "status":"ACTIVE",   "issuedOn":1501502067595,   "expiresInSeconds":1199,  "algorithm":"RSA/NONE/PKCS1PADDING",   "publicKey":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0Fpqri0cb2JZfXJ/DgYSF6vUpwmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/3j+skZ6UtW+5u09lHNsj6tQ51s1SprCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQAB"}

# Step 3: Obtain a Nonce 

**Here you will have 2 options to obtain a nonce:** 

- By Encrypting PAN details using POST \- /v1/account\-tokens

- Hosted Pages (if applicable). A nonce is generated through hosted pages after a user submits credit card details.

## Encrypting PAN details using POST - /v1/account-tokens

## HTTP Header parameter for this API

| Authorization: - Bearer <Oauth Token ID>Api-Key:-  <apiKey>Timestamp:- <timestamp>Client-Request-Id: - <clientRequestId>
|:----------

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
| billingPhone| String| Body| Optional (Mandatory `only if Fraud is enabled)| -

| Sample Request 
|:----------
| {     "account":{        "type":"CREDIT",      "credit":{           "cardNumber":"av51dbDpLj+k0a81v0G0Hb….tLyUKtOezfEWjQrt3QEctDTKIoemNMpnhwf9fuWdA==",         "nameOnCard":"John Smith",         "cardType":"AMEX",         "billingAddress":{              "type":"work",            "streetAddress":"100 Universal City Plaza",            "locality":"Hollywood",            "region":"CA",            "postalCode":"91608",            "country":"US",            "formatted":"100 Universal City Plaza\nHollywood, CA 91608 US",            "primary":true         },           "billingPhone":{            "value":"555-555-5555",             "type":"billing",              "extension":"2145"          },         "expiryDate":{              "month":"LjijU+vw0zMrYRg9nDRzHSc7cP…mMvwMweV2Jfx1qgAqu+k4p9L/pbOg==",            "year":"jIUaIaBWixHK94kQOen8U4Azx3MdjxtgPngOefGg+… qoZmBqC6596iTlR3f5FIEg=="         },         "securityCode":"AW+c3jw7CviCjbdX2u2uFVyD2c…BxbHOh3YgkGpwdvAddKniNVOHxC69ifOg=="      }   },   "referenceToken":{              "tokenType":"CLAIM_CHECK_NONCE"   },   "fdCustomerId":"bc5b70d996cb4bfebced3973880f8543"}

| Sample Response 
|:----------
| {     "type":"CREDIT",   "token":{        "tokenType":"CLAIM_CHECK_NONCE",      "tokenProvider":"UCOM",      "tokenId":"64028399-f700-42b3-9ab0-27617c62dff1"   }}

# Step 4: Create an Account POST /v1/customers/{fdCustomerId}/accounts

## POST /v1/customers/{fdCustomerId}/accounts 

## HTTP Header parameter for this API

| Api-Key: <key>Authorization: HMAC <signature>Content-Type: application/jsonTimestamp: <time>Client-Request-Id: <$guid>Client-Token: <accessToken>
|:----------

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

## Request 

| Sample Request - Nonce Enrollment
|:----------
| {"account": {   "token": {        "tokenId": "85886d56-6204-4829-9bd9-eb4f83b2d725",        "tokenProvider": "UCOM",        "tokenType": "CLAIM_CHECK_NONCE"       }     }}

| Sample Request - Physical GiftCard Enrollment
|:----------
| {"account":{       "type":"PREPAID",      "prepaid":{          "cardNumber": "7777090732176755",         "securityCode":"54112073",        "expiryDate": {              "month": "12",              "year": "20"          }      }   }}

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

