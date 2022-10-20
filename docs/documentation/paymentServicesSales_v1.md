# Payment Services - Sales Transaction

## Description

A Sales transaction with the use cases that follow:
* Anonymous credit card transaction using Nonce with storeId
* Anonymous credit card Transaction using TA Token with storeId
*
*
*
*


# Endpoint

POST /v1/payments/sales

# Authentication
Basic Authentication

# Request Headers

| HEADER                  | VALUE                                                      | DESCRIPTION                        |
|-------------------------|------------------------------------------------------------|------------------------------------|
| Connection              | keep-alive                                                 | The Keep-Alive general header allows the sender to hint about how the connection may be used to set a timeout and a maximum amount of requests.        |
| Content-Type            | application/json                                           | Content Type of request message/payload. Supported values: application/json;charset=UTF-8.                                                             |
| Client-Request-Id       | e.g., m2qpjzcx                                             | A client-generated ID for request tracking and signature creation, unique per request. This is also used for idempotency control. Recommended 128-bit UUID format.   |
| X-Wallet-Id             | e.g., Company name_WALLET                                  | A card wallet account ID associated with a given payment instrument identification.  |
| X-B3-TraceId            | e.g., 7a317b88b71f56ba                                     | The Trace ID to the Database call for Real Time Credit Card Transactions.                               |
| X-B3-SpanId             | e.g., 84261b82bd7f74d9                                     |                                |
| Content-Length          | e.g., 1274                                                 |                                |
| Host                    | e.g., ucom-customer-services-prd.apps.us-[server name].com |                                |
| User-Agent              | e.g., Apache-HttpClient/4.5.12 (Java/17.0.2)               |                                |
| Authorization           | e.g., Basic dWNvbS1hcGlnZWU6dWNvbS1hcGlnZWU=               | HMAC Key generation, Base64 HMAC SHA256 of authentication headers and request body. Authorization header is required to have the HMAC string capitalized and followed by one space followed by the calculated HMAC signature. |

# Request Body
<details> <summary>Click to expand!</summary> 

| Variable     | Type   | Example or Description                      | Required Y/N         |
|--------------|--------|---------------------------------------------| -------------------- |
| fdCustomerId                | string | Maximum 36 characters.                                 | N |
| **orderId**                 | string | Maximum 36 characters.                                 | Y |
| **storeId/merchantId**      | string | FD Issued - Alpha-Numeric                              | Y |
| fundingSource               | String | Credit, prepaid                                        | N |
| **requestedAmount**         | String | Dollars. Cents                                         | Y |
| **Number**                  | Integer| USD = 840            									| Y |
| **nameOnCard**              | String | Required Maximum 50 characters                         | Y |
| **cardType**                | String | VISA, MASTERCARD,DISCOVER,AMEX                         | Y |
| **securityCode**            | String | Payment card security code                             | Y |
| Type                        | String | Canonical type values of "work", "home", and "other".  | N |
| streetAddress               | String | The full street address component, which may include a house number, street name, P.O. box, and multi-line extended street address information. | N |
| Locality                    | String | The city or locality component.                        | N |
| Region                      | String | 4														| N |
| postalCode                  | String | 5                                                      | N |
| Country                     | String | The country name component. When specified, the value MUST be in ISO 3166-1 “alpha-2” code format; e.g., the United States and Sweden are “US” and "SE", respectively. | N |
| Formatted                   | String | The full mailing address, formatted for display or use with a mailing label. | N |
| Primary                     | Boolean| Indicates if this is the default address for the associated resource. It only has meaning when used in a set or array of addresses.| N |
| **Month**                   | String | Month format ‘MM                                       | Y |
| **Year**                    | String | Year format ‘YY                                        | Y |
            
### json example - anonymous Credit Card transaction using Nonce with storeId

```json


 {
 "sale":{
 "orderId":"Order00122",
"storeId":"KNOWN_STORE_ID",
 "requestedAmount":1,
 "currencyCode":{
 "number":840
 },
 "fundingSource":{
 "saveToVault": false,
 "token":{
 "tokenId":"bab8a932-f9f1-483b-9cf9-bb9a899e1a55",
 "tokenProvider": "UCOM",
 "tokenType": "CLAIM_CHECK_NONCE"
 }
 }
}

```

