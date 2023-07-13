# Payment Tokens - Definition, Types, and Usage

Connected Commerce (uCom) offers a wide range of payment tokens that could be used to process payments. Payment tokens are simply used to mask credit card details for added security and protection to the customers' sensitive data (like credit card number, address, account number, etc.). Payment tokens are unique pieces of data used to represent sensitive payment information securely. When a customer initiates a transaction, their sensitive information, such as credit card details or bank account numbers, is exchanged for a token. This token, which is a randomly generated alphanumeric sequence, acts as a stand-in for the actual payment information. By using tokens, the original sensitive data is protected and kept separate from the merchant's or payment processor's systems, reducing the risk of data breaches or unauthorized access. Payment tokens are instrumental in enabling secure digital transactions and are widely employed in various payment methods, such as contactless payments, mobile wallets, and online purchases.

This guide will explore the various payment tokens available in the Connected Commerce (uCom) platform, emphasizing their respective types and providing insights on their acquisition and utilization processes.

## Payment Nonce

A payment nonce, also known as a cryptographic nonce or a one-time token, is a temporary and unique piece of data generated for a specific payment transaction. It serves as a secure placeholder for sensitive payment information, such as credit card details, during the authorization process. Payment nonces are typically used in situations where the actual payment data needs to be transmitted securely over the internet or stored temporarily. Once the payment nonce is created, it is associated with the specific transaction and can only be used for a limited time or a single transaction. This approach helps prevent the exposure of sensitive payment data, as the nonce itself is of no value to potential attackers. Payment nonces are commonly utilized in various payment systems, including online transactions, mobile payments, and other forms of digital commerce, to ensure the protection of sensitive financial information.

### Nonce Generation

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: https://int.api.firstdata.com/ucom/v1/accounts-tokens

Prod: https://prod.api.firstdata.com/ucom/v1/accounts-tokens


**<ins> Headers </ins>**

Content-Type: application/json

Client-Request-Id:{{$guid}}

Api-Key:{{clientKey}}

Authorization: Bearer {{tokenId}}

Timestamp:{{time}}

**<ins> Parameters </ins>**

| Name               | Vaulted | Anonymous | Encrypted | Data Type | Parameter Type | Notes                                                 |
|--------------------|---------|-----------|-----------|-----------|----------------|-------------------------------------------------------|
| Type               | YES     | YES       | string    | body      | CREDIT         |                                                       |
| cardNumber         | YES     | YES       | YES       | string    | body           | No spaces                                             |
| securityCode       | YES     | YES       | YES       | string    | body           | Payment card security code. CVV2                      |
| Month              | YES     | YES       | YES       | string    | body           |                                                       |
| Year               | YES     | YES       | YES       | string    | body           |                                                       |
| nameOnCard         | YES     | YES       |           | string    | body           |                                                       |
| cardType           | YES     | YES       |           | string    | body           | VISA, AMEX, MASTERCARD                               |
| type (billingAddress) | YES | YES       |           | string    | body           | work, home, other                                     |
| streetAddress      | YES     | YES       |           | string    | body           | The full street address component, which may include house number, street name, P.O. box, and multi-line extended street address information. |
| Locality           | YES     | YES       |           | string    | body           | City or locality                                      |
| Region             | YES     | YES       |           | string    | body           | State or County                                       |
| Country            | YES     | YES       |           | string    | body           | Alpha-2 code format; e.g. Dominican Republic (DO)     |
| Formatted          | YES     | YES       |           | string    | body           | The full mailing address, formatted for display or use with a mailing label. |
| Primary            |         |           |           | boolean   | body           | Indicates if this is the default address for the associated resource. |
| tokenType          | YES     | YES       |           | string    | body           | CLAIM_CHECK_NONCE                                    |
| fdCustomerId       | YES     |           |           | string    | body           |                                                       |

**<ins>Sample Nonce Generation Payload - Credit Card - Anonymous**</ins>

