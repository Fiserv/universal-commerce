
# How customer's profile works in UCOM

## Step 1: Customer Registration

### Description

Create a Customer Profile, a.k.a. 'Customer Registration'.

Registering a customer in the uCom system results in a unique identifier 'fdCustomerId' that is used in subsequent operations like vaulting a payment account and making mobile payments. This request will create a recipient for card vaulting or payment purposes. This is always the first step that needs to be taken to do any transactions or calls on the system.

### Endpoint URL

HTTP Method: POST

Non-prod: [https://int.api.firstdata.com/ucom/v1/customers](https://int.api.firstdata.com/ucom/v1/customers)

Prod: [https://prod.api.firstdata.com/ucom/v1/customers](https://prod.api.firstdata.com/ucom/v1/customers)

### Parameters

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| externalId | String | Customer Id provided by the partner system. |
| --- | --- | --- |
| familyName | String | FamilyName of the Customer. |
| givenName | String | GivenName of the Customer. |
| middleName | String | MiddleName of the Customer. |
| honorificPrefix | String | honorificPrefix of the Customer. |
| honorificSuffix | String | honorificSuffix of the Customer |
| emails.value | String | Email address - No Pattern validation; |
| emails.primary | Boolean | boolean |
| password | String | password |
|  addresses.streetAddress |  String | addresses.streetAddress |
|  addresses.localty |  String | addresses.localty (eg; Hollywood) |
| addresses.region |  String | addresses.region (eg; CA, NY, IL, NE) |
| addresses.postalCode |  String |  addresses.postalCode (eg: 68137) |
| addresses.country | String |  addresses.postalCode (eg: ISO-3166-1 "apha-2" code US, IN, CA, UK) |
| phoneNumbers,value | String |  e.g., 'tel:+1-201-555-0123' |
| phoneNumbers,type | String |  home, mobile |
| phoneNumbers,primary | Boolean |  primary = True/False |
| DeviceInfo | Object | Supported for Fraud requirements;Vaulting as part of Paypal Requirement vaulting below entitydeviceInfo.details[0].dataDynamic.ipAddress;deviceInfo.details[0].dataApplication.country; |

\*This is always true for API flow.

### Headers
Content-Type:application/json
Client-Request-Id:{{$guid}}
Api-Key:{{clientKey}}
Authorization:HMAC {{signature}}
Timestamp:{{time}}

### Sample Request (Min Info)

```json
{
    "customer": {
        "externalId": "5876",
        "name": {
            "givenName": "Donald5876",
            "familyName": "Smith"
        },
        "emails": [
            {
                "value": "Smith5876@gmail.com"
            }
        ],
        "addresses": [
            {
                "streetAddress": "A27 Pacific Street",
                "locality": "Atlanta",
                "region": "GA",
                "postalCode": "00000"
            }
        ]
    }
}
```

### Sample Request (Extra Info)


```json
{
    "customer": {
        "externalId": "5876",
        "name": {
            "givenName": "Donald5876",
            "familyName": "Smith",
            "middleName": "Gold",
            "honorificPrefix": "Mr",
            "honorificSuffix": "LL.D"
        },
        "emails": [
            {
                "value": "Smith5876@gmail.com"
            }
        ],
        "phoneNumbers": [
            {
                "value": "1234567892",
                "type": "mobile"
            }
        ],
        "addresses": [
            {
                "streetAddress": "A27 Pacific Street",
                "locality": "Atlanta",
                "region": "GA",
                "postalCode": "00000"
            }
        ]
    },
    "deviceInfo": {
        "id": "537edec8-d33e-4ee8-93a7-b9f61876950c",
        "kind": "mobile",
        "details": [
            {
                "provider": "RAVELIN",
                "dataCapture": {
                    "dataEventId": "537edec8-d33e-4ee8-93a7-b9f61876950c"
                }
            }
        ]
    }
}
```

### Sample Response (201 – Created)

```json
{
    "id": "96328bee7fc64adc91e20064ca230e43",
    "externalId": "5876"
}
```

### Sample Response (400 – Bad Request)

```json
{
    "code": "270101",
    "message": "Customer already registered.",
    "category": "customer",
    "developerInfo": {
        "developerMessage": "Customer already registered."
    }
}
```

## Step 2: Customer Profile Updation

### Description

This request will update the Customer profile in uCom by providing the fdCustomerId.

### Endpoint URL

HTTP Method: PATCH

Non-prod: [https://int.api.firstdata.com/ucom/v1/customers](https://int.api.firstdata.com/ucom/v1/customers)/{fdCustomerId}

Prod: [https://prod.api.firstdata.com/ucom/v1/customers](https://prod.api.firstdata.com/ucom/v1/customers)/{fdCustomerId}

\*Replace _96328bee7fc64adc91e20064ca230e43_with fdCustomerId of recipient being modified.

### Parameters

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| fdCustomerID | String | Customer Id provided by the partner system. |
|  | |  |

\*This is always true for API flow.

### Headers

Content-Type:application/json
Client-Request-Id:{{$guid}}
Api-Key:{{clientKey}}
Authorization:HMAC {{signature}}
Timestamp:{{time}}

### Sample Request (Minimal Info)

```json
{
    "customer": {
        "externalId": "5876",
        "emails": [
            {
                "value": "bjensen@example.com",
                "type": "work",
                "primary": true
            }
        ]
    }
}
```

The minimal request can be any single entity that requires updating, any of the objects or entities in the parameters will work here.

### Sample Response (204 – No Content)

The request succeeded but there's really nothing to show.

### Sample Response (400 – Bad Request)

```json
{
    "code": "279904",
    "message": "Customer profile not found.",
    "category": "customer",
    "developerInfo": {
        "developerMessage": "Customer profile not found."
    }
}
```

```json
{
    "code": "270201",
    "message": "Customer profile details update failed",
    "category": "customer",
    "developerInfo": {
        "developerMessage": "Customer profile details update failed"
    }
}
```

## Step 3: Reading Customer Profile

### Description

Read a Customer Profile. Fetch the details of a customer providing the fdCustomerId.

### Endpoint URL

HTTP Method: GET

Non-prod: [https://int.api.firstdata.com/ucom/v1/customers/{fdCustomerId}](https://int.api.firstdata.com/ucom/v1/customers/%7BfdCustomerId%7D)

Prod: [https://prod.api.firstdata.com/ucom/v1/customers/{fdCustomerId}](https://prod.api.firstdata.com/ucom/v1/customers/%7BfdCustomerId%7D)

\*Replace _96328bee7fc64adc91e20064ca230e43_with fdCustomerId of recipient being retrieved.

### Headers

Content-Type:application/json
Client-Request-Id:{{$guid}}
Api-Key:{{clientKey}}
Authorization:HMAC {{signature}}
Timestamp:{{time}}

### Sample Request

This request is empty since it's a GET call

### Sample Response (200 – Created)
{
    "id": "96328bee7fc64adc91e20064ca230e43",
    "externalId": "5876",
    "name": {
        "familyName": "Smith",
        "givenName": "Donald5876",
        "middleName": "Gold",
        "honorificPrefix": "Mr",
        "honorificSuffix": "LL.D"
    },
    "emails": [
        {
            "value": "Smith5876@gmail.com"
        }
    ],
    "addresses": [
        {
            "streetAddress": "A27 Pacific Street",
            "locality": "Atlanta",
            "region": "GA",
            "postalCode": "00000"
        }
    ],
    "phoneNumbers": [
        {
            "value": "1234567892",
            "type": "Mobile"
        }
    ]
}
```json


### Sample Response (400 – Bad Request)

```json
{
    "code": "279904",
    "message": "Customer profile not found.",
    "category": "customer",
    "developerInfo": {
        "developerMessage": "Customer profile not found."
    }
}
```

## Step 4: Customer De-Registration

### Description

Delete a Customer Profile. Delete a customer profile from uCom system by providing the fdCustomerId

### Endpoint URL

HTTP Method: DELETE

Non-prod: [https://int.api.firstdata.com/ucom/v1/customers/{fdCustomerId}](https://int.api.firstdata.com/ucom/v1/customers/%7BfdCustomerId%7D)

Prod: [https://prod.api.firstdata.com/ucom/v1/customers/{fdCustomerId}](https://prod.api.firstdata.com/ucom/v1/customers/%7BfdCustomerId%7D)

\*Replace _96328bee7fc64adc91e20064ca230e43_with fdCustomerId of recipient being deleted from uCom sytem.

### Headers

Content-Type:application/json
Client-Request-Id:{{$guid}}
Api-Key:{{clientKey}}
Authorization:HMAC {{signature}}
Timestamp:{{time}}

### Sample Request

This request is empty since it's a GET call

### Sample Response (204 – No Content)

The request succeeded but there's really nothing to show.

### Sample Response (400 – Bad Request)

```json
{
    "code": "279904",
    "message": "Customer profile not found.",
    "category": "customer",
    "developerInfo": {
        "developerMessage": "Customer profile not found."
    }
}
```

```json
{
    "code": "270201",
    "message": "Customer profile details update failed",
    "category": "customer",
    "developerInfo": {
        "developerMessage": "Customer profile details update failed"
    }
}
```

```json
{
    "accounts": [
        {
            "source": "DEBIT",
            "card": {
                "cardNumber": "400023******0013",
                "nameOnCard": "Test Card",
                "alias": "0013",
                "billingAddress": {},
                "expiryDate": {
                    "month": "12",
                    "year": "24"
                },
                "token": {
                    "tokenId": "9bb19dda-6bba-4911-b86e-ebe0b5473833",
                    "tokenProvider": "ENROLMENT VAULT"
                },
                "default": false
            }
        }
    ]
} 
```
```json
{
    "code": "400051",
    "message": "Missing Parameter",
    "category": "common",
    "developerInfo": {
        "developerMessage": "Missing Parameter",
        "fieldError": [
            {
                "field": "MerchantCustomerId",
                "message": "Invalid recipientId or merchant customer Id"
            }
        ]
    }
}
```
## Appendix

### HMAC Sample

This sample code generates the signature for the header based upon the current time and the payload of the request. This is utilized in programs such as Postman (used in the example) as a "Pre-request script" and something similar should be executed when running any api request.

| Pre-Request Script |
| --- |
|
```java
var key = postman.getEnvironmentVariable('clientKey');var secret = postman.getEnvironmentVariable('clientSecret');
var time = new Date().getTime();var method = request.method;
var rawSignature = key + ":" + time;var requestBody = request.data;
if (method != 'GET' && method != 'DELETE') 
{
var payload\_digest = CryptoJS.SHA256(requestBody);
var b64BodyContent = CryptoJS.enc.Base64.stringify(payload\_digest);
rawSignature = rawSignature + ":" + b64BodyContent;
}
var signature = CryptoJS.HmacSHA256(rawSignature, secret);
postman.setEnvironmentVariable('time', time);
postman.setEnvironmentVariable('signature', CryptoJS.enc.Base64.stringify(signature));
```

For a reference on how to generate the HMAC in java as well as more information on its use please visit [https://firstdatanp-ucomgateway.apigee.io/get-started/api-security](https://firstdatanp-ucomgateway.apigee.io/get-started/api-security)

### HTTP Headers

| Header Name | Required | Description |
| --- | --- | --- |
| Api-Key | Yes | Merchant API key |
| Timestamp | Yes | Request initiation UTC timestamp, formatted as Epoch time. The value is in milliseconds. Sample value format is 1499961987232 |
| Authorization | Yes | Authorization header is required to have the "HMAC" string capitalized and followed by one space followed by the calculated hmac signature. When using the /account-tokens API: **Authorization** : - Bearer \<tokenId\>\*Utilizes the tokenId returned from the /tokens api |
| Client-Request-Id | Yes | Contains a unique ID generated by the client that is used for enforcing idempotency on POST actions.  |
| Content-Type | Yes | application/json |
| access\_token | Conditionally | Required when vaulting payment information. Utilizes the tokenId returned from the /tokens api. |

#### Sample Header

Content-Type:application/json
 Api-Key:{{key}}Timestamp:{{time}}
 Client-Request-Id: {{$guid}}Authorization:HMAC {{signature}}access\_token: {{tokenId}}
Content-Type: application/json
 Api-Key: pnQgbD4jjfp5Gu2eqA1i4VnzZtT9mW5I
 Timestamp: 1501621439636
 Client-Request-Id: abded-12345-ddcce-4r45tAuthorization:HMAC W5X9NAlPgSNsfQX55fXbXrk3arzL6KxcCTA6SrnxL+U=access\_token: SPaAADBdzaMbmR7RU7QdftIFLGIa 
