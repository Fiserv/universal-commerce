# How to Utilize 3DS in Connected Commerce

## Getting Started

EMV® 3-D Secure (EMV 3DS) helps payment card issuers and merchants around the world prevent card-not-present (CNP) fraud and increase the security of e-commerce payments.

3-D Secure is an additional security layer for online credit and debit card transactions. The name refers to the "three domains" which interact using the protocol: the merchant/acquirer domain, the issuer domain, and the interoperability domain.

EMV Co enable COF transactions for uCom clients that provide 100% liability shift for our merchants.
Mobile app and uCom shall integrate with EMV 3-D Secure 2.2 specification to support digital payment channels and the delivery of industry leading security, performance and user experience.


<a><img src="https://github.com/Fiserv/universal-commerce/blob/develop/assets/images/3DS_CORE_FLOW.png?raw=true"></a> 


# Core Sequence

1.  uCom receives a request to initiate payment on an open loop credit card.
    1.  This request could be any one of:
        1.  Payments
        2.  Account/Card Onboarding
        3.  Petro Transaction
    2.  Initial request will contain additional data in the device info section of the request
2.  uCom initiates a 3DS Authentication call to 3DS Server
    1.  uCom initiates this request only if the partner is enabled for 3DS
    2.  Response can be one of:
        1.  Success
        2.  Challenge
        3.  Decline
    3.  If success, uCom proceeds onto payment authorization - this FEP authorization message will include additional data elements from the 3DS Authentication step
    4.  By means of a decision flag, a challenge or decline response may be forwarded onto the payment authorization step.
3.  If challenge flow needs to be initiated, a "3DS Authentication Challenge Needed" response is sent as the response to the App Server.
    1.  App Server / App then conducts challenge interactions with the issuer out of band from uCom.
4.  Once App Server / App completes the challenge flow, App Server reinitiates the payment request in the form of a PATCH operation
    1.  Again, this request can be any one of those listed in 1.a.
    2.  This PATCH request will likely contain a transaction id and cres (Challenge Response)
5.  uCom initiates a Status Check call to 3DS Server
    1.  Response can be one of:
        1.  Success
        2.  Decline
    2.  If success, uCom proceeds onto payment authorization - this FEP authorization message will include additional data elements from the 3DS Authentication step.

    <a><img src="https://raw.githubusercontent.com/Fiserv/universal-commerce/develop/assets/images/3DS_Systems_flow.png?raw=true"></a> 


**Types of 3DS flows:**

1. Frictionless flow - An authentication flow not involving the cardholder, is called a frictionless flow. Frictionless flow allows issuers to approve a transaction without the need to interact with the cardholder.

2. Challenge Flow - An authentication flow involving the cardholder is called a challenge flow. The challenge flow is used to present a way of authenticating the cardholder using e.g. OTP or a passphrase.

## Scope

### Apis

1. Add Account (Card verification)

2. Petro Transaction (Payment transaction is Authorization)

  
  
## Dependencies

1. Availability of IPG (3DS) Set-up

2. Modirum Simulator and SDK set-up by the front end


## Data Needed from the Merchant to enable 3DS flow

1. Merchant Category Code 
2. Merchant Name - Need a corporate one for account/card onboarding and multiple ones for site/store level payments.
3. Acquirer BIN - Need a corporate one for account/card onboarding and multiple ones for site/store level payments. Acquirer BIN has to be supplied at card schemes level (VISA, MASTERCARD, AMEX etc.,) 
4. Acquirer MID - Need a corporate one for account/card onboarding and multiple ones for site/store level payments. Acquirer MID has to be supplied at card schemes level (VISA, MASTERCARD, AMEX etc.,) 


## Card on-boarding

**Card Onboarding (Supports only VISA & MC as of now):**

## Frictionless Flow

**STEP 1:** Card/3DS2 Authentication

App SDK/MAS <-> uCom <-> 3DS2 Server (Hosted by IPG) <-> DS (Directory Server) <-> ACS (Access Control Server) <-> Card schemes (VISA/MASTERCARD/AMEX etc.,)

**STEP 2:** Card Verification (This will happen once the 3DS is authenticated) 

uCom <-> Payment Gateway <-> Card schemes (VISA/MASTERCARD/AMEX etc.,)


**<ins> Data Requirements </ins>**