``` json

{
    "account": {
        "type": "CREDIT",
        "credit": {
            "cardNumber": "ENC_[.......]",
            "nameOnCard": "John Smith",
            "cardType": "VISA",
            "billingAddress": {
                "type": "home",
                "streetAddress": "9 Church Road, Vange",
                "locality": "Basildon",
                "region": "PR",
                "postalCode": "SS16 4AE",
                "country": "US",
                "primary": true
            },
            "expiryDate": {
                "month": "ENC_[.......]",
                "year": "ENC_[.......]",
            },
            "securityCode": "ENC_[.......]",
        }
    },
    "referenceToken": {
        "tokenType": "CLAIM_CHECK_NONCE"
    }
}

```

**<ins>Sample Nonce Generation Payload - Credit Card - Vaulted Card**</ins>

```json

{
    "account": {
        "type": "CREDIT",
        "credit": {
            "cardNumber": "ENC_[.......]",
            "nameOnCard": "John Smith",
            "cardType": "VISA",
            "billingAddress": {
                "type": "home",
                "streetAddress": "9 Church Road, Vange",
                "locality": "Basildon",
                "region": "PR",
                "postalCode": "SS16 4AE",
                "country": "US",
                "primary": true
            },
            "expiryDate": {
                "month": "ENC_[.......]",
                "year": "ENC_[.......]",
            },
            "securityCode": "ENC_[.......]",
        }
    },
    "referenceToken": {
        "tokenType": "CLAIM_CHECK_NONCE"
    },
    "fdCustomerId": "a5a9440338814181a5f5aa1f06d258d0"
}

```

**<ins>Sample Nonce Generation Response (204 - The request succeeded)**</ins>

```
{
    "type": "CREDIT",
    "token": {
        "tokenType": "CLAIM_CHECK_NONCE",
        "tokenProvider": "UCOM",
        "tokenId": "64028399-f700-42b3-9ab0-27617c62dff1"
    }
}
```

**<ins>Sample Nonce Generation Response (404 – Bad Request)**</ins>

```json
{
    "code": "279912",
    "message": "Decryption failed.",
    "category": "common",
    "developerInfo": {
        "developerMessage": "Decryption failed due to invalid/expired keyId.",
        "fieldError": [
            {
                "field": "KeyId/Algorithm error.",
                "message": "500 Internal Server Error: [{\"code\":\"C000\",\"message\":\"Internal Server Error: [IllegalArgumentException] Illegal base64 character 5f\"}]"
            }
        ]
    }
}

```
A payment nonce could be used to make payments using either auth/capture or sale flows. Below are some sample payloads to process payments through the Connected Commerence (uCom) platform using a payment nonce.

### Make a Payment using a Nonce

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: https://int.api.firstdata.com/ucom/v1/payments/sales

Prod: https://prod.api.firstdata.com/ucom/v1/payments/sales

**<ins> Parameters </ins>**

| Attributes| Data Type| Required| Max Length
|:----------|:----------|:----------|:----------
| fdCustomerId| String| Optional| Maximum 36 characters. 
| orderId| String| Required| Maximum 36 characters.
| storeId/merchantId| String| Required| FD Issued - Alpha-Numeric
| fundingSource| String| Optional| Credit, prepaid
| requestedAmount| String| Required| Dollars. Cents
| Number| Integer| Required| USD = 840
| nameOnCard| String| Required| Maximum 50 characters
| cardType| String| Required| VISA, MASTERCARD,DISCOVER,AMEX
| securityCode| String| Required| Payment card security code 
| Type| String| Optional| Canonical type values of "work", "home", and "other".
| streetAddress| String| Optional| The full street address component, which may include house number, street name, P.O. box, and multi-line extended street address information.
| Locality| String| Optional| The city or locality component.
| Region| String| Optional| 4
| postalCode| String| Required| 5
| Country| String| Optional| The country name component. When specified, the value MUST be in ISO 3166-1 "alpha-2" code format; e.g., the United States and Sweden are "US" and "SE", respectively.
| Formatted| String| Optional| The full mailing address, formatted for display or use with a mailing label.
| Primary| Boolean| Optional| Indicates if this is the default address for the associated resource. It only has meaning when used in a set or array of addresses.
| Month| String| Required| Month format ‘MM’
| Year| String| Required| Year format ‘YY’

**<ins> Headers </ins>**

