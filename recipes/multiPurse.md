# Multi Purse

Multi Purse Capabilities give the merchants ability to process below activities for multiple gift cards in one go.

 **Capability** | **Description** |
| --- | --- |
| Purchase | Activate multiple purses / gift cards|
| Reload | Reload multiple purses / gift cards|
| Sweep | Remove entire balance from multiple purses / gift cards|
| Deduct | Deduct specific balances from multiple purses / gift cards|
| Sale | Complete sale by using multiple purses / gift cards|
| Void | Void multiple purses / gift cards|

## Multi Purse Impacted APIs

Multi Purse capabilities are applicable for the APIs below.

### Purchase

Use the below apis to activate multiple gift cards in a single transaction and to cancel the activation of the multiple gift cards.

/v2/prepaids/multi-purchases

Refer below to know more details regarding request , response pay loads and schema.

[Prepaid Services API](../api/?type=post&path=/v2/prepaids/multi-purchases)

/v2/prepaids/multi-purchases/{fdParentTransactionId}/multi-void

Refer below to know more details regarding request , response pay loads and schema.

[Prepaid Services API](../api/?type=post&path=//v2/prepaids/multi-purchases/{fdParentTransactionId}/multi-void)

### Reload

Use the below apis to add funds to the multiple gift cards in a single transaction and to cancel the reload.

/v2/prepaids/multi-reloads

/v2/prepaids/multi-reloads/{fdParentTransactionId}/multi-void

### Sweeps

Use the below apis to remove entire balance from multiple gift cards in a single transaction and cancel the sweep transaction for the multiple gift cards.

/v2/prepaids/multi-sweeps

/v2/prepaids/sweeps/{fdParentTransactionId}/multi-void

### Deducts

Use the below apis to deduct balance from multiple gift cards in a single transaction and cancel the deduct transaction for the multiple gift cards.

/v2/prepaids/multi-deducts

/v2/prepaids/deducts/{fdParentTransactionId}/multi-void

### Sale

Use the below apis to use multiple gift cards for the purchases, to cancel the sale transaction and to refund.

/v2/prepaids/multi-sales

/v2/prepaids/multi-sales/{fdParentTransactionId}/void

/v2/prepaids/multi-sales/{fdParentTransactionId}/refunds

## Sample Multi Purchase Payloads

Below are some sample payloads that make use of Multi Purse.

Please refer this to go through multi purchase schema and all possible payload parameters.

[Prepaid Services API](../api/?type=post&path=/v2/prepaids/multi-purchases)

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom//v2/prepaids/multi-purchases>

Prod: <https://prod.api.firstdata.com/ucom//v2/prepaids/multi-purchases>

**<ins> Field Description </ins>**

| **Name** | **Description** | **Required** |
| --- | --- | --- |
| saveToVault | Flag to indicate if the account should be stored in the uCom vault.| yes |
| promotionCode | Promotion code for prepaid account activation. | yes |
| fundValue | Requested fund amount for the gift card. Even if it is zero doller gift card, the fundValue field is required and the value should be 0.| yes |
| isMerchantFunded | Flag that indicates if the source of the payment is funded by merchant vs customer | yes |
| merchantTransactionId | •	Must be unique in every request except retry request and void request without fdParentTransactionId.| yes |
| orderId | uCom accepting orderId both at parent level and at child/purse/account level. | no |
| replayCount | Indicates request retry attempt count in case of retrying same transaction again.| no |
| externalId | External transaction id reference | no |
| merchantId | Flag to indicate if the account should be stored in the uCom vault.| yes |
| altMerchantId | Alternate Merchant identifier where the transaction is being performed. | yes |
| merchantTerminalId | Merchant terminal identifier.| yes |
| hostExtraInfo.LOCAL_TXN_DATE | uCom sends this field as-is to Value Link for reporting purposes | no |
| hostExtraInfo.LOCAL_TXN_TIME | uCom sends this field as-is to Value Link for reporting purposes.| no |
| Postdate | uCom sends this field as-is to Value Link for reporting purposes. | no |

**<ins> Sample Request - Create/Activate a List of Merchant Funded Purses**</ins>

When verifyAccount flag is true, verification API will be internally initiated for account validation before proceeding sale transaction.  merchantId & altMerchantId should be sent in the request only in parent level when this verifyAccount is true.

```json

{
    "fdCustomerId": "ed0a809bc6164ed7b2dae602ae90d10d",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "merchantId": "99022879997",
    "altMerchantId": "0001",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "replayCount": 1, // This field is applicable only on a request retry scenario, it will indicate the number of retry attempts
    "postDate": "05252022",
    "hostExtraInfo": [
        {
            "name": "LOCAL_TXN_DATE",
            "value": "05102022"
        },
        {
            "name": "LOCAL_TXN_TIME",
            "value": "202059"
        }
    ]
  "transactions": [
        {
            "saveToVault": true,
            "externalId": "7777883838388999",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "account": {
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "merchantTerminalId": "0002",
                "cardSubType": "test12",
                "promotionCode": "57051",
                "isEANRequired": false
            },
            "fundingInfo": {
                "fundValue": 0,
                "isMerchantFunded": true,
                "currencyCode": {
                    "code": "USD",
                    "number": 840
                }
            }
        },
        {
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "saveToVault": true,
            "externalId": "7777883838388999",
            "account": {
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "merchantTerminalId": "0002",
                "cardSubType": "test45",
                "promotionCode": "57052",
                "isEANRequired": true
            },
            "fundingInfo": {
                "fundValue": 5,
                "isMerchantFunded": true,
                "currencyCode": {
                    "code": "USD",
                    "number": 840
                }
            }
        },
        {
            "merchantTransactionId": "38943939903ed0a8090d10dert34",
            "saveToVault": true,
            "externalId": "7777883838388999",
            "account": {
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "cardSubType": "test67",
                "promotionCode": "57053",
                "isEANRequired": true
            },
            "fundingInfo": {
                "fundValue": 5,
                "isMerchantFunded": true,
                "currencyCode": {
                    "code": "USD",
                    "number": 840
                }
            }
        }
    ]
}
```

**<ins> Sample Success Response for Merchant Funded Purchase - 201 </ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b6e",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "status": "APPROVED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57051",
                "alias": "8453",
                "balance": {
                    "currentBalance": 5,
                    "beginBalance": 5,
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                },
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                }
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "7777883838388999",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b34",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "status": "APPROVED",
            "account": {
                "cardNumber": "7759649826438111",
                "cardSubType": "test45",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57052",
                "alias": "8111",
                "balance": {
                    "currentBalance": 5,
                    "beginBalance": 5,
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                },
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401df"
                }
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "7777883838388999",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "430978"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "125922"
                }
            ]
        },
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b34",
            "merchantTransactionId": "38943939903ed0a8090d10dert33",
            "status": "APPROVED",
            "account": {
                "cardNumber": "7759649826438111",
                "cardSubType": "test45",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57052",
                "alias": "8111",
                "balance": {
                    "currentBalance": 5,
                    "beginBalance": 5,
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                },
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401df"
                }
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "7777883838388999",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "430978"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "125922"
                }
            ]
        }
    ]
}

