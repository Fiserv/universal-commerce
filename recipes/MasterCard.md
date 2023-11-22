# MasterCard AN 5524 - CIT and MIT Compliance Indicators 

## Introduction

MasterCard is introducing two new global acquirer Data Integrity edits to monitor Cardholder-Initiated Transaction (CIT) and Merchant-Initiated Transaction (MIT) indicators in each electronic commerce (e-commerce) and credential-on-file (COF) transaction to help enforce the MasterCard mandate requiring acquirers and their processors to provide CIT and MIT indicators.

- **Cardholder-Initiated Transaction (CIT):** A Cardholder-Initiated Transaction (CIT) is a type of financial transaction where the cardholder takes the active role in initiating the payment. This commonly occurs during in-store purchases, online shopping, or when the cardholder voluntarily decides to make a payment using their payment card. CIT transactions are driven by the cardholder's choice and consent.

- **Merchant-Initiated Transaction (MIT):** In contrast, a Merchant-Initiated Transaction (MIT) is a financial transaction initiated by the merchant or service provider, but with the prior authorization of the cardholder. These transactions are typically recurring, such as monthly subscription renewals, utility bill payments, or any situation where the cardholder has given the merchant consent to automatically charge their card at specific intervals. MIT transactions often require a prior agreement between the cardholder and the merchant.

The CIT and MIT indicators, that will be discussed in this guide, aim to enhance transparency regarding transaction types. This will simplify the process for issuers in discerning valid transactions and enable them to make more well-informed authorization choices. Furthermore, issuers can utilize these newly introduced CIT and MIT indicators to bolster their risk management, fraud detection, and dispute resolution systems.

> Please be advised that while these new indicators are currently only mandated by MasterCard, the API, however, is designed to receive these indicators for all card types, and as such, we encourage you to implement this modification for all brands, extending beyond MasterCard.  This will prevent future recoding by the merchant should other networks follow suit.

## Usage

This guide will address compliance modifications applicable to all recurring transactions for the CIT and MIT APIs listed below.

- **POST /v1/payments/auths**
- **POST /v1/payments/auths/{fdAuthorizationId}/captures**
- **POST /v1/payments/auths/{fdAuthorizationId}/refunds**
- **POST /v1/payments/sales/{fdSaleId}/refunds**
- **POST /v1/payments/sale**
- **POST /v1/payments/auths/{fdAuthorizationId}/void**
- **POST /v1/payments/captures/{fdCaptureId}/void**
- **POST /v1/payments/refunds/{fdRefundId}/void** 
- **POST /v1/payments/sales/{fdSaleId}/void**

> For regular, unscheduled CIT transactions, there are no changes needed as uCom will default these values to downstream systems. 

## Utilization

As part of the MasterCard compliance requirement, you will need to make some changes to your current implementation of the Connected Commerce (uCom) API for all recurring CIT & MIT transactions. Please include the additional fields listed below as per the MasterCard compliance requirement:

| Field Name                  | New / Existing | Definition                                                    | Possible Values                                                                                                                                              |
|--------------------------------|----------------|--------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STORED_CREDENTIAL_INDICATOR`    | Existing       | Is the Customer's Payment Method Vaulted at uCom?            | `INITIAL`: Denotes that the Transaction is the first transaction part of a series of transactions. <BR>`SUBSEQUENT`: Denotes that the Transaction is a succeeding transaction.|
| `TRANSACTION_INITIATION_INDICATOR` | Existing      | Who is Initiating the Transaction?                           | `CUSTOMER`: Denotes that the Transaction was initiated by the Cardholder. <BR>`MERCHANT`: Denotes that the Transaction was initiated by the Merchant. <BR>* Please note that these values are a replacement for `MIT-RECURRING` & `MIT-INSTALLMENT`|
| `SCHEDULE_INDICATOR`              | Existing       | Are we processing a transaction that has been scheduled for a specific date? | `UNSCHEDULED`: Denotes that the Transaction was initiated as an Ad Hoc transaction. <BR> `SCHEDULED`: Denotes that the Transaction was initiated at an agreed upon time between the Cardholder and the Merchant. |
| `BILL_PAYMENT_TYPE`               | New            | Which type of subsequent transactions are being scheduled?     | `RECURRING`: Denotes that the Cardholder and the Merchant have agreed to initiate a series of transactions using a Vaulted Payment Method. <BR> `INSTALLMENT`: Denotes that the Cardholder and the Merchant have agreed to initiate a series of transactions using a Vaulted Payment Method that should reflect the single purchase of goods and/or services. |
| `PAYMENT_AMOUNT_TYPE`            | New            | Will the Payment Amount in Subsequent Transactions stay the same as the Original Transaction or will the Payment Amount vary in Subsequent Transactions? | `VARIABLE`: Denotes that the Payment Amounts in a series of transactions using a Vaulted Payment Method can be of varying values. <BR>`FIXED`: Denotes that the Payment Amounts in a series of transactions using a Vaulted Payment Method will all be of the same value. |

<!-- theme: warning -->
> Please be aware the `TRANSACTION_INITIATION_INDICATOR` field will only accept the following values: `CUSTOMER` & `MERCHANT`. The previous values (`MIT-RECURRING` & `MIT-INSTALLMENT`) will be assigned to a new field called `BILL_PAYMENT_TYPE`.

## Examples and Samples

**Current state**

Below is a sample MIT payload that must be updated due to the MasterCard compliance mandate discussed in this guide. Should you be integrating this into your implementation with Connected Commerce (uCom), we kindly request that you undertake the necessary updates.

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
                    "orderType": "coffee-subscription"
                }
            }
        ]
    }
}

```

**Future State**

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
                "value": "MERCHANT"
            },
            {
                "name": "SCHEDULE_INDICATOR",
                "value": "SCHEDULED"
            },
            {
                "name": "NETWORK_ORIGINAL_AMOUNT",
                "value": "100"
            },
            {
                "name": "NETWORK_TRANSACTION_ID",
                "value": "AZ477617"
            },
            {
                "name": "BILL_PAYMENT_TYPE",
                "value": "RECURRING"
            },
            {
                "name": "PAYMENT_AMOUNT_TYPE",
                "value": "VARIABLE"
            }
        ],
        "purchaseInfo": [
            {
                "order": {
                    "orderType": "coffee-subscription"
                }
            }
        ]
    }
}

```

## Error Codes 

Although this new MasterCard mandate does not introduce any new error codes, please refer to the designated <a href="../docs/?path=docs/documentation/API_Response_Codes.md"> Error Codes Section</a> for comprehensive troubleshooting of potential errors. This resource will aid in addressing and resolving any errors that may arise during the course of testing.