Content-Type: application/json

Client-Request-Id:{{$guid}}

Api-Key:{{clientKey}}

Authorization: Bearer {{tokenId}}

Timestamp:{{time}}

**<ins>Sample Request (with merchantid)</ins>**

Sample Request - anonymous CC transaction using Nonce with merchantId 

```json
{
   "sale":{
      "orderId":"Order00122",
      "merchantId":"M017311360001",
      "requestedAmount":1,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "saveToVault":false,
         "token":{
            "tokenId":"bab8a932-f9f1-483b-9cf9-bb9a899e1a55",
            "tokenType":"CLAIM_CHECK_NONCE"
         }
      }
   }
}

```

**<ins>Sample Response (201 - Created)</ins>**

Sample Response - anonymous card sale transaction
```json

{
   "fdSaleId":"2651f121f7e64f90871fa25ee5921027",
   "status":"APPROVED",
   "orderId":"34548sdfdsfer769",
   "storeId":"KNOWN_STORE_ID",
   "requestedAmount":1,
   "approvedAmount":1,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "transactionDateTime":"2020-05-07T18:15:52-0400",
   "fundingSource":{
      "type":"CREDIT",
      "credit":{
         "nameOnCard":"John Smith",
         "alias":"1111",
         "cardType":"VISA",
         "billingAddress":{
            "streetAddress":"100 Universal City Plaza",
            "postalCode":"00000"
         },
         "expiryDate":{
            "month":"04",
            "year":"20"
         },
         "token":{
            "tokenId":"8973365013201111",
            "tokenProvider":"TRANS_ARMOR"
         }
      }
   },
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"ET144721"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"303417"
      }
   ]
}

```

## Trans Armor (TA) Tokens

Trans Armor tokens are a specific type of tokenization technology designed to enhance the security of payment transactions. These tokens are generated by the Trans Armor system, a comprehensive solution offered by Fiserv to protect sensitive payment data. Trans Armor tokens are unique and irreversible, replacing sensitive cardholder information with a tokenized substitute. The tokens are securely stored in the merchant's environment and can be used for subsequent transactions, ensuring that the actual payment data remains confidential and inaccessible to unauthorized parties. Trans Armor tokens play a vital role in mitigating the risk of data breaches, fraud, and identity theft, providing a robust layer of protection for businesses and consumers alike.


### TA Token Generation

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: https://int.api.firstdata.com/ucom/v1/accounts-tokens

Prod: https://prod.api.firstdata.com/ucom/v1/accounts-tokens


**<ins> Headers </ins>**

| Name                | Value                 |
|---------------------|-----------------------|
| Content-Type        | application/json      |
| Authorization       | Bearer \<accessToken>  |
| Api-Key             | \<apiKey>             |
| Timestamp           | \<timestamp>          |
| Client-Request-Id   | \<$guid>              |
| Content-Signature   | HMAC \<signature>      |

**<ins> Parameters </ins>**

| Name               | Vaulted | Anonymous | Encrypted | Data Type | Parameter Type | Notes                                                 |
|--------------------|---------|-----------|-----------|-----------|----------------|-------------------------------------------------------|
| Type               | YES     | YES       | string    | body      | CREDIT         |                                                       |
| cardNumber         | YES     | YES       | YES       | string    | body           | No spaces                                             |
| securityCode       | YES     | YES       | YES       | string    | body           | Payment card security code. CVV2                      |
| Month              | YES     | YES       | YES       | string    | body           |                                                       |
| Year               | YES     | YES       | YES       | string    | body           |                                                       |
| nameOnCard         | YES     | YES       |           | string    | body           |                                                       |
| cardType           | YES     | YES       |           | string    | body           | VISA, AMEX, MASTERCARD                               |
| type (billingAddress) | YES | YES       |           | string    | body           | work, home, other                                     |
| streetAddress      | YES     | YES       |           | string    | body           | The full street address component, which may include house number, street name, P.O. box, and multi-line extended street address information. |
| Locality           | YES     | YES       |           | string    | body           | City or locality                                      |
| Region             | YES     | YES       |           | string    | body           | State or County                                       |
| Country            | YES     | YES       |           | string    | body           | Alpha-2 code format; e.g. Dominican Republic (DO)     |
| Formatted          | YES     | YES       |           | string    | body           | The full mailing address, formatted for display or use with a mailing label. |
| Primary            |         |           |           | boolean   | body           | Indicates if this is the default address for the associated resource. |
| tokenType          | YES     | YES       |           | string    | body           | TRANS_ARMOR                                    |
| fdCustomerId       | YES     |           |           | string    | body           |                                                       |