```

**<ins> Sample Response - Two transactions approved and one transaction failed - 207 - Multi - Status**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b6e",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "status": "APPROVED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57051",
                "alias": "8453",
                "balance": {
                    "currentBalance": 5,
                    "beginBalance": 5,
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                },
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                }
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "7777883838388999",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b6e",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "status": "FAILED",
            "account": {
                "cardSubType": "test45",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57052"
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "8738743788739",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": "Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        },
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b6e",
            "merchantTransactionId": "38943939903ed0a8090d10dert33",
            "status": "APPROVED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57051",
                "alias": "8453",
                "balance": {
                    "currentBalance": 5,
                    "beginBalance": 5,
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                },
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                }
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "7777883838388999",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        }
    ]
}
```

**<ins> Sample Response - One transaction approved , one transaction declined, and one transaction failed - 207 - Multi - Status**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b6e",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "status": "APPROVED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57051",
                "alias": "8453",
                "balance": {
                    "currentBalance": 5,
                    "beginBalance": 5,
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                },
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                }
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "7777883838388999",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b6e",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "status": "FAILED",
            "account": {
                "cardSubType": "test45",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57052"
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "8738743788739",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": "Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        },
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b6e",
            "merchantTransactionId": "38943939903ed0a8090d10dert33",
            "status": "DECLINED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57051",
                "alias": "8453",
                "balance": {
                    "currentBalance": 5,
                    "beginBalance": 5,
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                },
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                }
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "7777883838388999",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        }
    ]
}

```

**<ins> Sample Response - All transactions failed- 207 - Multi-Status**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b6e",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "status": "FAILED",
            "account": {
                "cardSubType": "test45",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57052"
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "8738743788739",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": "Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        },
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b6e",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "status": "FAILED",
            "account": {
                "cardSubType": "test45",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57052"
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "8738743788739",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": "Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        },
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b6e",
            "merchantTransactionId": "38943939903ed0a8090d10dert33",
            "status": "FAILED",
            "account": {
                "cardSubType": "test45",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57052"
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "8738743788739",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": "Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        }
    ]
}
```

**<ins> Sample Response - All transactions declined- 207 - Multi-Status**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": " xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b6e",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "status": "DECLINED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57051",
                "alias": "8453"
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "7777883838388999",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "HOST_RESPONSE_MESSAGE",
                    "value": "Declined 995224"
                },
                {
                    "name": "HOST_RESPONSE_CODE",
                    "value": "995224"
                }
            ]
        },
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b34",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "status": "DECLINED",
            "account": {
                "cardSubType": "test45",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57052"
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "8738743788739",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": "Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                },
                "hostExtraInfo": [
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
        },
        {
            "transactionId": "67179516b00d4d9aad00bcff5d019b6e",
            "merchantTransactionId": "38943939903ed0a8090d10dert33",
            "status": "DECLINED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "promotionCode": "57051",
                "alias": "8453"
            },
            "createdTime": "2022-01-26T17:02:23.952Z",
            "externalId": "7777883838388999",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
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
    ]
}
```

**<ins> Multi Purchase Void Sample Request**</ins>

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v2/prepaids/purchases/{fdParentTransactionId}/multi-void>

Prod: <https://prod.api.firstdata.com/ucom/v2/prepaids/purchases/{fdParentTransactionId}/multi-void>

**<ins> Parameters </ins>**

| **Name** | **Data Type** | **Parameter Type** | **Required** | **Max Length** |
| --- | --- | --- | --- | --- |
| fdCustomerId | String | path | yes | - |

```json

{
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "postDate": "05252022",
    "replayCount": 1,
    "hostExtraInfo": [
        {
            "name": "LOCAL_TXN_DATE",
            "value": "05102022"
        },
        {
            "name": "LOCAL_TXN_TIME",
            "value": "202059"
        }
    ],
    "transactions": [
        {
            "externalId": "7777883838389999",
            "merchantTransactionId": "38943939903ed0a8090d10dert31"
        },
        {
            "externalId": "6666883838388888",
            "merchantTransactionId": "38943939903ed0a8090d10dert32"
        },
        {
            "externalId": "555583838387777",
            "merchantTransactionId": "38943939903ed0a8090d10dert34"
        }
    ]
}
```

**<ins> Sample Response - Transaction Successfully Voided</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "8as8a8a99a9876543232sdgf345",
            "externalId": "7777883838388999",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "status": "CANCELLED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "alias": "8453",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                },
                "balance": {
                    "currentBalance": "5",
                    "beginBalance": "20",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "transactionId": "9876543232xdvxv34398s89afa9",
            "externalId": "88388383838839",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "status": "CANCELLED",
            "account": {
                "cardNumber": "7759649826438111",
                "cardSubType": "test34",
                "alias": "8111",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                },
                "balance": {
                    "currentBalance": "5",
                    "beginBalance": "20",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530911"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005922"
                }
            ]
        },
        {
            "transactionId": "9876543232xdvxv34398s89afa9",
            "externalId": "88388383838839",
            "merchantTransactionId": "38943939903ed0a8090d10dert34",
            "status": "CANCELLED",
            "account": {
                "cardNumber": "7759649826438111",
                "cardSubType": "test34",
                "alias": "8111",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                },
                "balance": {
                    "currentBalance": "5",
                    "beginBalance": "20",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530911"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005922"
                }
            ]
        }
    ]
}
```

