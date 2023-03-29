
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">   

</head>
<body bgcolor="#ffffff">
<base target="_blank">
## Fiserv Connected Commerce (uCom) REST API Specification

Here is how to utilize this guide. All your necessary steps are on your right and will guide you through the necessary steps to create a customer and start processing payments in Connected Commerce (uCom).

## General

>### Connectivity

The Connected Commerce (uCom) Gateway services are accessed through the public Internet. Connected Commerce (uCom) Gateway accepts communication only via the HTTPS channel. Custom HTTP headers are also used to carry additional information in each request.
	
| Environment | Host | Base Path |
| --- | --- | --- |
| Integration Test / CAT | https://int.api.firstdata.com | /ucom |
| Prod | https://prod.api.firstdata.com | /ucom |

**Fully Qualified URL**

Concatenate the above URL and add the endpoint name from the specification to get the fully-qualified URL for each environment.

**Example:** Full-qualified URL of /v1/customer API for the Integration/CAT environment:

https://int.api.firstdata.com/ucom/v1/customers

>### Authentication

**API SECURITY**
Please see the following reference document for current implementation:
<a href="../docs/?path=docs/documentation/APISecurity.md">API Security Information</a>
<!--[API Security File GL Link](APISecurity.md)-->
<!-- <a href="docs/documentation/APISecurity.md">API Security Guides</a> -->
<!--[https://firstdatanp-ucomgateway.apigee.io/get-started/api-security](https://firstdatanp-ucomgateway.apigee.io/get-started/api-security)-->

  >### Headers
   >> API HTTP headers
   
 
 | Header            | Value                  | Always Required | Description                                                                                                                             |
|-------------------|------------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Api-Key           | <apiKey>               | Yes             | Merchant API key, Refer Apigee portal for more details                                                                                  |
| Timestamp         | <timestamp>            | Yes             | Request initiation timestamp, expecting Epoch time. The value must generate out of UTC timestamp. Sample value format is 1499961987232
| Authorization     | HMAC <signature>       | Yes             | HMAC Key generation, please refer Apigee portal for more details                                                                        |
| Authorization     | Bearer {{accessToken}} | Yes             | Used on /v1/account-tokens                                                                                                              |
| Content-Type      | application/json       | Yes             | application/json                                                                                                                        |
| Client-Request-Id | <$guid>                |                 | This is mandatory and unique for post request to avoid duplicate entry                                                                  |
| Client-Token      | <accessToken>          |                 | Used on POST /v1/payments/sales for anonymous transactions and /v1/customers/{fdCustomerId}/accounts for account transactions           |
| Content-Signature | HMAC <signature>       |                 | Used on /v1/account-tokens                                                                                                              |
   

   >### Securities and Privacy
    >>Field Encryption/Decryption Algorithm

Unless explicitly decided otherwise, confidential information such as account number, card number, passwords etc. should be encrypted prior to exchanging with UCG. The wallet app server has to encrypt the messages using the public key (that will be shared by UCG) and sent to UCG. The steps required for encrypting the sensitive information are:

 - The cipher algorithm is setup to use “RSA/None/PKCS1Padding.” 
 - The sensitive data, such as credit card account number, should be
   encrypted with the cipher algorithm using the shared public key.
 - The encrypted string should then be Base64 encoded.
 - The final encoded string value  replaces the sensitive data.
 - The encoded string is used by UCG to retrieve the sensitive data.

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
      
   The way idempotency is enforced in Connected Commerce (uCom) is strictly as follows:

A transaction can be sent with the same idempotent ID (Client-Request-Id) at any time to receive the same response as the original transaction, however if no response from Connected Commerce (uCom) was received during the initial transaction then the subsequent time the ID is sent will be treated as a new request.

A response includes timeouts, errors, or anything else that is being returned from Connected Commerce (uCom) as a response to the request. This response constitutes a completed transaction as per idempotency rules.

If a transaction is still in flight and the same idempotent ID is used, a 503 error will be returned to signify that the transaction is still in progress. This can be continually retried until a different response (non-503 error) is received to signify whether the transaction has completed or not.

Any other 500 error received constitutes a completed transaction and would need to have a new idempotent ID generated to retry that transaction. In this case the original transaction will be rolled back and no duplicate payments will be made. An example of a scenario when you should resend the idempotent ID would be if the network timed out on client side and no response was received from the Connected Commerce (uCom) application.

Also note that the idempotent ID will only last for 24 hours regardless, so any retries with the same ID would need to be made within the 24-hour window after generation.

>### Host Extra Information

This information is provided by our downstream systems as additional bits of information on the transaction.

##### Possible Success Responses (Applicable for all payment related operation responses)

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

##### Possible Failure Responses

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

## Explore the Connected Commerce (uCom) Services

Click on the links below to explore each endpoint.

### Customer Services

This API handles all of the Connected Commerce (uCom) Customer Profile Management operations (create, read, update, and delete).
	
<a href="../api/?type=post&path=/v1/customers"><img src="https://raw.githubusercontent.com/Fiserv/universal-commerce/develop/assets/images/Picture1.png" alt="Customer_services" style="height:100px"></a>  

[Customer Services API](../api/?type=post&path=/v1/customers)
	
### Security Services
	
This API handles Services related to managing the API security features like access tokens and validation.
  	
<a href="../api/?type=post&path=/v1/tokens"><img src="https://github.com/Fiserv/universal-commerce/blob/develop/assets/images/Picture20.png?raw=true" alt="Security Services" style="height:100px"></a>  

[Security Services API](../api/?type=post&path=/v1/tokens)
	
### Account Services
	
Services related to Connected Commerce (uCom) customer accounts. Accounts can be credit, debit, loyalty, prepaid, etc.
  	
<a href="../api/?type=post&path=/v1/accounts/verification"><img src="https://github.com/Fiserv/universal-commerce/blob/develop/assets/images/Picture4.png?raw=true" alt="Account_services" style="height:100px"></a>  

[Account Services API](../api/?type=post&path=/v1/accounts/verification)
	
### Payment Services
	
This API handles services needed to initiate AUTH/CAPTURE/SALE transactions using a payment account.
  	
<a href="../api/?type=post&path=/v1/payments/auths"><img src="https://github.com/Fiserv/universal-commerce/blob/develop/assets/images/Picture19.png?raw=true" alt="Payments" style="height:100px"></a>  

[Payment Services API](../api/?type=post&path=/v1/payments/auths)

	
### Prepaid Services
	
This API handles services related to prepaid cards such as creating a new prepaid card, balance check, reloading funds, balance transfer etc.
  	
<a href="../api/?type=post&path=/v2/prepaids/multi-purchases"><img src="https://github.com/Fiserv/universal-commerce/blob/develop/assets/images/Picture21.png?raw=true" alt="Prepaid Payments" style="height:100px"></a>  

[Prepaid Services API](../api/?type=post&path=/v2/prepaids/multi-purchases)
	
### Hosted Pages Services
	
This API handles Hosted Pages services and provides CRUD operation for its web pages. With the help of these APIs, hosted pages will be created and rendered to UI.

<a href="../api/?type=get&path=/v1/hosted-pages/pages"><img src="https://github.com/Fiserv/universal-commerce/blob/develop/assets/images/Picture22.png?raw=true" alt="Hosted Pages" style="height:100px"></a>  

[Hosted Pages Services API](../api/?type=get&path=/v1/hosted-pages/pages)
	
>## uCOM - MPPA 

Mobile Payment Application (MPA): This entity is a software application embedded in a
Mobile Device or downloaded by a consumer onto a Mobile Device, such as a smart
phone or tablet, which enables mobile payments for in-store and forecourt transactions.

Mobile Payment Processing Application (MPPA): This entity is an application provided
by the Mobile Payment Processor (MPP) not on the Mobile Device that is responsible for
interfacing between the Token Vault or Token/Trusted Service Provider, the MPA, and the
Site System in order to authorize transactions. The below section will be applicable if Fiserv Connected Commerce (uCom) is acting as a MPPA.

### Petro Services

Services related to purchasing items at a gas station.
	
<a href="../api/?type=post&path=/v1/petro-transactions"><img src="https://github.com/Fiserv/universal-commerce/blob/develop/assets/images/Picture24.png?raw=true" alt="Petrol_Services" style="height:100px"></a>  

[Petro Services API](../api/?type=post&path=/v1/petro-transactions)

### Notifications

 A Notification is a callback mechanism to inform you of events occurring in our system related to a transaction. This is accomplished by making an HTTP call to an endpoint in your system at the moment these events take place.
 
**Event Types**

| Event Type                   | Description |
|------------------------|---------------|
|PETROTRANSACTION_COMPLETED| Used to notify when the fueling is completed or canceled |
|PETROTRANSACTION_FUEL_STARTED| Used to notify when the user started the fueling |
|PETROTRANSACTION_RECEIPT_READY| Used to notify the user when the receipt is ready |

**Headers**

| Header Name      | Required | Description                                                          |
|------------------|----------|----------------------------------------------------------------------|
| Api-Key          | Yes      | Api Key that identifies the client and used as part of the Signature |
| Digest-Algorithm | Yes      | Algorithm used for Message Digest on the payload                     |
| Sig-Algorithm    | Yes      | Algorithm used to generate the Signature                             |
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
The Merchant sends a webhook notification URL in authorization request where the App expects a fueling notification.

Json Object:

```json
"webhookUrl": {
      "href": "string",
      "rel": "self",
      "method": "GET",
      "id": "415e5cf6bfdb11e8a355529269fb1459"
}
```

1. Connected Commerce (uCom) applies a standard URL pattern validation on the webhook endpoint URL if webhookUrl.href is present in the request.
2. Connected Commerce (uCom) configures a list of allowable domain names for a given partner and validates a requested domain name with the configured list.
3. If above point #1 or #2 failed then Connected Commerce (uCom) sends an error to the merchant as invalid message request.
4. If validation is success, we persist the webhookUrl endpoint in Connected Commerce (uCom) system.
5. Whenever the fueling, completion or receipt request comes from POS, Connected Commerce (uCom) system looks up the webhook endpoint from transaction level.
6. If endpoint is available at transaction level, we use it for posting the notifications.
7. If endpoint is not available in transaction, then we publish notifications to the merchant level endpoint via normal notification route.


**Wallet Notification Securities**

 Connected Commerce (uCom) will share a public certificate to the merchant to receive the wallet notifications from Connected Commerce (uCom).

**Sample Wallet Notification Examples**

###### Fuel Started Notification - PETROTRANSACTION_FUEL_STARTED

```json

{
    "id": "996f118665154c8f92b0c1c832808df6",
    "created": 1676536855343,
    "eventType": "PetroTransaction.FUEL_STARTED",
    "resourceType": "PetroTransaction",
    "eventData": {
        "transactionId": "996f118665154c8f92b0c1c832808df6",
        "payments": [
            {
                "currencyCode": {
                    "code": "USD",
                    "number": 840,
                    "currency": "US Dollar"
                },
                "requestedAuthAmount": 15.28,
                "approvedAuthAmount": 15.28,
                "status": "AUTHORIZED",
                "fundingSource": {
                    "type": "VAULTED_ACCOUNT",
                    "vaultedAccount": {
                        "fdAccountId": "8a7f148f864e8ceb018659614b280d84",
                        "type": "CREDIT"
                    },
                    "account": {
                        "fdAccountId": "8a7f148f864e8ceb018659614b280d84",
                        "type": "CREDIT"
                    },
                    "credit": {
                        "alias": "6668",
                        "cardType": "DISCOVER",
                        "expiryDate": {
                            "month": "MASKED",
                            "year": "MASKED"
                        }
                    }
                }
            }
        ],
        "status": "FUEL_STARTED",
        "createdDateTime": "2023-02-16T08:40:32Z",
        "lastUpdatedDateTime": "2023-02-16T08:40:55Z",
        "salePosition": "OUTSIDE_STORE"
    }
}

```

###### Transaction Completed Notification & PETROTRANSACTION_COMPLETED

```json

{
    "id": "996f118665154c8f92b0c1c832808df6",
    "created": 1676536866581,
    "eventType": "PetroTransaction.COMPLETED",
    "resourceType": "PetroTransaction",
    "eventData": {
        "transactionId": "996f118665154c8f92b0c1c832808df6",
        "siteInfo": {
            "siteLocationId": "770006",
            "fuelPurchaseInfo": {
                "pumpNumber": 1,
                "serviceLevelCode": "S"
            }
        },
        "payments": [
            {
                "currencyCode": {
                    "code": "USD",
                    "number": 840,
                    "currency": "US Dollar"
                },
                "requestedAuthAmount": 15.28,
                "approvedAuthAmount": 15.28,
                "capturedAmount": 19.74,
                "status": "COMPLETED",
                "fundingSource": {
                    "type": "VAULTED_ACCOUNT",
                    "vaultedAccount": {
                        "fdAccountId": "8a7f148f864e8ceb018659614b280d84",
                        "type": "CREDIT"
                    },
                    "account": {
                        "fdAccountId": "8a7f148f864e8ceb018659614b280d84",
                        "type": "CREDIT"
                    },
                    "credit": {
                        "alias": "6668",
                        "cardType": "DISCOVER",
                        "expiryDate": {
                            "month": "MASKED",
                            "year": "MASKED"
                        }
                    }
                }
            }
        ],
        "status": "COMPLETED",
        "finalTransactionAmount": 19.74,
        "saleItems": [
            {
                "itemDescription": "UNLD",
                "itemPrice": 2.639,
                "unitOfMeasurement": "ea",
                "unitsSold": 7.48,
                "totalItemSaleAmount": 19.74,
                "posCode": "00000000000001",
                "productCode": "4",
                "type": "FUEL",
                "priceTier": "credit"
            }
        ],
        "transactionDateTime": "2023-02-16T08:40:34Z",
        "createdDateTime": "2023-02-16T08:40:32Z",
        "lastUpdatedDateTime": "2023-02-16T08:41:06Z",
        "salePosition": "OUTSIDE_STORE"
    }
}

```

###### Transaction Receipt Notification & PETROTRANSACTION_RECEIPT_READY

```json

{
    "id": "996f118665154c8f92b0c1c832808df6",
    "created": 1676536867076,
    "eventType": "PetroTransaction.RECEIPT_READY",
    "resourceType": "PetroTransaction.ReceiptData",
    "eventData": {
        "transactionId": "996f118665154c8f92b0c1c832808df6",
        "siteInfo": {
            "siteLocationId": "770006",
            "fuelPurchaseInfo": {
                "pumpNumber": 1,
                "serviceLevelCode": "S"
            }
        },
        "payments": [
            {
                "currencyCode": {
                    "code": "USD",
                    "number": 840,
                    "currency": "US Dollar"
                },
                "requestedAuthAmount": 15.28,
                "approvedAuthAmount": 15.28,
                "capturedAmount": 19.74,
                "status": "COMPLETED",
                "fundingSource": {
                    "type": "VAULTED_ACCOUNT",
                    "vaultedAccount": {
                        "fdAccountId": "8a7f148f864e8ceb018659614b280d84",
                        "type": "CREDIT"
                    },
                    "account": {
                        "fdAccountId": "8a7f148f864e8ceb018659614b280d84",
                        "type": "CREDIT"
                    },
                    "credit": {
                        "alias": "6668",
                        "cardType": "DISCOVER",
                        "expiryDate": {
                            "month": "MASKED",
                            "year": "MASKED"
                        }
                    }
                }
            }
        ],
        "status": "COMPLETED",
        "finalTransactionAmount": 19.74,
        "saleItems": [
            {
                "itemDescription": "UNLD",
                "itemPrice": 2.639,
                "unitOfMeasurement": "ea",
                "unitsSold": 7.48,
                "totalItemSaleAmount": 19.74,
                "posCode": "00000000000001",
                "productCode": "4",
                "type": "FUEL",
                "priceTier": "credit"
            }
        ],
        "receiptData": {
            "receiptSection": "full",
            "receiptLines": {
                "plain": [
                    "",
                    " FUELS LAB",
                    "565 SOUTH MASON RD #",
                    "KATY, AB ",
                    "77450",
                    "",
                    "02/16/2023 496410494",
                    "03:41:06 AM",
                    "",
                    "INVOICE null",
                    "AUTH 020543",
                    "",
                    "PUMP# 1",
                    "Supreme CR 3.195G",
                    "PRICE/GAL $ 1.00",
                    "FUEL PURCHASED Gal. 10",
                    "FUEL TOTAL $ 10.00",
                    "",
                    "--------",
                    "Total = $ 10.00",
                    "",
                    "",
                    "CREDIT $ 11.533",
                    "",
                    "CRIND RECEIPT FOOTER",
                    "",
                    ""
                ]
            }
        },
        "transactionDateTime": "2023-02-16T08:40:34Z",
        "createdDateTime": "2023-02-16T08:40:32Z",
        "lastUpdatedDateTime": "2023-02-16T08:41:07Z",
        "salePosition": "OUTSIDE_STORE"
    }
}

```

### Transaction History Services

Services related to viewing the list of receipts, transactions details, and adding a note to a particular transaction
	
<a href="../api/?type=get&path=/v1/txhistory/customers/{fdCustomerId}/transactions"><img src="https://github.com/Fiserv/universal-commerce/blob/develop/assets/images/Picture23.png?raw=true" alt="Tx_Services" style="height:100px"></a>  

[Transaction History Services API](../api/?type=get&path=/v1/txhistory/customers/{fdCustomerId}/transactions)

This completes the uCOM-MPPA section.

## Use Cases 

The APIs can be used in different scenarios. We will describe the most common ones to give you an idea about the possibilities. Please see the <a href="../recipes/?path=recipes/LandingPage.md">Common Use Cases Section</a> to learn more.
	
## Testing
	
A specific set of testing cards will be provided to you by the Implementation Team once all the uCom configurations are completed. <br>

Still have questions? Check out the <a href="../docs/?path=docs/faq/faq.md">FAQs Section</a> for more help.

<div id="copy_button"></div>
</body>
</html>

