# Merchant Initiated Transactions (MIT)

Merchant initiated transactions (MIT) give the merchant the ability to run recurring payments and subscriptions to sell product or services on a scheduled or unscheduled basis. This model allows Merchants to receive payment on time and minimize the efforts for the customer. Merchant initiated transactions are similar to regular customer-initiated transactions, with small differences, which this guide will cover. To run a merchant-initiated transaction, a few indicators must added to the payload sent to uCom.

These indicators will be used by the network to mitigate fraud, transaction id will be provided by uCom, in the initial transaction.

## initial Request 

The Initial request is the very first request when uCom provides `NETWORK_TRANSACTION_ID` in its response. This request is supposed to be used only if merchant doesn't have the `NETWORK_TRANSACTION_ID` stored.

The Initial transaction can be card verification, auth or sale transaction with STORED_CREDENTIAL_INDICATOR = INITIAL, SCHEDULE_INDICATOR = SCHEDULED and TRANSACTION_INITIATION_INDICATOR = MIT-RECURRING

Networks like VISA prefer the original NETWORK_TRANSACTION_ID for fraud detection purposes and may reject transactions if that is not submitted on all subsequent transactions.

>Please note that MIT is supported for all networks, but only VISA and DISCOVER will return the transaction ID, while it will be empty for other networks.

## MIT Fields and indicators

| **Field Name**| **Description**|
| --- | --- |
|`STORED_CREDENTIAL_INDICATOR`|Indicates whether the transaction is the initial request or subsequent. Values: `INITIAL` or `SUBSEQUENT`|
|`TRANSACTION_INITIATION_INDICATOR`|Indicates if the transaction is a recurring payment or installment. Values for scheduled payments: `MIT-RECURRING` or `MIT-INSTALLMENT`. For unscheduled payments: `MIT`. For Customer initiated transactions, only one value is allowed, `CUSTOMER`.|
|`SCHEDULE_INDICATOR`|Scheduled indicator. Values: `SCHEDULED`, `UNSCHEDULED`.|
|`NETWORK_TRANSACTION_ID`|The `NETWORK_TRANSACTION_ID` could be passed for `SUBSEQUENT` requests, and could be obtained in the response form the `INITIAL` request. For subsequent request, this field is expected from the client. if not, uCom will persist this at the time of initial transaction and use it for subsequent transactions.|
|`NETWORK_ORIGINAL_AMOUNT`|The original amount needs to be passed with all subsequent transactions, together with `NETWORK_TRANSACTION_ID`.For subsequent request, this field is expected from the client. if not, uCom will persist this at the time of initial transaction and use it for subsequent transactions.|

## MIT Applicable APIs

MIT indicators are applicable for the APIs below. The MIT indicators must be included in the Request to uCom as demonstrated in the samples below.

### Payments

#### Authorization

/v1/payments/auths

/v1/payments/auths/{fdAuthorizationId}/void

/v1/payments/auths/{fdAuthorizationId}/captures

/v1/payments/captures/{fdCapureId}/refunds

/v1/payments/captures/{fdCapureId}/void

#### Sale

/v1/payments/sales

/v1/payments/sales/{fdSaleId}/void

/v1/payments/sales/{fdSaleId}/refunds

/v1/payments/refunds/{fdRefundId}/void

### Accounts

#### Card Verification

/v1/accounts/verification

Please use the card verification flow for new cards that are not stored on the Connected Commerce (uCom) vault. The call will return the `NETWORK_TRANSACTION_ID`, which is needed for follow up payment transactions. In other words, for new cards, use the card verification API call as the initial transaction, then either a sale or authorization call as the subsequent transaction.

## Sample Sale Payloads

Below are some sample payloads that make use of Merchant Initiated Transactions on the Connected Commerce (uCom) platform.

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/sales>

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/sales>

**<ins> Parameters </ins>**

| **Name** | **Data Type** | **Parameter Type** | **Required** | **Max Length** |
| --- | --- | --- | --- | --- |
| merchantId | String | body | yes | - |
| requestedAmount | String | body | yes | - |
| fdCustomerId | String | body | yes | 32 |
| fdAccountId | String | body | yes | 32 |

**<ins> Sample Request using a Vaulted Card (Initial)**</ins>