**<ins> Sample Response - Transactions Partially Voided- 207 - Multi - Status**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "8as8a8a99a9876543232sdgf345",
            "externalId": "7777883838388991",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "status": "CANCELLED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "alias": "8453",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                },
                "balance": {
                    "currentBalance": "20",
                    "beginBalance": "5",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "transactionId": "8as8a8a99a9876543232sdgf346",
            "externalId": "7777883838388992",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "status": "FAILED",
            "account": {
                "cardNumber": "7759649826438111",
                "cardSubType": "test34",
                "alias": "8111",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                }
            },
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                },
                "hostExtraInfo": [
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
        },
        {
            "transactionId": "8as8a8a99a9876543232sdgf346",
            "externalId": "7777883838388992",
            "merchantTransactionId": "38943939903ed0a8090d10dert34",
            "status": "NOTPROCESSED",
            "account": {
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                }
            },
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                },
                "hostExtraInfo": [
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
        },
        {
            "transactionId": "8as8a8a99a9876543232sdgf345",
            "externalId": "7777883838388991",
            "merchantTransactionId": "38943939903ed0a8090d10dert33",
            "status": "CANCELLED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "alias": "8453",
                "balance": {
                    "currentBalance": "20",
                    "beginBalance": "5",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840,
                        "vaultedAccount": {
                            "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                        }
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        }
    ]
}
```

## Sample Multi Reload Payloads

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom//v2/prepaids/multi-reloads>

Prod: <https://prod.api.firstdata.com/ucom//v2/prepaids/multi-reloads>

**<ins> Parameters </ins>**

| **Name** | **Data Type** | **Parameter Type** | **Required** | **Max Length** |
| --- | --- | --- | --- | --- |
| fdCustomerId | String | body | yes | 32 |
| fdAccountId | String | body | yes | 32 |

**<ins> Sample Request - Merchant Funded Reload on Vaulted Gift Cards**</ins>

```json
{
    "fdCustomerId": "83d9397b9a454bf1b0dc669dfc9af6d3",
    "parentExternalId": "95938141211091",
    "merchantTransactionId": "MultiReload_0718_28",
    "purchaseInfo": {
        "order": {
            "orderId": "Xabc071122"
        }
    },
    "replayCount": 0,
    "hostExtraInfo": [
        {
            "name": "LOCAL_TXN_DATE",
            "value": "07112022"
        },
        {
            "name": "LOCAL_TXN_TIME",
            "value": "060842"
        }
    ],
    "transactions": [
        {
            "destinationCard": {
                "account": {
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "vaultedAccount": {
                        "fdAccountId": "8a7ff87d82004e1101820f4e790503e2"
                    }
                }
            },
            "fundingInfo": {
                "fundValue": 10,
                "isMerchantFunded": true,
                "currencyCode": {
                    "code": "USD",
                    "number": 840
                }
            }
        },
        {
            "destinationCard": {
                "account": {
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "vaultedAccount": {
                        "fdAccountId": "8a7ff87d82004e1101820f4e795103e3"
                    }
                }
            },
            "fundingInfo": {
                "fundValue": 10,
                "isMerchantFunded": true,
                "currencyCode": {
                    "code": "USD",
                    "number": 840
                }
            }
        }
    ]
}

```

**<ins> Sample Response - Reload Success Using Vaulted Accounts**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "8s9s98s989s98a899876543232",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "status": "APPROVED",
            "destinationCard": {
                "account": {
                    "cardNumber": "6759649826438453",
                    "cardSubType": "test12",
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8453",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                    },
                    "balance": {
                        "currentBalance": 20,
                        "beginBalance": 5,
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738234",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "transactionId": "987654323ert3d5dt5e44564642",
            "status": "APPROVED",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "destinationCard": {
                "account": {
                    "cardNumber": "6759649826438111",
                    "cardSubType": "test34",
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8111",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                    },
                    "balance": {
                        "currentBalance": 20,
                        "beginBalance": 5,
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738235",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530960"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005970"
                }
            ]
        },
        {
            "transactionId": "987654323ert3d5dt5e44564643",
            "status": "APPROVED",
            "merchantTransactionId": "38943939903ed0a8090d10dert34",
            "destinationCard": {
                "account": {
                    "cardNumber": "6759649826438111",
                    "cardSubType": "test34",
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8111",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                    },
                    "balance": {
                        "currentBalance": 20,
                        "beginBalance": 5,
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738235",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530960"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005970"
                }
            ]
        }
    ]
}
```