|Field Name| Field Description| Requirement|
| --- | --- | --- |
|deviceInfo.id| Unique Id for the device. Value should not contain line feeds, carriage returns, tabs, leading or trailing spaces, or multiple spaces | Required |
| deviceInfo.kind | Set to "mobile" | Required |
| deviceInfo.details.provider | Device Intelligence provider name. Set to "MODIRUM" | Required |
| deviceInfo.details.dataCapture.dataEventId | Device Intelligence generated Device ID | Required |
| dataCapture | Device data captured as a bundle and transmitted as an encrypted and/or specifically formated string | Required|
|dataCapture.rawData|Device capture - raw data blob|Required|
|dataCapture.dataEventId|Event identifier used map state on the server|Required|
|dataCapture.captureTime|Device data capture time in Internet Date/Time format - yyyy-MM-dd'T'HH:mm:ss'Z'|Required|
|dataStatic|Device static details|Required|
|dataStatic.os|Device OS name|Required|
|dataStatic.osVersion|Device OS version|Required|
|dataStatic.model|Device model|Required|
|dataStatic.type|Device type|Required|
|dataDynamic|Device location details|Required|
|dataDynamic.latitude|Device position - latitude at the time of the data event|Required|
|dataDynamic.longitude|Device position - longitude at the time of the data event|Required|
|dataDynamic.ipAddress|IP address|Required|
|dataDynamic.captureTime|Device data capture time in Internet Date/Time format - yyyy-MM-dd'T'HH:mm:ss'Z'|Required|
|additionalInfo|Name and Value pair. All the mentioned name and value pair in the code snippet should be passed in the request|Required|



  
**Snippet for Card Onboarding Request from MAS**

```json

POST /v1/customers/{fdCustomerId}/accounts

{
    "account": {
        "token": {
            "tokenId": "a16cd463-88e8-4a9e-b2a6-d0985e3af45e",
            "tokenProvider": "UCOM",
            "tokenType": "CLAIM_CHECK_NONCE"
        }
    },
    "deviceInfo": {
        "id": "537edec8-d33e-4ee8-93a7-b9f61876950c",
        "kind": "mobile",
        "details": [
            {
                "provider": "MODIRUM",
                "dataCapture": {
                    "rawData": "$.sdkEncData",
                    "dataEventId": "$.sdkTransID",
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
                "name": "3ds.sdk.timeout",
                "value": "$.sdkMaxTimeout"
            },
            {
                "name": "3ds.sdk.ephemPubKey.kty",
                "value": "$.sdkEphemPubKey.kty"
            },
            {
                "name": "3ds.sdk.ephemPubKey.crv",
                "value": "$.sdkEphemPubKey.crv"
            },
            {
                "name": "3ds.sdk.ephemPubKey.x",
                "value": "$.sdkEphemPubKey.x"
            },
            {
                "name": "3ds.sdk.ephemPubKey.y",
                "value": "$.sdkEphemPubKey.y"
            },
            {
                "name": "3ds.sdk.deviceRenderOptionsIF",
                "value": "$.deviceRenderOptionsIF"
            },
            {
                "name": "3ds.sdk.deviceRenderOptionsUI",
                "value": "$.deviceRenderOptionsUI"
            },
            {
                "name": "3ds.sdk.referenceNumber",
                "value": "$.sdkReferenceNumber"
            },
            {
                "name": "3ds.sdk.appId",
                "value": "$.sdkAppId"
            }
        ]
    }
}

```


**Sample Response (Frictionless Flow - Https Status Code – 201)**

```json

{
    "fdAccountId": "8a7f678d6a20a519016a55c7142b02bc",
    "type": "CREDIT",
    "status": "ACTIVE",
    "credit": {
        "nameOnCard": "Sam G",
        "alias": "1111",
        "cardType": "VISA",
        "billingAddress": {
            "streetAddress": "100 Universal City Plaza",
            "locality": "LONDON",
            "region": "CA",
            "postalCode": "00000",
            "country": "UK"
        },
        "expiryDate": {
            "month": "06",
            "year": "20",
            "singleValue": "0620"
        },
        "sequenceNumber": "01"
    },
    "threeDSecureInfo": {
        "transactionStatus": "A",
        "transactionStatusReason": "10",
        "dsTransactionId": "886fc4446894f878b7e32bd5e",
        "acsTransactionId": "4446894f878b7e32bd5b",
        "serverTransactionId": "894f878b7e32bd5c",
        "acsReferenceNumber": "292bb6b886fc4446894f878b7e32bd5d",
        "cardType": "VISA"
    }
}

```

**Sample Response (Challenge Encountered - Https Status Code – 202)**