**<ins>TA Token Generation Sample Request**</ins>

```json

{
  "account": {
    "type": "CREDIT",
    "credit": {
      "cardNumber": "ENC_[.......]",
      "cardType": "VISA",
      "billingAddress": {
        "locality": "Beloeil",
        "region": "QC",
        "postalCode": "J3G2P3"
      },
      "expiryDate": {
        "month": "ENC_[.......]"
      },
      "securityCode": "ENC_[.......]"
    }
  },
  "referenceToken": {
    "tokenProvider": "TRANS_ARMOR",
    "tokenType": "FORMAT_PRESERVING_MULTI_USE"
  },
  "fdCustomerId": "60a56f6190f246438b27b9ebb5f16aec"
}


```

**<ins>TA Token Generation Sample Response**</ins>

```josn

{
    "token": {
        "tokenProvider": "TRANS_ARMOR",
        "tokenId": "0434023104757510",
        "expiryDate": {
            "month": "11",
            "year": "19",
            "singleValue": "1119"
        }
    }
}

```

Utilizing a TA Token, payments can be seamlessly conducted through either the auth/capture or sale flows. Below are sample payloads that exemplify the procedure for processing payments via the Connected Commerce (uCom) platform using TA Tokens.

### Make a Payment using a TA Token

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: https://int.api.firstdata.com/ucom/v1/payments/sales

Prod: https://prod.api.firstdata.com/ucom/v1/payments/sales

**<ins>Parameters</ins>**

| Attributes| Data Type| Required| Max Length
|:----------|:----------|:----------|:----------
| fdCustomerId| String| Optional| Maximum 36 characters. 
| orderId| String| Required| Maximum 36 characters.
| storeId/merchantId| String| Required| FD Issued - Alpha-Numeric
| fundingSource| String| Optional| Credit, prepaid
| requestedAmount| String| Required| Dollars. Cents
| Number| Integer| Required| USD = 840
| nameOnCard| String| Required| Maximum 50 characters
| cardType| String| Required| VISA, MASTERCARD,DISCOVER,AMEX
| securityCode| String| Required| Payment card security code 
| Type| String| Optional| Canonical type values of "work", "home", and "other".
| streetAddress| String| Optional| The full street address component, which may include house number, street name, P.O. box, and multi-line extended street address information.
| Locality| String| Optional| The city or locality component.
| Region| String| Optional| 4
| postalCode| String| Required| 5
| Country| String| Optional| The country name component. When specified, the value MUST be in ISO 3166-1 "alpha-2" code format; e.g., the United States and Sweden are "US" and "SE", respectively.
| Formatted| String| Optional| The full mailing address, formatted for display or use with a mailing label.
| Primary| Boolean| Optional| Indicates if this is the default address for the associated resource. It only has meaning when used in a set or array of addresses.
| Month| String| Required| Month format ‘MM’
| Year| String| Required| Year format ‘YY’

**<ins>Headers</ins>**

Content\-Type:application/json

Client\-Request\-Id:{{$guid}}

Api\-Key:{{clientKey}}

Authorization: Bearer {{tokenId}}

Timestamp:{{time}}

**<ins> Sample Request (with merchantid) </ins>**

```json

{
    "sale": {
        "orderId": "1234567891234",
        "merchantId": "MO45009483002",
        "requestedAmount": "1.25",
        "currencyCode": {
            "number": "840"
        },
        "fundingSource": {
            "credit": {
                "nameOnCard": "John Smith",
                "cardType": "VISA",
                "billingAddress": {
                    "streetAddress": "100 Universal City Plaza",
                    "locality": "Hollywood",
                    "region": "CA",
                    "postalCode": "91608",
                    "country": "US"
                },
                "expiryDate": {
                    "month": "12",
                    "year": "21",
                    "singleValue": "1221"
                },
                "token": {
                    "tokenProvider": "TRANS_ARMOR",
                    "tokenId": "7474437453586775"
                }
            }
        }
    }
}

```

