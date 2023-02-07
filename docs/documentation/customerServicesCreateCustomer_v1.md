<meta charset="UTF-8">
<meta name="description" content="Create a Customer Profile  for uCom">
<meta name="keywords" content="uCom, Customer Services, Account Services">

# Create a Customer Profile

## Description

Customers are Operations and details about customers which are defined as the end-user of the application.

You (a merchant) can register a new customer. The response includes the newly created fdCustomerId (ID) and the externalID parameters.
Registering a customer in the uCom system results in a unique identifier fdCustomerId that is used in subsequent operations like vaulting a payment account and making mobile payments.

There are no query parameters in the request. 

# Endpoint

POST v1/customers

<!-- /partners and ${partnerid} JMeter  /v1/partners/${partnerid}/customers   to get the endpoint --> 
<!-- POST https://ucom-customer-services-qa.apps.us-oma1-np2.1dc.com/v1/partners/POPEYES/customers -->
<!-- Other documentation discusses boarding a new customer. --> 

# Authentication

Basic Authentication

# Request Headers

<details> 
   <summary>Click to expand!</summary> 

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

</details>

# Request Body

<details> 
   <summary>Click to expand!</summary> 

<!-- The Request body is defined in the YAML API specification file: https://firstdatanp-ucomgateway.apigee.io/apis/ucomcustomerservices/index -->
<!-- https://escmstash.1dc.com/projects/UC/repos/ucom_swagger/browse/swagger_definitions/uComCustomerServices.yaml -->
<!-- https://escmstash.1dc.com/projects/UC/repos/ucom_swagger/browse/sample_messages -->

The payload that is appended to the HTTP request. Because there can only be one payload, they can only be one body parameter. 
The name of the body parameter has no effect on the parameter itself and is used for documentation purposes only. Because Form parameters are also in the payload, body and form parameters cannot exist together for the same operation.