**<ins> Sample Response - Two Transactions Success and One Failed 207 - Multi Status**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "8s9s98s989s98a899876543232",
            "status": "APPROVED",
            "merchantTransactionId": "38943939903ed0a8090d10dert30",
            "destinationCard": {
                "account": {
                    "cardNumber": "6759649826438453",
                    "cardSubType": "test12",
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8453",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                    },
                    "balance": {
                        "currentBalance": 20,
                        "beginBalance": 5,
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738234",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "transactionId": "987654323ert3d5dt5e44564642",
            "status": "APPROVED",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "destinationCard": {
                "account": {
                    "cardNumber": "6759649826438111",
                    "cardSubType": "test34",
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8111",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                    },
                    "balance": {
                        "currentBalance": 20,
                        "beginBalance": 5,
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738235",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530960"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005970"
                }
            ]
        },
        {
            "transactionId": "987654323ert3d5dt5e44564642",
            "status": "FAILED",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "destinationCard": {
                "account": {
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8111",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738235",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                },
                "hostExtraInfo": [
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
        }
    ]
}

```

**<ins> Sample Response - Two Transactions Success and one Declined - 207 - Multi Status**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "8s9s98s989s98a899876543232",
            "status": "APPROVED",
            "merchantTransactionId": "38943939903ed0a8090d10dert30",
            "destinationCard": {
                "account": {
                    "cardNumber": "6759649826438453",
                    "cardSubType": "test12",
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8453",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                    },
                    "balance": {
                        "currentBalance": 20,
                        "beginBalance": 5,
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738234",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "transactionId": "987654323ert3d5dt5e44564642",
            "status": "APPROVED",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "destinationCard": {
                "account": {
                    "cardNumber": "6759649826438111",
                    "cardSubType": "test34",
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8111",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                    },
                    "balance": {
                        "currentBalance": 20,
                        "beginBalance": 5,
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738235",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530960"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005970"
                }
            ]
        },
        {
            "transactionId": "987654323ert3d5dt5e44564642",
            "status": "DECLINED",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "destinationCard": {
                "account": {
                    "cardNumber": "6759649826438111",
                    "cardSubType": "test34",
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8111",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738235",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                },
                "hostExtraInfo": [
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
        }
    ]
}

```

**<ins> Sample Response - All declined - 207 - Multi Status**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "987654323ert3d5dt5e44564641",
            "status": "DECLINED",
            "merchantTransactionId": "38943939903ed0a8090d10dert30",
            "destinationCard": {
                "account": {
                    "cardNumber": "6759649826438111",
                    "cardSubType": "test34",
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8111",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738235",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        },
        {
            "transactionId": "987654323ert3d5dt5e44564642",
            "status": "DECLINED",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "destinationCard": {
                "account": {
                    "cardNumber": "6759649826438111",
                    "cardSubType": "test34",
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8111",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738235",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                },
                "hostExtraInfo": [
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
        },
        {
            "transactionId": "987654323ert3d5dt5e44564643",
            "status": "DECLINED",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "destinationCard": {
                "account": {
                    "cardNumber": "6759649826438111",
                    "cardSubType": "test34",
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8111",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738235",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                },
                "hostExtraInfo": [
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
        }
    ]
}
```

**<ins> Sample Response - All failed - 207 - Multi Status**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "987654323ert3d5dt5e44564641",
            "status": "FAILED",
            "merchantTransactionId": "38943939903ed0a8090d10dert30",
            "destinationCard": {
                "account": {
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8111",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738235",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        },
        {
            "transactionId": "987654323ert3d5dt5e44564642",
            "status": " FAILED ",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "destinationCard": {
                "account": {
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8111",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738235",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        },
        {
            "transactionId": "987654323ert3d5dt5e44564643",
            "status": " FAILED ",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "destinationCard": {
                "account": {
                    "merchantId": "99022879997",
                    "altMerchantId": "0001",
                    "alias": "8111",
                    "vaultedAccount": {
                        "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                    }
                }
            },
            "createdTime": "2022-01-26T17:37:59.911Z",
            "externalId": "8738743788738235",
            "purchaseInfo": [
                {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                }
            ],
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        }
    ]
}
```

## Sample Payloads - Cancel a Reload Transaction

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v2/prepaids/reloads/{fdParentTransactionId}/multi-void>

Prod: <https://prod.api.firstdata.com/ucom/v2/prepaids/reloads/{fdParentTransactionId}/multi-void>

**<ins> Parameters </ins>**

| **Name** | **Data Type** | **Parameter Type** | **Required** | **Max Length** |
| --- | --- | --- | --- | --- |
| fdParentTransactionId | String | path | yes | - |

**<ins> Sample Request - Cancel All Transactions**</ins>

```json
{
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "postDate": "05252022",
    "replayCount": 1,
    "hostExtraInfo": [
        {
            "name": "LOCAL_TXN_DATE",
            "value": "05102022"
        },
        {
            "name": "LOCAL_TXN_TIME",
            "value": "202059"
        }
    ],
    "transactions": [
        {
            "externalId": "7777883838389999",
            "merchantTransactionId": "38943939903ed0a8090d10dert31"
        },
        {
            "externalId": "6666883838388888",
            "merchantTransactionId": "38943939903ed0a8090d10dert32"
        },
        {
            "externalId": "555583838387777",
            "merchantTransactionId": "38943939903ed0a8090d10dert34"
        }
    ]
}
```

**<ins> Sample Response - Transactions Successfully Voided - 200 - OK**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "8as8a8a99a9876543232sdgf345",
            "externalId": "7777883838388999",
            "status": "CANCELLED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "alias": "8111",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                },
                "balance": {
                    "currentBalance": "5",
                    "beginBalance": "20",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "transactionId": "9876543232xdvxv34398s89afa9",
            "externalId": "88388383838839",
            "status": "CANCELLED",
            "account": {
                "cardNumber": "7759649826438111",
                "cardSubType": "test34",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "alias": "8111",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                },
                "balance": {
                    "currentBalance": "5",
                    "beginBalance": "20",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530911"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005922"
                }
            ]
        },
        {
            "transactionId": "9876543232xdvxv34398s89afa9",
            "externalId": "88388383838839",
            "status": "CANCELLED",
            "account": {
                "cardNumber": "7759649826438111",
                "cardSubType": "test34",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "alias": "8111",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                },
                "balance": {
                    "currentBalance": "5",
                    "beginBalance": "20",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530911"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005922"
                }
            ]
        }
    ]
}
```

**<ins> Sample Response - Transactions Partially Voided - 207 - Multi Status**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "8as8a8a99a9876543232sdgf345",
            "externalId": "7777883838388991",
            "status": "CANCELLED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "alias": "8111",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                },
                "balance": {
                    "currentBalance": "20",
                    "beginBalance": "5",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "externalId": "7777883838388992",
            "status": "FAILED",
            "account": {
                "alias": "8111",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                }
            },
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        },
        {
            "externalId": "7777883838388992",
            "status": "NOTPROCESSED",
            "account": {
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                }
            },
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        },
        {
            "transactionId": "8as8a8a99a9876543232sdgf345",
            "externalId": "7777883838388991",
            "status": "CANCELLED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "alias": "8111",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                },
                "balance": {
                    "currentBalance": "20",
                    "beginBalance": "5",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        }
    ]
}
```

## Sample Multi Sweep Payloads

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom//v2/prepaids/multi-sweeps>

Prod: <https://prod.api.firstdata.com/ucom//v2/prepaids/multi-sweeps>

**<ins> Parameters </ins>**

| **Name** | **Data Type** | **Parameter Type** | **Required** | **Max Length** |
| --- | --- | --- | --- | --- |
| fdCustomerId | String | body | yes | 32 |
| fdAccountId | String | body | yes | 32 |

**<ins> Sample Request - Sweep Balances from List of Gift cards/Purses**</ins>

```json
{
    "fdCustomerId": "ed0a809bc6164ed7b2dae602ae90d10d",
    "memership": {
        "accountNumber": "4654636354636363"
    },
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "merchantId": "99022879997",
    "altMerchantId": "0001",
    "purchaseInfo": {
        "order": {
            "orderId": " xorderIdTestt001"
        }
    },
    "postDate": "05252022",
    "replayCount": 1,
    "hostExtraInfo": [
        {
            "name": "LOCAL_TXN_DATE",
            "value": "05102022"
        },
        {
            "name": "LOCAL_TXN_TIME",
            "value": "202059"
        }
    ],
    "transactions": [
        {
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "externalId": "7777883838388991",
            "account": {
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "merchantTerminalId": "0002",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                }
            }
        },
        {
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "externalId": "7777883838388991",
            "account": {
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401df"
                }
            }
        }
    ]
}
```

**<ins> Sample Response - Transaction Successfully Completed - 200 - OK**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "9876543232xdvxv34398s89afa9",
            "externalId": "88388383838839",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "status": "APPROVED",
            "account": {
                "cardNumber": "7759649826438111",
                "cardSubType": "test34",
                "alias": "8111",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                },
                "balance": {
                    "currentBalance": "5",
                    "beginBalance": "20",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530911"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005922"
                }
            ]
        },
        {
            "transactionId": "9876543232xdvxv34398s89afa9",
            "externalId": "88388383838839",
            "merchantTransactionId": "38943939903ed0a8090d10dert34",
            "status": "APPROVED",
            "account": {
                "cardNumber": "7759649826438111",
                "cardSubType": "test34",
                "alias": "8111",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                },
                "balance": {
                    "currentBalance": "5",
                    "beginBalance": "20",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530911"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005922"
                }
            ]
        }
    ]
}
```

**<ins> Sample Response - Two transactions Approved and One Got Failed - 207 - Multi Status**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "8as8a8a99a9876543232sdgf345",
            "externalId": "7777883838388991",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "status": "APPROVED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "alias": "8453",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401d4"
                },
                "balance": {
                    "currentBalance": "20",
                    "beginBalance": "5",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "externalId": "7777883838388992",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "status": "FAILED",
            "account": {
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401df"
                }
            },
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        },
        {
            "transactionId": "8as8a8a99a9876543232sdgf345",
            "externalId": "7777883838388991",
            "merchantTransactionId": "38943939903ed0a8090d10dert34",
            "status": "APPROVED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "alias": "8453",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "balance": {
                    "currentBalance": "20",
                    "beginBalance": "5",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        }
    ]
}
```