**<ins>Sample Response</ins>**

```json

{
    "fdSaleId": "f356ac99a90043348891f2b162a5ff5e",
    "status": "APPROVED",
    "orderId": "1234567891234",
    "requestedAmount": 1.25,
    "approvedAmount": 1.25,
    "currencyCode": {
        "code": "USD",
        "number": 840
    },
    "transactionDateTime": "2021-05-07T04:01:04-0400",
    "fundingSource": {
        "type": "CREDIT",
        "credit": {
            "nameOnCard": "John Smith",
            "alias": "6775",
            "cardType": "VISA",
            "expiryDate": {
                "month": "12",
                "year": "21"
            },
            "token": {
                "tokenId": "7474437453586775",
                "tokenProvider": "TRANS_ARMOR"
            }
        }
    },
    "hostExtraInfo": [
        {
            "name": "APPROVAL_NUMBER",
            "value": "08694 "
        },
        {
            "name": "SEQUENCE_NUMBER",
            "value": "686535"
        },
        {
            "name": "HOST_RESPONSE_CODE",
            "value": "3"
        },
        {
            "name": "HOST_RESPONSE_MESSAGE",
            "value": "APPROVED  08694"
        },
        {
            "name": "HOST_AVS_CODE",
            "value": "AVS+Y"
        },
        {
            "name": "TRANSACTION_DATETIME",
            "value": "2021-05-07T04:01"
        },
        {
            "name": "NETWORK_TRANSACTION_ID",
            "value": "024000507080105"
        }
    ]
}

```

## Network Tokens

Network tokenization refers to the use of tokens provided by payment schemes such as Visa, Mastercard, AMEX, and Discover. For example, Mastercard offers the MasterCard Digital Enablement Service (MDES), while Visa provides Visa Token Services (VTS). These programs aim to enhance the security and efficiency of digital payments. Network tokenization offers several benefits to merchants and cardholders alike. Firstly, it improves authorization rates by ensuring that credentials on file are always valid, thereby increasing payment success rates and reducing declines. Secondly, it significantly reduces the risk of fraudulent transactions and data theft by eliminating the need for sensitive cardholder data to enter the payments ecosystem. This reduction in fraud leads to fewer chargebacks, declines, and interchange fees. Additionally, network tokenization enhances the customer experience by proactively updating token status, preventing failures due to lost, stolen, or expired cards. Consequently, customers experience fewer transaction declines and enjoy a smoother user experience during subsequent and recurring transactions. Overall, the utilization of network tokenization provides significant benefits to both cardholders and merchants in the realm of digital transactions.

### Make a Payment using Network Tokens

**<ins>Endpoint URL</ins>**

HTTP Method: POST

Non-prod: https://int.api.firstdata.com/ucom/v1/payments/sales

Prod: https://prod.api.firstdata.com/ucom/v1/payments/sales

**<ins> Parameters </ins>**

| Attributes| Data Type| Required| Max Length
|:----------|:----------|:----------|:----------
| fdCustomerId| String| Optional| Maximum 36 characters. 
| orderId| String| Required| Maximum 36 characters.
| storeId/merchantId| String| Required| FD Issued - Alpha-Numeric
| fundingSource| String| Optional| Credit, prepaid
| requestedAmount| String| Required| Dollars. Cents
| Number| Integer| Required| USD = 840
| nameOnCard| String| Required| Maximum 50 characters
| cardType| String| Required| VISA, MASTERCARD,DISCOVER,AMEX
| securityCode| String| Required| Payment card security code 
| Type| String| Optional| Canonical type values of "work", "home", and "other".
| streetAddress| String| Optional| The full street address component, which may include house number, street name, P.O. box, and multi-line extended street address information.
| Locality| String| Optional| The city or locality component.
| Region| String| Optional| 4
| postalCode| String| Required| 5
| Country| String| Optional| The country name component. When specified, the value MUST be in ISO 3166-1 "alpha-2" code format; e.g., the United States and Sweden are "US" and "SE", respectively.
| Formatted| String| Optional| The full mailing address, formatted for display or use with a mailing label.
| Primary| Boolean| Optional| Indicates if this is the default address for the associated resource. It only has meaning when used in a set or array of addresses.
| Month| String| Required| Month format ‘MM’
| Year| String| Required| Year format ‘YY’