```json

{
    "fdCustomerId": "3d000516d6f44d86a3496e731ea2a30d",
    "sale": {
        "orderId": "Order4477211",
        "merchantId": "MG18315433001",
        "requestedAmount": "10.12",
        "currencyCode": {
            "number": "840"
        },
        "fundingSource": {
            "vaultedAccount": {
                "fdAccountId": "8a7f737587bcb71e0187bcb91f9c0000"
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
        ],
        "purchaseInfo": [
            {
                "order": {
                    "orderType": "pay-by-plate"
                }
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
                    "dataEventId": "BB8E4E92...Fz1E063113"
                }
            }
        ]
    }
}
```

**<ins> Sample Response using a Vaulted Card (Initial)**</ins>

```json

{
    "fdSaleId": "dad372f87f44438cb6f760775d45da12",
    "status": "APPROVED",
    "orderId": "Order4477211",
    "requestedAmount": 10.12,
    "approvedAmount": 10.12,
    "currencyCode": {
        "code": "USD",
        "number": 840
    },
    "partialPaymentAllowed": true,
    "transactionDateTime": "2023-05-02T10:16:45-0400",
    "fundingSource": {
        "type": "VAULTED_ACCOUNT",
        "vaultedAccount": {
            "fdAccountId": "8a7f737587bcb71e0187bcb91f9c0000",
            "type": "CREDIT"
        },
        "credit": {
            "nameOnCard": "John Smith",
            "alias": "0026",
            "cardType": "VISA",
            "billingAddress": {
                "streetAddress": "100 Universal City Plaza",
                "postalCode": "20220"
            },
            "expiryDate": {
                "month": "12",
                "year": "24"
            }
        }
    },
    "hostExtraInfo": [
        {
            "name": "APPROVAL_NUMBER",
            "value": "991609"
        },
        {
            "name": "SEQUENCE_NUMBER",
            "value": "812456"
        },
        {
            "name": "HOST_RESPONSE_CODE",
            "value": "4"
        },
        {
            "name": "HOST_RESPONSE_MESSAGE",
            "value": "APPROVED  991609"
        },
        {
            "name": "HOST_AVS_CODE",
            "value": "AVS+Y"
        },
        {
            "name": "TRANSACTION_DATETIME",
            "value": "2023-05-02T10:16"
        },
        {
            "name": "NETWORK_TRANSACTION_ID",
            "value": "012000502141646"
        }
    ]
}

```

**<ins> Sample Request using a Vaulted Card (Subsequent)**</ins>

```json

{  
  "fdCustomerId": "3d000516d6f44d86a3496e731ea2a30d",
    "sale": {
        "orderId": "Order4477211",
        "merchantId": "MG18315433001",
        "requestedAmount": "10.12",
        "currencyCode": {
            "number": "840"
        },
        "fundingSource": {
            "vaultedAccount": {
                "fdAccountId": "8a7f737587bcb71e0187bcb91f9c0000"
            }
        },
        "hostExtraInfo": [
            {
                "name": "STORED_CREDENTIAL_INDICATOR",
                "value": "SUBSEQUENT"
            },
            {
                "name": "TRANSACTION_INITIATION_INDICATOR",
                "value": "MIT-INSTALLMENT"
            },
            {
                "name": "SCHEDULE_INDICATOR",
                "value": "SCHEDULED"
            }
        ],
        "purchaseInfo": [
            {
                "order": {
                    "orderType": "pay-by-plate"
                }
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
                    "dataEventId": "BB8E4E92...Fz1E063113"
                }
            }
        ]
    }
}

```

**<ins> Sample Response using a Vaulted Card (Subsequent)**</ins>