## Sample Voiding the Sweep transaction Payloads

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom//v2/prepaids/sweeps/{fdParentTransactionId}/multi-void>

Prod: <https://prod.api.firstdata.com/ucom//v2/prepaids/sweeps/{fdParentTransactionId}/multi-void>

**<ins> Parameters </ins>**

No Parameters

**<ins> Sample Request - Void Sweep Transaction**</ins>

```json
{
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "postDate": "05252022",
    "replayCount": 1,
    "hostExtraInfo": [
        {
            "name": "LOCAL_TXN_DATE",
            "value": "05102022"
        },
        {
            "name": "LOCAL_TXN_TIME",
            "value": "202059"
        }
    ],
    "transactions": [
        {
            "externalId": "7777883838389999",
            "merchantTransactionId": "38943939903ed0a8090d10dert31"
        },
        {
            "externalId": "6666883838388888",
            "merchantTransactionId": "38943939903ed0a8090d10dert32"
        },
        {
            "externalId": "555583838387777",
            "merchantTransactionId": "38943939903ed0a8090d10dert34"
        }
    ]
}
```

**<ins> Sample Response - Transaction Successfully Voided - 200 - OK**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "8as8a8a99a9876543232sdgf345",
            "externalId": "7777883838389999",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "status": "APPROVED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "alias": "8453",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                },
                "balance": {
                    "currentBalance": "5",
                    "beginBalance": "20",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "transactionId": "9876543232xdvxv34398s89afa9",
            "externalId": "6666883838388888",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "status": "APPROVED",
            "account": {
                "cardNumber": "7759649826438111",
                "cardSubType": "test34",
                "alias": "8111",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                },
                "balance": {
                    "currentBalance": "5",
                    "beginBalance": "20",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530911"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005922"
                }
            ]
        },
        {
            "transactionId": "9876543232xdvxv34398s89afa9",
            "externalId": "555583838387777",
            "merchantTransactionId": "38943939903ed0a8090d10dert34",
            "status": "APPROVED",
            "account": {
                "cardNumber": "7759649826438111",
                "cardSubType": "test34",
                "alias": "8111",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                },
                "balance": {
                    "currentBalance": "5",
                    "beginBalance": "20",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530911"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005922"
                }
            ]
        }
    ]
}
```

**<ins> Sample Response - Transactions Partially Voided - 207 - Multi Status**</ins>

```json

{
  "parentTransactionId": "485-27834-285903824-095",
  "createdTime": "2017-03-21T08:15:30-05:00",
  "merchantTransactionId": "38943939903ed0a8090d10dert33",
  "purchaseInfo": {
    "order": {
      "orderId": "xorderIdTestt001"
    }
  },
  "transactions": [
    {
      "transactionId": "8as8a8a99a9876543232sdgf345",
      "externalId": "7777883838388991",
      "merchantTransactionId": "38943939903ed0a8090d10dert30",
      "status": "APPROVED",
      "account": {
        "cardNumber": "6759649826438453",
        "cardSubType": "test12",
        "alias": "8453",
        "merchantId": "99022879997",
        "altMerchantId": "0001",
        "vaultedAccount": {
          "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
        },
        "balance": {
          "currentBalance": "20",
          "beginBalance": "5",
          "currencyCode": {
            "code": "USD",
            "number": 840
          },
          "currencyType": "BASE"
        }
      },
      "hostExtraInfo": [
        {
          "name": "APPROVAL_NUMBER",
          "value": "530976"
        },
        {
          "name": "SEQUENCE_NUMBER",
          "value": "005931"
        }
      ]
    },
    {
      "externalId": "7777883838388992",
      "merchantTransactionId": "38943939903ed0a8090d10dert31",
      "status": "FAILED",
      "account": {
        "vaultedAccount": {
          "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
        }
      },
      "errorInfo": {
        "code": "269902",
        "message": " Invalid request format/data.",
        "category": "common",
        "developerInfo": {
          "developerMessage": " Invalid request format/data."
        }
      }
    },
    {
      "transactionId": "8as8a8a99a9876543232sdgf345",
      "externalId": "7777883838388991",
      "merchantTransactionId": "38943939903ed0a8090d10dert32",
      "status": "APPROVED",
      "account": {
        "cardNumber": "6759649826438453",
        "cardSubType": "test12",
        "alias": "8453",
        "merchantId": "99022879997",
        "altMerchantId": "0001",
        "vaultedAccount": {
          "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
        },
        "balance": {
          "currentBalance": "20",
          "beginBalance": "5",
          "currencyCode": {
            "code": "USD",
            "number": 840
          },
          "currencyType": "BASE"
        }
      },
      "hostExtraInfo": [
        {
          "name": "APPROVAL_NUMBER",
          "value": "530976"
        },
        {
          "name": "SEQUENCE_NUMBER",
          "value": "005931"
        }
      ]
    }
  ]
}
```

## Sample Multi Sales Payloads

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom//v2/prepaids/multi-sales>

Prod: <https://prod.api.firstdata.com/ucom//v2/prepaids/multi-sales>

**<ins> Parameters </ins>**

| **Name** | **Data Type** | **Parameter Type** | **Required** | **Max Length** |
| --- | --- | --- | --- | --- |
| fdCustomerId | String | body | yes | 32 |

**<ins> Sample Request - Vaulted Card Sale Transaction**</ins>

```json
{
    "fdCustomerId": "dcf2fe79204c42bd9c6348f258655cfc",
    "merchantTransactionId": "Sale_Txns_0s711_34",
    "isPartialSuccessAllowed": true,
    "isPartialPaymentAllowed": true,
    "replayCount": 0,
    "postDate": "04212023",
    "purchaseInfo": {
        "order": {
            "orderId": "Xabcdef07112032"
        }
    },
    "hostExtraInfo": [
        {
            "name": "LOCAL_TXN_DATE",
            "value": "04212023"
        },
        {
            "name": "LOCAL_TXN_TIME",
            "value": "012442"
        }
    ],
    "sales": [
        {
            "externalId": "123456789054320",
            "merchantTransactionId": "Sale_0705_0104",
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "requestedAmount": 2,
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "fundingSource": {
                "vaultedAccount": {
                    "fdAccountId": "8a7ff7be8781ab350187a2a7919170dc"
                }
            }
        },
        {
            "externalId": "123456789054320",
            "merchantTransactionId": "Sale_0705_0105",
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "requestedAmount": 2,
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "fundingSource": {
                "vaultedAccount": {
                    "fdAccountId": "8a7f811d81d85ba60181eb3b50a102c6"
                }
            }
        }
    ]
}
```

**<ins> Sample Response - 201**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "d8s8s8s8s990s8w456e464643e3tryd",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "sales": [
        {
            "fdSaleId": "2651f121f7e64f90871fa25ee5921027",
            "status": "APPROVED",
            "orderId": "xorderIdTestt001",
            "requestedAmount": 20,
            "approvedAmount": 20,
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "externalId": "8738743788738",
            "merchantTransactionId": "38943939903ed0a8090d10dert30",
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "transactionDateTime": "2020-05-07T18:15:52-0400",
            "fundingSource": {
                "type": "PREPAID",
                "prepaid": {
                    "cardSubType": "test12",
                    "alias": "8453",
                    "balance": {
                        "currentBalance": "5",
                        "beginBalance": "20",
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "fdSaleId": "2651f121f7e64f90871fa25ee5921456",
            "status": "APPROVED",
            "orderId": "xorderIdTestt001",
            "requestedAmount": 20,
            "approvedAmount": 10,
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "externalId": "8738743788738",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "transactionDateTime": "2020-05-07T18:15:52-0400",
            "fundingSource": {
                "type": "PREPAID",
                "prepaid": {
                    "cardSubType": "test45",
                    "alias": "8453",
                    "balance": {
                        "currentBalance": "5",
                        "beginBalance": "20",
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        }
    ]
}
```