| Variable     | Type   | Example or Description                      | Required Y/N         |
|--------------|--------|---------------------------------------------| -------------------- |
| **externalId**           | string | Example: dwkockyq. A unique identifier for a customer profile registered with uCom. If there is no externalID, the first time User is created, one is generated in the request. If an externalID already exists, then the logger creates this error message: "Record exist for the given externalCustomerId: " + createCustomerRequest.getExternalCustomerId()); | Y |
| userName                 | string | Example: bjensen@example.com. A service provider's unique identifier for the user, typically used by the user to directly authenticate to the service provider.   | N |
| **name.PersonName**      | string | Example: PersonName                       | Y |
| name.formatted           | string | Example: Ms. Barbara J Jensen III         | N |
| **name.familyName**      | string | Example: Jensen                           | Y |
| **name.givenName**       | string | Example: Barbara                          | Y |
| name.middleName        | string | Example: Jane                             | N |
| name.honorificPrefix   | string | Example: Ms.                       | N |
| name.honorificSuffix   | string | Example: III                       | N |
| displayName            | string | Example: Babs Jensen               | N |
| nickName               | string | Example: Babs                      | N |
| profileUrl             | string | Example: https://login.example.com/bjensen   | N |
| **emails        **     |         |                                  | Y |
| emails.value           | string | Example: dwkockyq@example.com      | N |
| emails.type            | string | Example: work                      | N |
| emails.primary         | boolean | Example: true                     | N |
| **Addresses     **     |         |                                  | Y |
| addresses.type        | string | Example: work                      | Y |
| addresses.streetAddress   | string | Example: 100 Universal City Plaza   | N |
| addresses.locality     | string | Example: Hollywood                 | N |
| **addresses.postalCode**   | string | Example: 20220                 | Y |
| addresses.country      | string | Example: US                        | N |
| addresses.formatted    | string | Example: 100 Universal City Plaza\nHollywood, CA 91608 USA   | N |
| phoneNumbers.value     | string | Example: 555-555-5555. The value must be specified according to the format defined in RFC3966, e.g., 'tel:+1-201-555-0123'. | N |
| phoneNumbers.primary   | boolean | Example: true                     | N |
| phoneNumbers.type      | string | Example: work                      | N |
| ims.value              | string | Example: someaimhandle. Instant messaging address for the user. A shortened version one of the following values - aim, gtalk, icq, xmpp, msn, skype, qq, yahoo, or other. This will change with popularity of various applications at any time.   | N |
| ims.type               | string | Example: aim                       | N |
| photo.value            | string | Example: https://photos.example.com/profilephoto/72930000000Ccne/F. A URI that is a uniform resource locator (as defined in Section 1.1.3 of RFC3986) that points to a resource location representing the user's image. The resource MUST be a file (e.g., a GIF, JPEG, or PNG image file) rather than a web page containing an image.   | N |
| photo.type             | string | Example: Thumbnail. Defines the following canonical values to represent popular photo sizes - "photo" and "thumbnail".   | N |
| title                  | string | Example: The user's title, such as "Vice President".              | N |
| preferredLanguage      | string | Example: en-US. Indicates the user's preferred written or spoken languages and is generally used for selecting a localized user interface.      | N |
| locale                 | string | Example: en-US. Used to indicate the User's default location for purposes of localizing such items as currency, date time format, or numerical representations.              | N |
| timezone               | string | Example: America/Los_Angeles.  The User's time zone.    | N |
| active                 | boolean | Example: true. A Boolean value indicating the user's administrative status. The definitive meaning of this attribute is determined by the service provider.  | N |
| password               | string | Example: some-hashed-value. This attribute is intended to be used as a means to set, replace, or compare (i.e., filter for equality) a password.  | N |
| groups                 | array  | Example: A list of groups to which the user belongs, either through direct membership, through nested groups, or dynamically calculated.  | N |
| groups.value           | string | Example: xxx. xxx.  | N |
| groups.href            | string | Example: xxx. xxx.  | N |
| groups.display         | string | Example: xxx. xxx.  | N |
| dateCreated            | string | Example: Date created time in Internet Date/Time format - yyyy-MM-dd'T'HH:mm:ss'Z'.  | N |
| dateModified           | string | Example: Date modified time in Internet Date/Time format - yyyy-MM-dd'T'HH:mm:ss'Z'.  | N |
| membership             | array  | membership information for the user.  | N |
| membership.membershipType                 | string | xxx | N |
| membership.membershipId	               | string | xxx | N |
| membership.membershipProgramId       | string | xxx | N |
| membership.membershipStatus          | string | xxx | N |
| membership.membershipExpiryDate      |        | xxx | N |
| membership.accountNumber              | string | xxx | N |
| membership.securityCode              | string | xxx | N |
| membership.additionalInfo             | string | xxx | N |
| deviceInfo: id                                | string | Example: 537edec8-d33e-4ee8-93a7-b9f61876950c    | N |
| deviceInfo: kind                              | string | Example: mobile                                  | N |
| deviceInfo.details.provider                   | string | Example: InAuth                                  | N |
| deviceInfo.details.dataCapture.rawData        | string | Example: aaaaaXREUVZGRlFY...aMV                  | N |
| deviceInfo.details.dataCapture.dataEventId    | string | Example: BB8E4E92...Fz1E063113                   | N |
| deviceInfo.details.dataCapture.captureTime    | string | Example: 2016-04-16T16:06:05Z                    | N |
| deviceInfo.details.dataStatic.os              | string | Example: Android 5.1.1 Lollipop                  | N |
| deviceInfo.details.dataStatic.osVersion       | string | Example: 5.1.1 Lollipop                          | N |
| deviceInfo.details.dataStatic.model           | string | Example: XT1540                                  | N |
| deviceInfo.details.dataStatic.type            | string | Example: Moto G                                  | N |
| deviceInfo.details.dataStatic.latitude        | string | Example: 13.0827 N                               | N |
| deviceInfo.details.dataStatic.longitude       | string | Example: 80.2707 E                               | N |
| deviceInfo.details.dataStatic.ipAddress       | string | Example: 172.27.37.221                           | N |
| deviceInfo.details.dataStatic.captureTime     | string | Example: 2016-04-16T16:06:05Z                    | N |
            
### json example

