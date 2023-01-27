
![Please Select yout Type of Business]

<!-- type: row -->

<!-- type: card
title: Quick Service Restaurant
description: About...
link: ?path=docs/about-developer-studio.md
-->

<!-- type: card
title: Petroleum Industry
description: About...
link: ?path=docs/about-developer-studio.md
-->

<!-- type: row-end -->


<base target="_blank">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">   

</head>
<body bgcolor="#ffffff">
<base target="_blank">
## Fiserv Universal Commerce REST API Specification

Here is how to utilize this guide. All your necessary steps are on your right and will guide you through the necessary steps to create a customer and start processing payments in universal commerce

## General

>### Connectivity

The uCommerce Gateway services are accessed through the public Internet. uCommerce Gateway accepts communication only via the HTTPS channel. Custom HTTP headers are also used to carry additional information in each request.

**Fully Qualified URL**

Concatenate the above URL and each endpoint name from the specification to get fully-qualified URL for each environment.

**Example:** Full-qualified URL of /v1/customer API for Integration environment is,

[https://int.api.firstdata.com/ucom/v1/customers/](https://int.api.firstdata.com/ucom/v1/customers/)

>### Authentication

**API-KEYS**
    
Please see the reference document for current implementation.

[https://firstdatanp-ucomgateway.apigee.io/get-started/api-security](https://firstdatanp-ucomgateway.apigee.io/get-started/api-security)

   >### Headers
   >> API HTTP headers
   
 
 | Header            | Value                  | Always Required | Description                                                                                                                             |
|-------------------|------------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Api-Key           | <apiKey>               | YES             | Merchant API key, Refer Apigee portal for more details                                                                                  |
| Timestamp         | <timestamp>            | YES             | Request initiation timestamp, expecting Epoch time. The value must generate out of UTC timestamp. Sample value format is 1499961987232
| Authorization     | HMAC <signature>       | YES             | HMAC Key generation, please refer Apigee portal for more details                                                                        |
| Authorization     | Bearer {{accessToken}} | YES             | Used on /v1/account-tokens                                                                                                              |
| Content-Type      | application/json       | YES             | application/json                                                                                                                        |
| Client-Request-Id | <$guid>                |                 | This is mandatory and unique for post request to avoid duplicate entry                                                                  |
| Client-Token      | <accessToken>          |                 | Used on POST /v1/payments/sales for anonymous transactions and /v1/customers/{fdCustomerId}/accounts for account transactions           |
| Content-Signature | HMAC <signature>       |                 | Used on /v1/account-tokens                                                                                                              |
   

   >### Securities and Privacy
    >>Field Encryption/Decryption Algorithm

Unless explicitly decided otherwise, confidential information such as account number, card number, passwords etc. should be encrypted prior to exchanging with UCG. The wallet app server has to encrypt the messages using the public key (that will be shared by UCG) and sent to UCG. The required steps for encrypting the sensitive information are;

 - The cipher algorithm is setup to use “RSA/None/PKCS1Padding” 
 - The sensitive data, such as credit card account number, should be
   encrypted with the cipher algorithm using the shared public key
 - The encrypted string should then be Base64 encoded
 - The final encoded string value  replaces the sensitive data 
 - The encoded string is used by UCG to retrieve the sensitive data

 >### Notifications

 A Notification is a callback mechanism to inform you of events occurring in our system related to a transaction. This is accomplished by making an HTTP call to an endpoint in your system at the moment these events take place.
 
**Event Types**

| Event Type                   | Description |
|------------------------|---------------|
|PETROTRANSACTION_COMPLETED| Used to notify when the fueling is completed or cancelled |
|PETROTRANSACTION_FUEL_STARTED| Used to notify when the user started the fueling |
|PETROTRANSACTION_RECEIPT_READY| Used to notify the user when the receipt is ready |

**Headers**

| Header Name      | Required | Description                                                          |
|------------------|----------|----------------------------------------------------------------------|
| Api-Key          | Yes      | Api Key that identifies the client and used as part of the Signature |
| Digest-Algorithm | Yes      | Algorithm used for Message Digest on the payload                     |
| Sig-Algorithm    | Yes      | Algorithm used to generate the signature                             |
| Sig-Timestamp    | Yes      | Not the event timestamp, the one used in Signature                   |
| Signature        | Yes      | The signed string as described above in Signature Generation section |

**Sample Header**

```Json
Content-Type: application/json
Api-Key: BkRQT4GldvCf5hAyJ1Q3gSJiI1M3ldts
Signature: 9a9cd131d804476e6698eb12d52e80e74b2a74ece247c111735f2cf05e315269536e0303be17d5754eaeb4d042551c62df3946140748c8bd156a0a3b31041cc2ab0af3d39c2a380adc1227d6dba859c75da6fcc698302ccf2b0a242f5a7545812451c974e41700d7b11cf321e18889d709d55d5f89bf4e4c3f7fd718f48a690788bf59b576b442cbba4a29e26cea3448340eaf4a43aa7a8027be3459d18c907bf5d17acd0e42135f841aa64849ea8a91d80ae33100c8b3dd407c02cc9ac620280df9156a1cfb46716ac37f519bb343e5c5af6e623f9ad027d627be04232cbf4eb7d37e04f0678d07876ba1d34fe8db711748920463cb14e3d37998e49eb9f125
Sig-Timestamp: 1501621439636
Sig-Algorithm: SHA256withRSA
Digest-Algorithm: SHA-256
```

 **Webhooks**

  A webhook is a callback mechanism to inform you of changes occurring to your transaction in our system. We accomplish this by making an HTTP call to an endpoint in your system when these changes occur.
The Merchant sends a webhook notification URL in authorization request where the App expects a fueling notifications.

Json Object:

```json
"webhookUrl": {
      "href": "string",
      "rel": "self",
      "method": "GET",
      "id": "415e5cf6bfdb11e8a355529269fb1459"
}
```

1. UCOM applies a standard URL pattern validation on the webhook endpoint URL if webhookUrl.href is present in the request
2. UCOM configures a list of allowable domain names for a given partner and validates a requested domain name with the configured list
3. If above point #1 or #2 failed then UCOM sends an error to the merchant as invalid message request
4. If validation is success, we persist the webhookUrl endpoint in uCom system
5. Whenever the fueling, completion or receipt request comes from POS, UCOM system look up the webhook endpoint from transaction level.
6. If endpoint available at transaction level, we use it for posting the notifications
7. If endpoint is not available in transaction, then we publish notifications to the merchant level endpoint via normal notificaiton route


**Wallet notification securities**

 UCOM will share a public certificate to the merchant to receive the wallet notifications from uCom


>### Currencies

We support the following currencies:

| Name                   | Currency Code | Currency Number |
|------------------------|---------------|-----------------|
| US Dollar              | USD           | 840             |
| Canadian Dollar        | CAD           | 124             |
| European Currency Unit | EUR           | 978             |
| Pound Sterling         | GBP           | 826             |
| Norwegian Krone        | NOK           | 578             |
| Mexican Peso           | MXN           | 484             |
| Argentine Peso         | ARS           | 32              |
| Columbia Peso          | COP           | 170             |
| Swedish Krona          | SEK           | 752             |
| Danish Krone           | DKK           | 208             |
| South African Rand     | ZAR           | 710             |
| Swiss Franc            | CHF           | 756             |

The code is the alphabetic 3 letter code as defined by ISO 4217.

**Decimal Handling Of Amount**

These currencies require the same correct amount format with a maximum of 2 decimals as reflected by the exponents, including trailing zeroes, e.g. 10, 10.1, 10.10 or 10.01. Any amount value with more than 2 decimals will cause an error.


  >### Idempotency
      
   The way idempotency is enforced in uCom is strictly as follows:

A transaction can be sent with the same idempotent ID (Client-Request-Id) at any time to receive the same response as the original transaction, however if no response from uCom was received during the initial transaction then the subsequent time the ID is sent will be treated as a new request.

A response includes timeouts, errors, or anything else that is being returned from uCom as a response to the request. This response constitutes a completed transaction as per idempotency rules.

If a transaction is still in flight and the same idempotent ID is used, a 503 error will be returned to signify that the transaction is still in progress. This can be continually retried until a different response (non-503 error) is received to signify whether the transaction has completed or not.

Any other 500 error received constitutes a completed transaction and would need to have a new idempotent ID generated to retry that transaction. In this case the original transaction will be rolled back and no duplicate payments will be made. An example of a scenario when you should resend the idempotent ID would be if the network timed out on client side and no response was received from the uCom application.

Also note that the idempotent ID will only last for 24 hours regardless, so any retries with the same ID would need to be made within the 24-hour window after generation.

>### FEP Host Information

This is used to send the FEP (Front End Processor) messages back to the merchant. 

##### Possible Returns - Success cases (Applicable for all payment related operation responses)

```json
{
  "hostExtraInfo": [
    {
      "name": "APPROVAL_NUMBER",
      "value": "995224"
    },
    {
      "name": "MERCHANT_ID",
      "value": "99022879997"
    },
    {
      "name": "AVAILABLE_BALANCE",
      "value": "80.00"
    },
    {
      "name": "SEQUENCE_NUMBER",
      "value": "786514"
    },
    {
      "name": "TRANSACTION_DATETIME",
      "value": "2019-11-22T07:06:00"
    },
    {
      "name": "HOST_RESPONSE_MESSAGE",
      "value": "APPROVED  995224"
    },
    {
      "name": "HOST_RESPONSE_CODE",
      "value": "995224"
    },
    {
      "name": "NETWORK_TRANSACTION_ID",
      "value": "381032340917110"
    }
    {
      "name": "PREPAID_HOST_RESPONSE_CODE",
      "value": "995224"
    }
    {
      "name": "PREPAID_HOST_RESPONSE_MESSAGE",
      "value": "APPROVED 995224"
    }
    {
      "name": "PREPAID_APPROVAL_NUMBER",
      "value": "995224"
    }
    {
      "name": "PREPAID_SEQUENCE_NUMBER",
      "value": "786514"
    }
  ]
}
```

##### Possible Returns - Failure cases

```json
{
  "hostExtraInfo": [
    {
      "name": "SEQUENCE_NUMBER",
      "value": "786514"
    },
    {
      "name": "MERCHANT_ID",
      "value": "99022879997"
    },
    {
      "name": "AVAILABLE_BALANCE",
      "value": "80.00"
    },
    {
      "name": "TRANSACTION_DATETIME",
      "value": "2019-11-22T07:06:00"
    },
    {
      "name": "HOST_RESPONSE_MESSAGE",
      "value": "Declined 995224"
    },
    {
      "name": "HOST_RESPONSE_CODE",
      "value": "995224"
    }
  ]
}
```

## Explore the uCom Services 

Kindly click on the links below to explore each uCom endpoint. 

>### Customer Services

This API handles all of the uCom Customer Profile Management operations (create, read, update, and delete).
	
<a href="../api/?type=post&path=/v1/customers"><img src="https://raw.githubusercontent.com/Fiserv/universal-commerce/94a71289848258b488fbd8b79e4ea9605ba656e5/assets/images/contacts-svgrepo-com.svg" alt="Customer_services" style="width:100px;height:100px;"></a>  

[Customer Services API](../api/?type=post&path=/v1/customers)
	
 >### Account Services
	
Services related to uCom customer accounts. Accounts can be credit, debit, loyalty, prepaid, etc.
  	
<a href="../api/?type=post&path=/v1/accounts/verification"><img src="https://raw.githubusercontent.com/Fiserv/universal-commerce/94a71289848258b488fbd8b79e4ea9605ba656e5/assets/images/vault-svgrepo-com.svg" alt="Account_services" style="width:100px;height:100px;"></a>  

[Account Services API](../api/?type=post&path=/v1/accounts/verification)
	
 >### Payment Services
	
This API handles services needed to initiate AUTH/CAPTURE/SALE transactions using a payment account.
  	
<a href="../api/?type=post&path=/v1/payments/auths"><img src="https://raw.githubusercontent.com/Fiserv/universal-commerce/94a71289848258b488fbd8b79e4ea9605ba656e5/assets/images/payment-method-svgrepo-com.svg" alt="Payments" style="width:100px;height:100px;"></a>  

[Payment Services API](../api/?type=post&path=/v1/payments/auths)

  >### Petrol Services

Services related to purchasing items at a gas station.
	
<a href="../api/?type=post&path=/v1/petro-transactions"><img src="https://raw.githubusercontent.com/Fiserv/universal-commerce/ea123fc9ade6fa84b7655d7a75ffb4c759644f09/assets/images/gas-station.svg" alt="Petrol_Services" style="width:100px;height:100px;"></a>  

[Petro Services API](../api/?type=post&path=/v1/petro-transactions)

## Use Cases 

The APIs can be used in different scenarios. We will describe the most common ones to give you an idea about the possibilities. Please see the <a href="/product/UniversalCommerce/recipes/?path=recipes/customerRegistration.md">Recipes Section</a> to learn more.   
	
## Testing
	
Before you start testing the uCom API, we recommend spending some time to learn about the FEP that is assigned to your configuration in uCom. The most common FEPs used are BUYPASS, Rapid Connect and IPG. A specific set of testing cards will be provided to you by the Implementation Team once the configurations are completed. <br>

Still having questions? Check out the <a href="/product/UniversalCommerce/docs/?path=docs/faq/faq.md">FAQs Section</a> for help.

<div id="copy_button"></div>
</body>
</html>