```json

{
    "type": "THREEDSECURE",
    "status": "PENDING",
    "threeDSecureInfo": {
        "transactionId": "292bb6b886fc4446894f878b7e32bdww",
        "transactionStatus": "C",
        "transactionStatusReason": "16",
        "dsTransactionId": "886fc4446894f878b7e32bd5e",
        "acsTransactionId": "4446894f878b7e32bd5b",
        "serverTransactionId": "894f878b7e32bd5c",
        "acsReferenceNumber": "292bb6b886fc4446894f878b7e32bd5d",
        "cardType": "VISA",
        "acsSignedContent": "eyJ4NWMiOlsiTUlJQ2x6Q0NBWCtnQXdJQkFnSUJBVEFO"
    }
}

```

  

**Sample Response (Error Response - Https Status Code – 400)**

  

```json

{
    "code": "269701",
    "message": "ThreeDSecure authentication declined.",
    "category": "3ds",
    "developerInfo": {
        "developerMessage": "ThreeDSecure authentication declined."
    },
    "threeDSecureInfo": {
        "transactionStatus": "R",
        "transactionStatusReason": "11",
        "dsTransactionId": "886fc4446894f878b7e32bd5e",
        "acsTransactionId": "4446894f878b7e32bd5b",
        "serverTransactionId": "894f878b7e32bd5c",
        "cardType": "VISA"
    }
}

```

**Sample Response (Error Response - Https Status Code -400 - 3DS not able to perform)**

  

```json

{
    "code": "269702",
    "message": "Failed to complete ThreeDSecure authentication.",
    "category": "3ds",
    "developerInfo": {
        "developerMessage": "Failed to complete ThreeDSecure authentication."
    },
    "threeDSecureInfo": {
        "transactionStatus": "NOT_PROCESSED",
        "transactionStatusReason": "NOT_PROCESSED"
    }
}

```


## Enrollment after Challenge Encountered

**Challenge Flow Steps**

**Card Onboarding**

**STEP 1:** Card/3DS2 Authentication (Challenged)

 1. App SDK/MAS <-> uCom<-> 3DS2 Server (Hosted by IPG) <-> DS
    (Directory Server) <-> ACS (Access Control Server) <-> Card schemes
    (VISA/MASTERCARD/AMEX etc.,)
 2. App (Challenge Request) <-> ACS<-> Issuer (Challenge Response)
 3. App (Challenge Response) <-> uCom <-> 3DS2 Server (Hosted by IPG)<->
    DS <-> ACS <-> Card schemes (VISA/MASTERCARD/AMEX etc.,)


**STEP 2:** Card Verification (This will happen once the 3DS is authenticated)

uCom <-> Payment Gateway <-> Card schemes (VISA/MASTERCARD/AMEX etc.,)



**Snippet for Inquiring Challenge Result**


```json

PATCH /v1/customers/{fdCustomerId}

{
    "account": {
        "type": "THREEDSECURE",
        "threeDSecureInfo": {
            "transactionId": "292bb6b886fc4446894f878b7e32bdww",
            "challengeResponse": "$.encrypted.cres"
        }
    }
}

```

 The result of challenge flow will be either 3DS Approved or Declined or Not Processed where the samples were already provided under the frictionless flow section


**Petro Payment Samples**

3DS flow will be same as mentioned under the card onboarding section. 

**Snippet for Petro Transaction API Request**


```json

POST /v1/petro-transactions

{
    "transaction": {
        "siteInfo": {
            "siteLocationId": "123456790",
            "fuelPurchaseInfo": {
                "pumpNumber": 1,
                "items": [
                    {
                        "posCode": "432",
                        "itemDescription": "Unleaded",
                        "itemPrice": "2.03",
                        "unitOfMeasurement": "liter",
                        "posCodeFormat": "plu",
                        "posCodeModifier": "1",
                        "productCode": "102"
                    }
                ]
            }
        },
        "payments": [
            {
                "currencyNumericCode": {
                    "number": 826
                },
                "requestedAuthAmount": 41.96,
                "fundingSource": {
                    "token": {
                        "tokenId": "c7c9f292-ab59-4cc6-9a66-aadea29e8d5c",
                        "tokenProvider": "UCOM",
                        "tokenType": "CLAIM_CHECK_NONCE"
                    }
                }
            }
        ],
        "printReceipt": true,
        "threeDSecureInfo": {
            "challengeIndicator": "01"
        }
    },
    "deviceInfo": {
        "id": "537edec8-d33e-4ee8-93a7-b9f61876950c",
        "kind": "mobile",
        "details": [
            {
                "provider": "MODIRUM",
                "dataCapture": {
                    "rawData": "$.sdkEncData",
                    "dataEventId": "$.sdkTransID",
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
                "name": "3ds.sdk.timeout",
                "value": "$.sdkMaxTimeout"
            },
            {
                "name": "3ds.sdk.ephemPubKey.kty",
                "value": "$.sdkEphemPubKey.kty"
            },
            {
                "name": "3ds.sdk.ephemPubKey.crv",
                "value": "$.sdkEphemPubKey.crv"
            },
            {
                "name": "3ds.sdk.ephemPubKey.x",
                "value": "$.sdkEphemPubKey.x"
            },
            {
                "name": "3ds.sdk.ephemPubKey.y",
                "value": "$.sdkEphemPubKey.y"
            },
            {
                "name": "3ds.deviceRenderOptionsIF",
                "value": "$.deviceRenderOptionsIF"
            },
            {
                "name": "3ds.deviceRenderOptionsUI",
                "value": "$.deviceRenderOptionsUI"
            },
            {
                "name": "3ds.sdkReferenceNumber",
                "value": "3DSSDK74332823FF"
            },
            {
                "name": "3ds.sdkAppId",
                "value": "dbd64fcb-c19a-4728-8849-e3d50bfdde39"
            }
        ]
    }
}

```