```json

{
  "customer": {
    "externalId": "123abc456def890ghi098jkl765mno",
    "userName": "bjensen@example.com",
    "name": {
      "formatted": "Ms. Barbara J Jensen III",
      "familyName": "Jensen",
      "givenName": "Barbara",
      "middleName": "Jane",
      "honorificPrefix": "Ms.",
      "honorificSuffix": "III"
    },
    "displayName": "Babs Jensen",
    "nickName": "Babs",
    "profileUrl": "https://login.example.com/bjensen",
    "emails": [
      {
        "value": "bjensen@example.com",
        "type": "work",
        "primary": true
      }
    ],
    "addresses": [
      {
        "type": "work",
        "streetAddress": "100 Universal City Plaza",
        "locality": "Hollywood",
        "region": "CA",
        "postalCode": "91608",
        "country": "US",
        "formatted": "100 Universal City Plaza\nHollywood, CA 91608 US",
        "primary": true
      }
    ],
    "phoneNumbers": [
      {
        "value": "555-555-5555",
        "type": "work"
      }
    ],
    "ims": [
      {
        "value": "someaimhandle",
        "type": "aim"
      }
    ],
    "photos": [
      {
        "value": "https://photos.example.com/profilephoto/72930000000Ccne/F",
        "type": "thumbnail"
      }
    ],
    "userType": "Employee",
    "title": "Tour Guide",
    "preferredLanguage": "en-US",
    "locale": "en-US",
    "timezone": "America/Los_Angeles",
    "active": true,
    "password": "some-hashed-value",
    "groups": [
      {
        "value": "e9e30dba-f08f-4109-8486-d5c6a331660a",
        "href": "https://example.com/v2/Groups/e9e30dba-f08f-4109-8486",
        "display": "Tour Guides"
      }
    ],
    "dateCreated": "2016-04-16T16:06:05Z",
    "dateModified": "2016-04-16T16:06:05Z",
    "membership": {
      "membershipType": "string",
      "membershipId": "string",
      "membershipProgramId": "string",
      "membershipStatus": "string",
      "membershipExpiryDate": {
        "month": "09",
        "year": "20",
        "singleValue": "string"
      },
      "accountNumber": "string",
      "securityCode": "string",
      "additionalInfo": [
        {
          "name": "string",
          "value": "string",
          "valueAsList": [
            "string"
          ]
        }
      ]
    },
    "hostExtraInfo": [
      {
        "name": "string",
        "value": "string",
        "valueAsList": [
          "string"
        ]
      }
    ]
  },
  "deviceInfo": {
    "id": "537edec8-d33e-4ee8-93a7-b9f61876950c",
    "kind": "mobile",
    "details": [
      {
        "provider": "InAuth",
        "dataCapture": {
          "rawData": "aaaaaXREUVZGRlFY...aMV",
          "dataEventId": "BB8E4E92...Fz1E063113",
          "captureTime": "2016-04-16T16:06:05Z"
        },
        "dataStatic": {
          "os": "Android 5.1.1 Lollipop",
          "osVersion": "5.1.1 Lollipop",
          "model": "XYX-1",
          "Type": "Moto G"
        },
        "dataDynamic": {
          "latitude": "13.0827 N",
          "longitude": "80.2707 E",
          "ipAddress": "172.27.37.221",
          "captureTime": "2016-04-16T16:06:05Z"
        }
      }
    ],
    "additionalInfo": [
      {
        "name": "some-key",
        "value": "some-value"
      }
    ]
  }
}
```
</details>

# Request Cookies

[No cookies] | Cookie Name - Value

# Response Headers

<details> 
   <summary>Click to expand!</summary>

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
</details>

# Response Body
<details> 
   <summary>Click to expand!</summary> 

| Variable        | Type      | Example        | Description                        | 
|-----------------|-----------|----------------|------------------------------------|
|   id            | string    | Example: fdCustomerId                     | Unique identifier for a customer profile registered with uCom; and example is fdCustomerId for the Vault.                 |
|   externalId    | string    | Example: 123abc456def890ghi098jkl765mno   | Unique identifier for a customer profile registered with uCom. If there is no externalID, the first time User is created, one is generated in the request. If an externalID already exists, then the logger creates this error message: "Record exist for the given externalCustomerId: " + createCustomerRequest.getExternalCustomerId()); |

```json

{"id":"5cab4ea317ec4877ab419ae3844a970a", 
"externalId":"dwkockyq"}  
```
</details>

# Response Cookies

Set-Cookie: NSC_VT-PNB1-OQ2-1ED-DPN-443-WJQ=ffffffff09bd36e445525d5f4f58455e445a4a42378b;path=/;secure;httponly

## HTTP Status Code and Reason Phrase

* Code = 200, message = "Customer profile retrieved successfully"
* Code = 400, message = "An exception occurred while retrieving a Customer profile"
* Code = 500, message = "An internal server error occurred"

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