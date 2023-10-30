# Master Card Compliance Indicators Changes

## Introduction

Mastercard is introducing two new global acquirer Data Integrity edits to monitor Cardholder-Initiated Transaction (CIT) and Merchant-Initiated Transaction (MIT) indicators in each electronic commerce (e-commerce) and credential-on-file (COF) transaction to help enforce the Mastercard mandate requiring acquirers and their processors to provide CIT and MIT indicators.

## Transaction Types

- **Cardholder-Initiated Transaction (CIT):** A Cardholder-Initiated Transaction (CIT) is a type of financial transaction where the cardholder takes the active role in initiating the payment. This commonly occurs during in-store purchases, online shopping, or when the cardholder voluntarily decides to make a payment using their payment card. CIT transactions are driven by the cardholder's choice and consent.

- **Merchant-Initiated Transaction (MIT):** In contrast, a Merchant-Initiated Transaction (MIT) is a financial transaction initiated by the merchant or service provider, but with the prior authorization of the cardholder. These transactions are typically recurring, such as monthly subscription renewals, utility bill payments, or any situation where the cardholder has given the merchant consent to automatically charge their card at specific intervals. MIT transactions often require a prior agreement between the cardholder and the merchant.

> Please be advised that while this adjustment is a mandate by Mastercard, it is important to recognize that we encourge you to implement this modification for all card types, extending beyond Mastercard. uCom has the capacity to manage this transition seamlessly across various card types.

## Usage

For regular, unscheduled CIT transactions, there are no changes needed as uCom will default these values to downstream systems. The changes that will be discussed in this guide will be applicable to all CIT and MIT recurring transactions for the APIs below:

- POST /v1/payments/auths
- POST /v1/payments/auths/{fdAuthorizationId}/captures
- POST /v1/payments/auths/{fdAuthorizationId}/refunds
- POST /v1/payments/sales/{fdSaleId}/refunds
- POST /v1/payments/sale
- POST /v1/payments/auths/{fdAuthorizationId}/void
- POST /v1/payments/captures/{fdCaptureId}/void
- POST /v1/payments/refunds/{fdRefundId}/void
- POST /v1/payments/sales/{fdSaleId}/void

## Utilization

If your existing payload to Connected Commerce (uCom) includes the values below, you must update them to the new values.

- **Existing Values**
  - MIT-RECURRING
  - MIT-INSTALLMENT

- **New Values**
  - CUSTOMER
  - MERCHANT

Furthermore, you will need to include the additional fields below as per the MasterCard compliance requirement:

- **New BILL_PAYMENT_TYPE**
  - RECURRING
  - INSTALLMENT
  - PARTIAL_SHIPMENT
  - DELAYED_CHARGE
  - NO_SHOW_CHARGE
  - RESUBMISSION

- **New PAYMENT_AMOUNT_TYPE**
  - VARIABLE
  - FIXED

## Examples and Samples

**Current state**

```json
"hostExtraInfo": [
  {
    "name": "STORED_CREDENTIAL_INDICATOR",
    "value": "SUBSEQUENT"
  },
  {
    "name": "TRANSACTION_INITIATION_INDICATOR",
    "value": "MIT-RECURRING"
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
  }
]

```

**Future State**

```json

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
]

```