```json

{
    "fdSaleId": "087194318e3c41259e27fd8dfd83c9a1",
    "status": "APPROVED",
    "orderId": "Order4477211",
    "requestedAmount": 10.12,
    "approvedAmount": 10.12,
    "currencyCode": {
        "code": "USD",
        "number": 840
    },
    "partialPaymentAllowed": true,
    "transactionDateTime": "2023-04-26T04:46:04-0400",
    "fundingSource": {
        "type": "VAULTED_ACCOUNT",
        "vaultedAccount": {
            "fdAccountId": "8a7f737587bcb71e0187bcb91f9c0000",
            "type": "CREDIT"
        },
        "credit": {
            "nameOnCard": "John Smith",
            "alias": "0026",
            "cardType": "VISA",
            "billingAddress": {
                "streetAddress": "100 Universal City Plaza",
                "postalCode": "20220"
            },
            "expiryDate": {
                "month": "12",
                "year": "24"
            }
        }
    },
    "hostExtraInfo": [
        {
            "name": "APPROVAL_NUMBER",
            "value": "037436"
        },
        {
            "name": "SEQUENCE_NUMBER",
            "value": "223407"
        },
        {
            "name": "HOST_RESPONSE_CODE",
            "value": "4"
        },
        {
            "name": "HOST_RESPONSE_MESSAGE",
            "value": "APPROVED  037436"
        },
        {
            "name": "HOST_AVS_CODE",
            "value": "AVS+Y"
        },
        {
            "name": "TRANSACTION_DATETIME",
            "value": "2023-04-26T04:46"
        },
        {
            "name": "NETWORK_TRANSACTION_ID",
            "value": "012000426084606"
        }
    ]
}

```

## Sample Auth Payloads

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/auths>

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/auths>

**<ins> Parameters </ins>**

| **Name** | **Data Type** | **Parameter Type** | **Required** | **Max Length** |
| --- | --- | --- | --- | --- |
| merchantId | String | body | yes | - |
| requestedAmount | String | body | yes | - |
| fdCustomerId | String | body | yes | 32 |
| fdAccountId | String | body | yes | 32 |

**<ins> Sample Request using a Vaulted Card (Initial)**</ins>

```json
{
    "fdCustomerId": "3d000516d6f44d86a3496e731ea2a30d",
    "authorization": {
        "orderId": "Order4477211",
        "merchantId": "MG18315433001",
        "requestedAmount": "10.12",
        "currencyCode": {
            "number": "840"
        },
        "fundingSource": {
            "vaultedAccount": {
                "fdAccountId": "8a7f737587bcb71e0187bcb91f9c0000"
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
            },
            {
                "name": "NETWORK_ORIGINAL_AMOUNT",
                "value": "10.12"
            }

        ],
        "purchaseInfo": [
            {
                "order": {
                    "orderType": "pay-by-plate"
                }
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
                    "dataEventId": "BB8E4E92...Fz1E063113"
                }
            }
        ]
    }
}

```

**<ins> Sample Response using a Vaulted Card (Initial)**</ins>

```json

{
    "fdAuthorizationId": "b2154dd170fc43d592a28bae82cc3955",
    "authStatus": "APPROVED",
    "orderId": "Order4477211",
    "requestedAmount": 10.12,
    "approvedAmount": 10.12,
    "currencyCode": {
        "code": "USD",
        "number": 840
    },
    "transactionDateTime": "2023-06-05T15:51:44-0400",
    "fundingSource": {
        "type": "VAULTED_ACCOUNT",
        "vaultedAccount": {
            "fdAccountId": "8a7f737587bcb71e0187bcb91f9c0000",
            "type": "CREDIT"
        },
        "credit": {
            "nameOnCard": "John Smith",
            "alias": "0026",
            "cardType": "VISA",
            "billingAddress": {
                "streetAddress": "100 Universal City Plaza",
                "postalCode": "20220"
            },
            "expiryDate": {
                "month": "12",
                "year": "24"
            }
        }
    },
    "hostExtraInfo": [
        {
            "name": "APPROVAL_NUMBER",
            "value": "006063"
        },
        {
            "name": "SEQUENCE_NUMBER",
            "value": "181231"
        },
        {
            "name": "HOST_RESPONSE_CODE",
            "value": "3"
        },
        {
            "name": "HOST_RESPONSE_MESSAGE",
            "value": "APPROVED  006063"
        },
        {
            "name": "HOST_AVS_CODE",
            "value": "AVS+Y"
        },
        {
            "name": "TRANSACTION_DATETIME",
            "value": "2023-06-05T15:51"
        },
        {
            "name": "NETWORK_TRANSACTION_ID",
            "value": "012000605195146"
        }
    ]
}


```

**<ins> Sample Request using a Vaulted Card (Subsequent)**</ins>