**<ins> Headers </ins>**

Content\-Type:application/json

Client\-Request\-Id:{{$guid}}

Api\-Key:{{clientKey}}

Authorization: Bearer {{tokenId}}

Timestamp:{{time}}

**<ins>Sample Request (with merchantid)</ins>**

```json

{
    "fdCustomerId": "d0d89a8700884726b6751060a442ae20",
    "sale": {
        "orderId": "Order5d339427",
        "merchantId": "MO06313553001",
        "requestedAmount": "2.25",
        "currencyCode": {
            "number": "840"
        },
        "fundingSource": {
            "credit": {
                "cardType": "VISA",
                "alias": "1111",
                "billingAddress": {
                    "type": "work",
                    "streetAddress": "100 Universal City Plaza",
                    "locality": "Hollywood",
                    "region": "CA",
                    "postalCode": "20220",
                    "country": "US",
                    "formatted": "100 Universal City Plaza\nHollywood",
                    "primary": true
                },
                "token": {
                    "tokenId": "4895370015999979",
                    "cryptogram": "AgAAAAAJYRdaTtkAmJbMg0wAAAA=",
                    "tokenProvider": "THIRD_PARTY_NETWORK_TOKEN",
                    "expiryDate": {
                        "month": "12",
                        "year": "25"
                    }
                }
            }
        },
        "hostExtraInfo": [
            {
                "name": "STORED_CREDENTIAL_INDICATOR",
                "value": "INITIAL"
            },
            {
                "name": "TRANSACTION_INITIATION_INDICATOR",
                "value": "CUSTOMER"
            },
            {
                "name": "SCHEDULE_INDICATOR",
                "value": "UNSCHEDULED"
            }
        ]
    }
}

```

**<ins>Sample Response</ins>**

```json

{
    "fdSaleId": "6b20680ca63349c7aa15e30c1214217a",
    "status": "APPROVED",
    "orderId": "Order5d339427",
    "requestedAmount": 2.25,
    "approvedAmount": 2.25,
    "currencyCode": {
        "code": "USD",
        "number": 840
    },
    "partialPaymentAllowed": true,
    "transactionDateTime": "2022-12-01T08:46:42-0500",
    "fundingSource": {
        "type": "CREDIT",
        "credit": {
            "alias": "1111",
            "cardType": "VISA",
            "expiryDate": {
                "month": "09",
                "year": "25"
            },
            "tokens": [
                {
                    "tokenId": "4895370015999979",
                    "tokenProvider": "THIRD_PARTY_NETWORK_TOKEN",
                    "expiryDate": {
                        "month": "09",
                        "year": "25"
                    }
                }
            ]
        }
    },
    "hostExtraInfo": [
        {
            "name": "APPROVAL_NUMBER",
            "value": "16624 "
        },
        {
            "name": "SEQUENCE_NUMBER",
            "value": "247182"
        },
        {
            "name": "HOST_RESPONSE_CODE",
            "value": "0"
        },
        {
            "name": "HOST_RESPONSE_MESSAGE",
            "value": "APPROVED  16624"
        },
        {
            "name": "TRANSACTION_DATETIME",
            "value": "2022-12-01T07:46"
        },
        {
            "name": "NETWORK_TRANSACTION_ID",
            "value": "895371201134642"
        },
        {
            "name": "PAR_ID",
            "value": "01234567890123456789012345678"
        }
    ]
}

```

## Error Codes 

For comprehensive troubleshooting of potential errors, kindly refer to the designated <a href="../docs/?path=docs/documentation/API_Response_Codes.md"> Error Codes Section</a>. This resource will aid in addressing and resolving any errors that may arise during the course of testing.