**<ins> Sample Response - One Transaction Approved and One Transaction declined (207 - Multi Status)**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "d8s8s8s8s990s8w456e464643e3tryd",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "sales": [
        {
            "fdSaleId": "2651f121f7e64f90871fa25ee5921027",
            "status": "APPROVED",
            "orderId": "xorderIdTestt001",
            "requestedAmount": 20,
            "approvedAmount": 20,
            "externalId": "8738743788739",
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "merchantTransactionId": "38943939903ed0a8090d10dert30",
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "transactionDateTime": "2020-05-07T18:15:52-0400",
            "fundingSource": {
                "type": "PREPAID",
                "prepaid": {
                    "cardSubType": "test12",
                    "alias": "8453",
                    "balance": {
                        "currentBalance": "5",
                        "beginBalance": "20",
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "fdSaleId": "2651f121f7e64f90871fa25ee5921456",
            "status": "DECLINED",
            "orderId": "xorderIdTestt001",
            "requestedAmount": 20,
            "externalId": "8738743788738",
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "transactionDateTime": "2020-05-07T18:15:52-0400",
            "fundingSource": {
                "type": "PREPAID",
                "prepaid": {
                    "cardSubType": "test45",
                    "alias": "8453"
                }
            },
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                },
                "hostExtraInfo": [
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
        }
    ]
}
```

**<ins> Sample Request - Partial amount and partial transaction success would not allowed**</ins>

```json
{
    "fdCustomerId": "ed0a809bc6164ed7b2dae602ae90d10d",
    "merchantTransactionId": "d8s8s8s8s990s8w456e464643e3tryd",
   “isPartialSuccessAllowed”: false,
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "isPartialPaymentAllowed": false,
    "postDate": "05252022",
    "hostExtraInfo": [
        {
            "name": "LOCAL_TXN_DATE",
            "value": "05102022"
        },
        {
            "name": "LOCAL_TXN_TIME",
            "value": "202059"
        }
    ],
    "sales": [
        {
            "externalId": "88388383838839",
            "merchantTransactionId": "38943939903ed0a8090d10dert30",
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "requestedAmount": 20,
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "fundingSource": {
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                }
            }
        },
        {
            "externalId": "88388383838839",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "requestedAmount": 20,
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "fundingSource": {
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401df"
                }
            }
        }
    ]
}
```

**<ins> Sample Response - 201**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "d8s8s8s8s990s8w456e464643e3tryd",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "sales": [
        {
            "fdSaleId": "2651f121f7e64f90871fa25ee5921027",
            "status": "APPROVED",
            "orderId": "xorderIdTestt001",
            "requestedAmount": 20,
            "approvedAmount": 20,
            "externalId": "8738743788738",
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "merchantTransactionId": "d8s8s8s8s990s8w456e464643e3tryd1",
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "transactionDateTime": "2020-05-07T18:15:52-0400",
            "fundingSource": {
                "type": "PREPAID",
                "prepaid": {
                    "cardSubType": "test12",
                    "alias": "8453",
                    "balance": {
                        "currentBalance": "5",
                        "beginBalance": "20",
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "fdSaleId": "2651f121f7e64f90871fa25ee5921456",
            "status": "APPROVED",
            "orderId": "xorderIdTestt001",
            "requestedAmount": 20,
            "approvedAmount": 10,
            "externalId": "8738743788738",
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "merchantTransactionId": "d8s8s8s8s990s8w456e464643e3tryd2",
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "transactionDateTime": "2020-05-07T18:15:52-0400",
            "fundingSource": {
                "type": "PREPAID",
                "prepaid": {
                    "cardSubType": "test45",
                    "alias": "8453",
                    "balance": {
                        "currentBalance": "5",
                        "beginBalance": "20",
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        }
    ]
}
```

