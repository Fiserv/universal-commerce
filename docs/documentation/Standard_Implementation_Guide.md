<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body bgcolor="#ffffff">

## Fiserv Universal Commercee REST API Specification

Here is how to utilize this guide. All your necessary steps are on your right and will guide you through the necessary steps to create a customer and start processing payments in universal commerce

## General

>### Connectivity

The uCommerce Gateway services are accessed through the public Internet. uCommerce Gateway accepts communication only via the HTTPS channel. Custom HTTP headers are also used to carry additional information in each request.

**Fully-Qualified URL**

Concatenate the above URL and each endpoint name from the specification to get fully-qualified URL for each environment.

**Example:** Full-qualified URL of /v1/customer API for Integration environment is,

[https://int.api.firstdata.com/ucom/v1/customers/](https://int.api.firstdata.com/ucom/v1/customers/)

>### Authentication

**API-KEYS**
    
Please see the reference document for current implementation.

[https://firstdatanp-ucomgateway.apigee.io/get-started/api-security](https://firstdatanp-ucomgateway.apigee.io/get-started/api-security)

   >### Headers
   >> API HTTP headers
   
 <br>
 <br>
 <br>
   
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

>### Currencies and Locale

  >### Idempotency
      
   The way idempotency is enforced in uCom is strictly as follows:

A transaction can be sent with the same idempotent ID (Client-Request-Id) at any time to receive the same response as the original transaction, however if no response from uCom was received during the initial transaction then the subsequent time the ID is sent will be treated as a new request.

A response includes timeouts, errors, or anything else that is being returned from uCom as a response to the request. This response constitutes a completed transaction as per idempotency rules.

If a transaction is still in flight and the same idempotent ID is used, a 503 error will be returned to signify that the transaction is still in progress. This can be continually retried until a different response (non-503 error) is received to signify whether the transaction has completed or not.

Any other 500 error received constitutes a completed transaction and would need to have a new idempotent ID generated to retry that transaction. In this case the original transaction will be rolled back and no duplicate payments will be made. An example of a scenario when you should resend the idempotent ID would be if the network timed out on client side and no response was received from the uCom application.

Also note that the idempotent ID will only last for 24 hours regardless, so any retries with the same ID would need to be made within the 24-hour window after generation.





# APIs

  >### Customer Services

	This service is related to the uCom Customer Profile Management
	
<div id="copy_button"></div>
</body>
</html>