**Sample Response (Frictionless Flow - Https Status Code – 201)**

```json
{
    "transaction": {
        "transactionId": "d06b6dac76314c509b8e4c7068715461",
        "payments": [
            {
                "currencyCode": {
                    "code": "GBP",
                    "number": 826,
                    "currency": "Pound Sterling"
                },
                "requestedAuthAmount": 13.0,
                "approvedAuthAmount": 13.0,
                "fundingSource": {
                    "type": "VAULTED_ACCOUNT",
                    "vaultedAccount": {
                        "fdAccountId": "8a7f48836a20e4a8016a349ba0e30040",
                        "type": "CREDIT"
                    },
                    "credit": {
                        "alias": "9623",
                        "cardType": "VISA",
                        "expiryDate": {
                            "month": "12",
                            "year": "21"
                        }
                    }
                }
            }
        ],
        "status": "AUTHORIZED",
        "threeDSecureInfo": {
            "transactionStatus": "A",
            "transactionStatusReason": "",
            "dsTransactionId": "886fc4446894f878b7e32bd5e",
            "acsTransactionId": "4446894f878b7e32bd5b",
            "serverTransactionId": "894f878b7e32bd5c",
            "acsReferenceNumber": "292bb6b886fc4446894f878b7e32bd5d",
            "cardType": "VISA"
        }
    }
}

```

**Sample Response (Challenge Encountered - Https Status Code – 202)**

```json

{
    "transaction": {
        "transactionId": "6c49cd3472a111e78cf7a6006ad3dba0",
        "status": "CHALLENGED",
        "threeDSecureInfo": {
            "transactionStatus": "C",
            "transactionStatusReason": "16",
            "dsTransactionId": "886fc4446894f878b7e32bd5e",
            "acsTransactionId": "4446894f878b7e32bd5b",
            "serverTransactionId": "894f878b7e32bd5c",
            "acsReferenceNumber": "292bb6b886fc4446894f878b7e32bd5d",
            "cardType": "VISA",
            "acsSignedContent": "eyJ4NWMiOlsiTUlJQ2x6Q0NBWCtnQXdJQkFnSUJBVEFO"
        }
    }
}

```

**Snippet for Inquiring Challenge Result (PATCH CALL)**


```json

PATCH /v1/petro-transactions/{fdTransactionId}

{
  "action": "RESUME_TRANSACTION",
  "threeDSecureInfo": {
    "challengeResponse": "$.encrypted.cres"
  }
}


```

The result of challenge flow will be either 3DS Approved or Declined or Not Processed where the samples were already provided under the frictionless flow section

## 3DS Transaction Statuses

  
Y = fully authenticated

N = Not authenticated

A = Attempted

R = Rejected

U = Unable to authenticate

  

## SDK Transaction Status Reason

  

• 01 = Card authentication failed

• 02 = Unknown Device

• 03 = Unsupported Device

• 04 = Exceeds authentication frequency limit

• 05 = Expired card

• 06 = Invalid card number

• 07 = Invalid transaction

• 08 = No Card record

• 09 = Security failure

• 10 = Stolen card

• 11 = Suspected fraud

• 12 = Transaction not permitted to cardholder

• 13 = Cardholder not enrolled in service

• 14 = Transaction timed out at the ACS

• 15 = Low confidence

• 16 = Medium confidence

• 17 = High confidence

• 18 = Very High confidence

• 19 = Exceeds ACS maximum challenges

• 20 = Non-Payment transaction not supported

• 21 = 3RI transaction not supported

  

## Error Codes 

For comprehensive troubleshooting of potential errors, kindly refer to the designated <a href="../docs/?path=docs/documentation/API_Response_Codes.md"> Error Codes Section</a>. This resource will aid in addressing and resolving any errors that may arise during the course of testing.
  