**<ins> Sample Response - One transaction approved and one transaction declined (207 - Multi status)**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "d8s8s8s8s990s8w456e464643e3tryd",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "sales": [
        {
            "fdSaleId": "2651f121f7e64f90871fa25ee5921027",
            "status": "APPROVED",
            "orderId": "xorderIdTestt001",
            "requestedAmount": 20,
            "approvedAmount": 20,
            "externalId": "8738743788739",
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "merchantTransactionId": "38943939903ed0a8090d10dert30",
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "transactionDateTime": "2020-05-07T18:15:52-0400",
            "fundingSource": {
                "type": "PREPAID",
                "prepaid": {
                    "cardSubType": "test12",
                    "alias": "8453",
                    "balance": {
                        "currentBalance": "5",
                        "beginBalance": "20",
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "fdSaleId": "2651f121f7e64f90871fa25ee5921456",
            "status": "DECLINED",
            "orderId": "xorderIdTestt001",
            "requestedAmount": 20,
            "externalId": "8738743788738",
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "transactionDateTime": "2020-05-07T18:15:52-0400",
            "fundingSource": {
                "type": "PREPAID",
                "prepaid": {
                    "cardSubType": "Health45",
                    "alias": "8453"
                }
            },
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                },
                "hostExtraInfo": [
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
        }
    ]
}
```

## Sample Payloads - Cancel a Sale Transaction

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom//v2/prepaids/multi-sales/{fdParentTransactionId}/void>

Prod: <https://prod.api.firstdata.com/ucom//v2/prepaids/multi-sales/{fdParentTransactionId}/void>

**<ins> Parameters </ins>**

| **Name** | **Data Type** | **Parameter Type** | **Required** | **Max Length** |
| --- | --- | --- | --- | --- |
| fdParentTransactionId | String | path | yes | - |

**<ins> Sample Request - Void All Successful Child Transactions**</ins>

```json
{
    "merchantTransactionId": "d8s8s8s8s990s8w456e464643e3tryd",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "postDate": "05232022",
    "replayCount": 1,
    "hostExtraInfo": [
        {
            "name": "LOCAL_TXN_DATE",
            "value": "05102022"
        },
        {
            "name": "LOCAL_TXN_TIME",
            "value": "202059"
        }
    ],
    "voids": [
        {
            "externalId": "7777883838389999",
            "merchantTransactionId": "38943939903ed0a8090d10dert31"
        },
        {
            "externalId": "6666883838388888",
            "merchantTransactionId": "38943939903ed0a8090d10dert32"
        },
        {
            "externalId": "555583838387777",
            "merchantTransactionId": "38943939903ed0a8090d10dert34"
        }
    ]
}
```

**<ins> Sample Response - All Sale Transactions cancelled 201**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "d8s8s8s8s990s8w456e464643e3tryd",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "voids": [
        {
            "fdTransactionId": "5b4cf9da15e0475eb9ef3bcea5734442",
            "status": "CANCELLED",
            "externalId": "8738743788738",
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "merchantTransactionId": "d8s8s8s8s990s8w456e464643e3tryd1",
            "approvedAmount": 20,
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "transactionDateTime": "2017-10-04T21:49:21.94",
            "fundingSource": {
                "type": "PREPAID",
                "prepaid": {
                    "cardSubType": "test12",
                    "alias": "8453",
                    "balance": {
                        "currentBalance": "5",
                        "beginBalance": "20",
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "status": "NOTPROCESSED",
            "externalId": "8738743788738",
            "merchantTransactionId": "d8s8s8s8s990s8w456e464643e3tryd2",
            "requestedAmount": 20,
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "transactionDateTime": "2017-10-04T21:49:21.94",
            "fundingSource": {
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "fdTransactionId": "5b4cf9da15e0475eb9ef3bcea5734442",
            "status": "CANCELLED",
            "externalId": "8738743788739",
            "merchantId": "99022879997",
            "altMerchantId": "0001",
            "merchantTransactionId": "d8s8s8s8s990s8w456e464643e3tryd3",
            "approvedAmount": 20,
            "currencyCode": {
                "code": "USD",
                "number": 840
            },
            "transactionDateTime": "2017-10-04T21:49:21.94",
            "fundingSource": {
                "type": "PREPAID",
                "prepaid": {
                    "cardSubType": "test45",
                    "alias": "8453",
                    "balance": {
                        "currentBalance": "5",
                        "beginBalance": "20",
                        "currencyCode": {
                            "code": "USD",
                            "number": 840
                        },
                        "currencyType": "BASE"
                    }
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        }
    ]
}
```

## Sample Multi Deducts Payloads

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v2/prepaids/multi-deducts>

Prod: <https://prod.api.firstdata.com/ucom/v2/prepaids/multi-deducts>

**<ins> No Parameters </ins>**

**<ins> Sample Request - Deduct Balances from List of Gift cards/Purses**</ins>

```json
{
    "fdCustomerId": "ed0a809bc6164ed7b2dae602ae90d10d",
    "memership": {
        "accountNumber": "4654636354636363"
    },
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "merchantId": "99022879997",
    "altMerchantId": "0001",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "postDate": "05252022",
    "replayCount": 1,
    "hostExtraInfo": [
        {
            "name": "LOCAL_TXN_DATE",
            "value": "05102022"
        },
        {
            "name": "LOCAL_TXN_TIME",
            "value": "202059"
        }
    ],
    "transactions": [
        {
            "externalId": "7777883838388991",
            "merchantTransactionId": "38943939903ed0a8090d10dert30",
            "account": {
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "merchantTerminalId": "0002",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                }
            },
            "fundingInfo": {
                "fundValue": 15,
                "isMerchantFunded": true,
                "currencyCode": {
                    "code": "USD",
                    "number": 840
                }
            }
        },
        {
            "externalId": "7777883838388991",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "account": {
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401df"
                }
            },
            "fundingInfo": {
                "fundValue": 15,
                "isMerchantFunded": true,
                "currencyCode": {
                    "code": "USD",
                    "number": 840
                }
            }
        }
    ]
}
```

**<ins> Sample Response - Transaction Successfully Completed - 200 - OK**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "9876543232xdvxv34398s89afa9",
            "externalId": "88388383838839",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "status": "APPROVED",
            "account": {
                "cardNumber": "7759649826438111",
                "cardSubType": "test34",
                "alias": "8111",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                },
                "balance": {
                    "currentBalance": "5",
                    "beginBalance": "20",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530911"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005922"
                }
            ]
        },
        {
            "transactionId": "9876543232xdvxv34398s89afa9",
            "externalId": "88388383838839",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "status": "APPROVED",
            "account": {
                "cardNumber": "7759649826438111",
                "cardSubType": "test34",
                "alias": "8111",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                },
                "balance": {
                    "currentBalance": "5",
                    "beginBalance": "20",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530911"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005922"
                }
            ]
        }
    ]
}
```

**<ins> Sample Response - Two transactions APproved and One Failed**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "8as8a8a99a9876543232sdgf345",
            "externalId": "7777883838388991",
            "merchantTransactionId": "38943939903ed0a8090d10dert30",
            "status": "APPROVED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "alias": "8453",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                },
                "balance": {
                    "currentBalance": "20",
                    "beginBalance": "5",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "externalId": "7777883838388992",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "status": "FAILED",
            "account": {
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                }
            },
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        },
        {
            "transactionId": "8as8a8a99a9876543232sdgf345",
            "externalId": "7777883838388991",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "status": "APPROVED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "alias": "8453",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                },
                "balance": {
                    "currentBalance": "20",
                    "beginBalance": "5",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        }
    ]
}
```

## Sample Payloads - Voiding the Deduct Transaction

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v2/prepaids/deducts/{fdParentTransactionId}/multi-void>

Prod: <https://prod.api.firstdata.com/ucom/v2/prepaids/deducts/{fdParentTransactionId}/multi-void>

**<ins> No Parameters </ins>**

**<ins> Sample Request - Cancelling the Deduct Transaction**</ins>

```json
{
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "postDate": "05252022",
    "replayCount": 1,
    "hostExtraInfo": [
        {
            "name": "LOCAL_TXN_DATE",
            "value": "05102022"
        },
        {
            "name": "LOCAL_TXN_TIME",
            "value": "202059"
        }
    ],
    "transactions": [
        {
            "externalId": "7777883838389999",
            "merchantTransactionId": "38943939903ed0a8090d10dert31"
        },
        {
            "externalId": "6666883838388888",
            "merchantTransactionId": "38943939903ed0a8090d10dert32"
        },
        {
            "externalId": "555583838387777",
            "merchantTransactionId": "38943939903ed0a8090d10dert34"
        }
    ]
}
```

