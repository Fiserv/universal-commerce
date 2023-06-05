# Merchant Initiated Transactions (MIT)

**How Merchant Initiated Transactions Work?**

Merchant initiated transactions (MIT) give the merchant the ability to run recurring payments and subscriptions to sell product or services on a scheduled or unscheduled basis. This model allows Merchants to receive payment on time and minimize the efforts for the customer. Merchant initiated transactions are similar to regular customer-initiated sale transactions, with small differences, which this guide will cover. To run a merchant-initiated transaction, few indicators need to be added to the payload sent to uCom.

These indicators will be used by the network to mitigate fraud, transaction id will be provided by uCom, in the initial transaction.

## MIT Fields and indicators

| **Field Name**| **Description**|
| --- | --- |
|`STORED_CREDENTIAL_INDICATOR`|Indicates whether the transaction is the initial request or subsequent. Values: INITIAL or SUBSEQUENT|
|`TRANSACTION_INITIATION_INDICATOR`|Indicates if the transaction is a recurring payment or installment. Values for scheduled: `MIT-RECURRING` or `MIT-INSTALLMENT` For unscheduled. `MIT` For Customer initiated transactions, only one value is allowed, `CUSTOMER`. In MIT case, only `MIT` should be used.|
|`SCHEDULE_INDICATOR`|Scheduled indicator. Values: `SCHEDULED`, `UNSCHEDULED`.|
|`NETWORK_TRANSACTION_ID`|The `NETWORK_TRANSACTION_ID` could be passed for `SUBSEQUENT` requests, and could be obtained in the response form the `INITIAL` request. For subsequent request, this field is expected from the client. if not, uCom will persist this at the time of initial transaction and use it for subsequent transactions.|
|`NETWORK_ORIGINAL_AMOUNT`|The original amount needs to be passed with all subsequent transactions, together with `NETWORK_TRANSACTION_ID`.For subsequent request, this field is expected from the client. if not, uCom will persist this at the time of initial transaction and use it for subsequent transactions.|

## MIT Applicable APIs

MIT indicators are applicable for the APIs below. The MIT indicators must be included in the Request to uCom as demenstrated in the samples below.

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

## Sample Sale Payloads

**<ins> Endpoint URL </ins>**

Below we will share some sample payloads that make use of Merchant Initiated Transactions on the Connected Commerence (uCom) platform.

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
    "requestedAmount": 10.12,s
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
