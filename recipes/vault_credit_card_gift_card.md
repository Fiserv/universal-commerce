# How to Vault a Credit Card or Gift Card 

## Step 1: Create a customer profile using POST /v1/customers

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

## Step 2: Retrieve Token & Encryption Key using POST - /v1/ tokens

## Retrieve Token & Encryption Key

## Parameters

| Name| Data Type| Parameter Type| Required| Max Length
|:----------|:----------|:----------|:----------|:----------
| fdCustomerId| string| body| Conditional*| 32
| publicKeyRequired| Boolean| body| yes| 

Note: Either fdCustomerId or deviceInfo has to be provided
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

## Step 3: Obtain a Nonce 

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
  
## Step 4: Create an Account using POST /v1/customers/{fdCustomerId}/accounts

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
   "account":{  
      "token":{  
         "tokenId":"64028399-f700-42b3-9ab0-27617c62dff1",
         "tokenProvider":"UCOM",
         "tokenType":"CLAIM_CHECK_NONCE"
      }
   }
}

  ```

## Sample Request (Physical GiftCard Enrollment)
```json
{
  "account": {
    "type": "PREPAID",
    "prepaid": {
      "cardNumber": "7076105006196019",
      "securityCode": "7772"
    }
  },
  }

```  

## Sample Response (201 - Created)
	
```json
{
	"fdAccountId": "8a7faa266838a04d01683d220fd8001b",
	"type": "CREDIT",
	"status": "ACTIVE",
	"credit": {
		"alias": "0024",
		"cardType": "VISA",
		"expiryDate": {
			"month": "06",
			"year": "19",
			"singleValue": "0619"
		}
	}
}

``` 
Now that the we have an Account ID, we could preform a sale or auth/capture transaction, depending on the use case. 