### json example - anonymous Credit Card transaction using Nonce with storeId

```json

{
 "sale":{
 "orderId":"Order00122",
"storeId":"KNOWN_STORE_ID",
 "requestedAmount":1,
 "currencyCode":{
 "number":840
 },
 "fundingSource":{
 "saveToVault": false,
 "credit":{
 "nameOnCard":"Zephyr",
 "cardType":"VISA",
 "billingAddress": {
 "type": "work",
 "streetAddress": "100 Universal City Plaza",
 "locality": "Hollywood",
Sample Request – Anonymous CC Transaction using TA Token with storeId
 "region": "CA",
 "postalCode": "00000",
 "country": "US",
 "formatted": "100 Universal City Plaza\nHollywood, CA 91608 US",
 "primary": true
 },
 "expiryDate":{
 "month":"12",
 "year":"26"
 },
 "token":{
 "tokenId":"7456291649096130",
 "tokenProvider":"TRANS_ARMOR"
 }
 }
 }
 }
}

```
</details>
# Request Cookies

[No cookies] | Cookie Name - Value

# Response Headers

    HTTP/1.1 201 Created
    Cache-Control: no-cache, no-store, max-age=0, must-revalidate
    Content-Security-Policy: default-src 'self';  'strict-dynamic'; frame-ancestors 'none','self'
    Content-Type: application/json
    Date: Fri, 17 Jun 2022 16:40:04 GMT
    Expires: 0
    Pragma: no-cache
    Strict-Transport-Security: max-age=31536000 ; includeSubDomains
    X-Content-Type-Options: nosniff
    X-Frame-Options: SAMEORIGIN
    X-Response-Id: a1592898-613e-4b4e-8d51-c5b92b9ed550
    X-Vcap-Request-Id: 7c296d49-223a-4d06-4bcc-7cccc03716e3
    X-Xss-Protection: 1; mode=block
    Transfer-Encoding: chunked
    Set-Cookie: NSC_VT-PNB1-OQ2-1ED-DPN-443-WJQ=ffffffff09bd36e445525d5f4f58455e445a4a42378b;path=/;secure;httponly                          

# Response Body
<details> <summary>Click to expand!</summary> 

| Variable        | Type      | Example        | Description                        | 
|-----------------|-----------|----------------|------------------------------------|
|   id            | string    | Example: fdCustomerId                     | Unique identifier for a customer profile registered with uCom; and example is fdCustomerId for the Vault.                 |
|   externalId    | string    | Example: 123abc456def890ghi098jkl765mno   | Unique identifier for a customer profile registered with uCom. If there is no externalID, the first time User is created, one is generated in the request. If an externalID already exists, then the logger creates this error message: "Record exist for the given externalCustomerId: " + createCustomerRequest.getExternalCustomerId()); |

### Subtitle for each json example
### Repeat as necessary
Add a collapsible header!

```json

{"id":"5cab4ea317ec4877ab419ae3844a970a", 
"externalId":"dwkockyq"}  
```
</details>
# Response Cookies - future

[No cookies] | Set-Cookie: NSC_VT-PNB1-OQ2-1ED-DPN-443-WJQ=ffffffff09bd36e445525d5f4f58455e445a4a42378b;path=/;secure;httponly

## HTTP Status Code and Reason Phrase

* Code = 200, message = "Customer profile retrieved successfully"
* Code = 400, message = "An exception occured while retrieving a Customer profile"
* Code = 500, message = "An internal server error occured"

### Example

```json
    {
  "code": "40000",
  "message": "Example Error",
  "category": "example",
  "developerInfo": {
    "developerMessage": "Invalid Message format in request payload",
    "moreInfo": "https://www.example.com/errors/40000",
    "fieldError": [
      {
        "field": "example id",
        "message": "exampleId is mandatory"
      }
    ]
  }
}
```

[![Try it out](../../../../assets/images/button.png)](../api/?type=post&path=/payments-vas/v1/tokens)

<!--
type: tab
-->

# See Also

- [Authentication](https://escmconfluence.1dc.com/display/GDSO/Authentication)
- [TPOC Use Case](https://escmconfluence.1dc.com/display/SMPTEP/Case+1%3A+User+profile+creation+and+update)
- [Payment Source](?path=docs/Resources/Guides/Payment-Sources/Source-Type.md)