```json

{
    "fdCustomerId": "3d000516d6f44d86a3496e731ea2a30d",
    "authorization": {
        "orderId": "Order4477211",
        "merchantId": "MG18315433001",
        "requestedAmount": "10.12",
        "currencyCode": {
            "number": "840"
        },
        "fundingSource": {
            "vaultedAccount": {
                "fdAccountId": "8a7f737587bcb71e0187bcb91f9c0000"
            }
        },
        "hostExtraInfo": [
            {
                "name": "STORED_CREDENTIAL_INDICATOR",
                "value": "SUBSEQUENT"
            },
            {
                "name": "TRANSACTION_INITIATION_INDICATOR",
                "value": "CUSTOMER"
            },
            {
                "name": "SCHEDULE_INDICATOR",
                "value": "UNSCHEDULED"
            },
            {
                "name": "NETWORK_ORIGINAL_AMOUNT",
                "value": "10.12"
            }

        ],
        "purchaseInfo": [
            {
                "order": {
                    "orderType": "pay-by-plate"
                }
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
                    "dataEventId": "BB8E4E92...Fz1E063113"
                }
            }
        ]
    }
}

```

**<ins> Sample Response using a Vaulted Card (Subsequent)**</ins>

```json

{
    "fdAuthorizationId": "f29cf0ba2d794a0294959d5ece83283d",
    "authStatus": "APPROVED",
    "orderId": "Order4477211",
    "requestedAmount": 10.12,
    "approvedAmount": 10.12,
    "currencyCode": {
        "code": "USD",
        "number": 840
    },
    "transactionDateTime": "2023-06-05T15:55:32-0400",
    "fundingSource": {
        "type": "VAULTED_ACCOUNT",
        "vaultedAccount": {
            "fdAccountId": "8a7f737587bcb71e0187bcb91f9c0000",
            "type": "CREDIT"
        },
        "credit": {
            "nameOnCard": "John Smith",
            "alias": "0026",
            "cardType": "VISA",
            "billingAddress": {
                "streetAddress": "100 Universal City Plaza",
                "postalCode": "20220"
            },
            "expiryDate": {
                "month": "12",
                "year": "24"
            }
        }
    },
    "hostExtraInfo": [
        {
            "name": "APPROVAL_NUMBER",
            "value": "006075"
        },
        {
            "name": "SEQUENCE_NUMBER",
            "value": "363368"
        },
        {
            "name": "HOST_RESPONSE_CODE",
            "value": "3"
        },
        {
            "name": "HOST_RESPONSE_MESSAGE",
            "value": "APPROVED  006075"
        },
        {
            "name": "HOST_AVS_CODE",
            "value": "AVS+Y"
        },
        {
            "name": "TRANSACTION_DATETIME",
            "value": "2023-06-05T15:55"
        },
        {
            "name": "NETWORK_TRANSACTION_ID",
            "value": "012000605195533"
        }
    ]
}

```


## Sample Account Verification Payload

**<ins> Sample Account verification Request**</ins>

```json

{
    "account": {
        "type": "CREDIT",
        "credit": {
            "nameOnCard": "John SmithU",
            "cardNumber": "ENC_[encrypted cards..]",
            "cardType": "VISA",
            "securityCode": "ENC_[encrypted cvv..]",
            "expiryDate": {
                "month": "ENC_[encrypted month..]",
                "year": "ENC_[encrypted year..]"
            },
            "billingAddress": {
                "streetAddress": "AC01 Glenridge Con #2000U",
                "locality": "Atlanta",
                "region": "GA",
                "postalCode": "00000"
            }
        },
        "hostExtraInfo": [
            {
                "name": "STORED_CREDENTIAL_INDICATOR",
                "value": "INITIAL"
            },
            {
                "name": "TRANSACTION_INITIATION_INDICATOR",
                "value": "MIT"
            },
            {
                "name": "SCHEDULE_INDICATOR",
                "value": "UNSCHEDULED"
            }
        ]
    }
}

```

**<ins> Sample Account verification Response**</ins>

```json

{
    "type": "CREDIT",
    "credit": {
        "cardType": "VISA",
        "alias": "1111",
        "expiryDate": {
            "month": "06",
            "year": "19"
        },
        "billingAddress": {
            "streetAddress": "AC01 Glenridge Con #2000",
            "locality": "Atlanta",
            "region": "GA",
            "postalCode": "00000"
        }
    },
    "hostExtraInfo": [
        {
            "name": "NETWORK_TRANSACTION_ID",
            "value": "4352523523"
        }
    ]
}

```