**<ins> Sample Response - Transaction Successfully Voided - 200 - OK**</ins>

```json

{
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "postDate": "05252022",
    "replayCount": 1,
    "hostExtraInfo": [
        {
            "name": "LOCAL_TXN_DATE",
            "value": "05102022"
        },
        {
            "name": "LOCAL_TXN_TIME",
            "value": "202059"
        }
    ],
    "transactions": [
        {
            "externalId": "7777883838389999",
            {
                "parentTransactionId": "485-27834-285903824-095",
                "createdTime": "2017-03-21T08:15:30-05:00",
                "merchantTransactionId": "38943939903ed0a8090d10dert33",
                "purchaseInfo": {
                    "order": {
                        "orderId": "xorderIdTestt001"
                    }
                },
                "transactions": [
                    {
                        "transactionId": "8as8a8a99a9876543232sdgf345",
                        "externalId": "7777883838389999",
                        "merchantTransactionId": "38943939903ed0a8090d10dert31",
                        "status": "APPROVED",
                        "account": {
                            "cardNumber": "6759649826438453",
                            "cardSubType": "test12",
                            "alias": "8453",
                            "merchantId": "99022879997",
                            "altMerchantId": "0001",
                            "vaultedAccount": {
                                "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                            },
                            "balance": {
                                "currentBalance": "5",
                                "beginBalance": "20",
                                "currencyCode": {
                                    "code": "USD",
                                    "number": 840
                                },
                                "currencyType": "BASE"
                            }
                        },
                        "hostExtraInfo": [
                            {
                                "name": "APPROVAL_NUMBER",
                                "value": "530976"
                            },
                            {
                                "name": "SEQUENCE_NUMBER",
                                "value": "005931"
                            }
                        ]
                    },
                    {
                        "transactionId": "9876543232xdvxv34398s89afa9",
                        "externalId": "6666883838388888",
                        "merchantTransactionId": "38943939903ed0a8090d10dert32",
                        "status": "APPROVED",
                        "account": {
                            "cardNumber": "7759649826438111",
                            "cardSubType": "test34",
                            "alias": "8111",
                            "merchantId": "99022879997",
                            "altMerchantId": "0001",
                            "vaultedAccount": {
                                "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                            },
                            "balance": {
                                "currentBalance": "5",
                                "beginBalance": "20",
                                "currencyCode": {
                                    "code": "USD",
                                    "number": 840
                                },
                                "currencyType": "BASE"
                            }
                        },
                        "hostExtraInfo": [
                            {
                                "name": "APPROVAL_NUMBER",
                                "value": "530911"
                            },
                            {
                                "name": "SEQUENCE_NUMBER",
                                "value": "005922"
                            }
                        ]
                    },
                    {
                        "transactionId": "9876543232xdvxv34398s89afa9",
                        "externalId": "555583838387777",
                        "merchantTransactionId": "38943939903ed0a8090d10dert34",
                        "status": "APPROVED",
                        "account": {
                            "cardNumber": "7759649826438111",
                            "cardSubType": "test34",
                            "alias": "8111",
                            "merchantId": "99022879997",
                            "altMerchantId": "0001",
                            "vaultedAccount": {
                                "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                            },
                            "balance": {
                                "currentBalance": "5",
                                "beginBalance": "20",
                                "currencyCode": {
                                    "code": "USD",
                                    "number": 840
                                },
                                "currencyType": "BASE"
                            }
                        },
                        "hostExtraInfo": [
                            {
                                "name": "APPROVAL_NUMBER",
                                "value": "530911"
                            },
                            {
                                "name": "SEQUENCE_NUMBER",
                                "value": "005922"
                            }
                        ]
                    }
                ]
            },

            "merchantTransactionId": "38943939903ed0a8090d10dert31"
        },
        {
            "externalId": "6666883838388888",
            "merchantTransactionId": "38943939903ed0a8090d10dert32"
        },
        {
            "externalId": "555583838387777",
            "merchantTransactionId": "38943939903ed0a8090d10dert34"
        }
    ]
}
```

**<ins> Sample Response - Transactions Partially Voided - 207 - Multi Status**</ins>

```json

{
    "parentTransactionId": "485-27834-285903824-095",
    "createdTime": "2017-03-21T08:15:30-05:00",
    "merchantTransactionId": "38943939903ed0a8090d10dert33",
    "purchaseInfo": {
        "order": {
            "orderId": "xorderIdTestt001"
        }
    },
    "transactions": [
        {
            "transactionId": "8as8a8a99a9876543232sdgf345",
            "externalId": "7777883838388991",
            "merchantTransactionId": "38943939903ed0a8090d10dert30",
            "status": "APPROVED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "alias": "8453",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                },
                "balance": {
                    "currentBalance": "20",
                    "beginBalance": "5",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        },
        {
            "externalId": "7777883838388992",
            "merchantTransactionId": "38943939903ed0a8090d10dert31",
            "status": "FAILED",
            "account": {
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                }
            },
            "errorInfo": {
                "code": "269902",
                "message": " Invalid request format/data.",
                "category": "common",
                "developerInfo": {
                    "developerMessage": " Invalid request format/data."
                }
            }
        },
        {
            "transactionId": "8as8a8a99a9876543232sdgf345",
            "externalId": "7777883838388991",
            "merchantTransactionId": "38943939903ed0a8090d10dert32",
            "status": "APPROVED",
            "account": {
                "cardNumber": "6759649826438453",
                "cardSubType": "test12",
                "alias": "8453",
                "merchantId": "99022879997",
                "altMerchantId": "0001",
                "vaultedAccount": {
                    "fdAccountId": "8a7fb5717e8fcee9017e9756a30401cb"
                },
                "balance": {
                    "currentBalance": "20",
                    "beginBalance": "5",
                    "currencyCode": {
                        "code": "USD",
                        "number": 840
                    },
                    "currencyType": "BASE"
                }
            },
            "hostExtraInfo": [
                {
                    "name": "APPROVAL_NUMBER",
                    "value": "530976"
                },
                {
                    "name": "SEQUENCE_NUMBER",
                    "value": "005931"
                }
            ]
        }
    ]
}
```

>Note:
 merchantId & altMerchantId Should be sent in the request either in parent level or purse level for all the apis other than Void.
 In case of multi status response (http status code 207) or client timeout use cases, please retry an original transaction by keeping a new client request Id value in header and build a replay count in payload.

## Error Codes

For comprehensive troubleshooting of potential errors, kindly refer to the designated <a href="../docs/?path=docs/documentation/API_Response_Codes.md"> Error Codes Section</a>. This resource will aid in addressing and resolving any errors that may arise during the course of testing.
