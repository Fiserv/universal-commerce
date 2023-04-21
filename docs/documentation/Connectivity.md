# API Fundamentals

## Browse API Fundamentals Content
For ease of navigation on this page, content headings are listed in the right hand navigation pane allowing you to jump to a specific section within this page.

### Connectivity

The Connected Commerce (uCom) Gateway services are accessed through the public Internet. Connected Commerce (uCom) Gateway accepts communication only via the HTTPS channel. Custom HTTP headers are also used to carry additional information in each request.

| Environment            | Host                           | Base Path |
| Integration Test / CAT | https://int.api.firstdata.com  | /ucom     |
| Prod                   | https://prod.api.firstdata.com | /ucom     |

**Fully Qualified URL**

Concatenate the above URL and add the endpoint name from the specification to get the fully-qualified URL for each environment.

**Example:** Full-qualified URL of /v1/customer API for the Integration/CAT environment: https://int.api.firstdata.com/ucom/v1/customers

### Authentication

**API Security**  
Please see the following reference document for current implementation:
<a href="../docs/?path=docs/documentation/APISecurity.md">API Security Information</a>
<!--[API Security File GL Link](APISecurity.md)-->
<!-- <a href="docs/documentation/APISecurity.md">API Security Guides</a> -->
<!--[https://firstdatanp-ucomgateway.apigee.io/get-started/api-security](https://firstdatanp-ucomgateway.apigee.io/get-started/api-security)-->

### API HTTP Headers

| Header            | Value                  | Always Required | Description                                                                                         |
|-------------------|------------------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Api-Key            | <apiKey>               | Yes            | Merchant API key, Refer Apigee portal for more details                                              |
| Timestamp          | <timestamp>            | Yes            | Request initiation timestamp, expecting Epoch time. The value must generate out of UTC timestamp. Sample value format is 1499961987232          |
|Authorization       | HMAC <signature>       | Yes            | HMAC Key generation, please refer Apigee portal for more details                                    |
| Authorization      | Bearer {{accessToken}} | Yes            | Used on /v1account-tokens                                                                           |
| Content-Type       | application/json       | Yes            | application/json                                                                                    |
| Client-Request-Id  | <$guid>                |                | This is mandatory and unique for post request to avoid duplicate entry                              |
| Client-Token       | <accessToken>          |                | Used on POST /v1/payments/sales for anonymous transactions and /v1/customers/{fdCustomerId}/accounts for account transactions                      |
| Content-Signature  | HMAC <signature>       |                | Used on /v1/account-tokens                                                                          |

### Security and Privacy
  Field Encryption/Decryption Algorithm

Unless explicitly decided otherwise, confidential information such as account number, card number, passwords etc. should be encrypted prior to exchanging with UCG. The wallet app server has to encrypt the messages using the public key (that will be shared by UCG) and sent to UCG. The steps required for encrypting the sensitive information are:

 - The cipher algorithm is setup to use "RSA/None/PKCS1Padding."
 - The sensitive data, such as credit card account number, should be
   encrypted with the cipher algorithm using the shared public key.
 - The encrypted string should then be Base64 encoded.
 - The final encoded string value  replaces the sensitive data.
 - The encoded string is used by UCG to retrieve the sensitive data.

[Return to Quick Service Restaurants (QSR) API Integration Guide](../docs/?path=/docs/documentation/IG_QSR.md)