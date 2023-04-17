# Quick Service Restaurants (QSR) API Integration Guide

## Overview

<Add Product Content on QSR HERE>

## Getting Started
To get started, turn to the [API Fundamentals](../docs/?path=/docs/documentation/Connectivity.md) page for details on connectivity, API HTTP Headers, API security, and idempotency, then return to this webpage to navigate through the QSR services below.

### Step 1: Set up customer profile
Determine whether a merchant wants to vault an account into Connected Commerce (uCom) or use guest check out (anonymous check out).
A. Register customer profile (Create customer)
B. [Guest checkout](../docs/?path=recipes/guest_checkout.md&branch=develop)

Note: If merchant wants to use guest checkout, then it is not necessary to register customer profile. Although once customer profile is created for a specific merchant, that merchant can still opt to perform anonymous checkout without vaulting.

### Step 2: Set up payment account
Registering an account consists of several steps listed here below. These steps are required for a merchant to send card details to Connected Commerce (uCom).
Step 2a: Get access token.
Step 2b: Call account tokens to send encrypted card details and get nonce token.
Step 2c: Vault account.

### Step 3: Select payment type
Determine whether a merchant wants to use vaulted account or guest check out.

A. Vaulted account: Send key parameters – payment by fdAccountId, merchantId, and transaction details

    Note: In order to vault an account, tokenization—a secure way for Connected Commerce and end customer to securely exchange card details—must be done first.

B. Guest check out: Tokenize card details and process for payment
    1. Call account tokens to get nonce token
    2. Payment by nonce
        a. Vaulted account - Payment by fdAccountId, transaction details
        b. Payment by nonce, transaction details

## Explore the QSR Services

Click on the preferred link below to explore each service.

| **API Service**                                           | **Description** |
| --------------------------------------------------------- | --------------  |
| [Customer Services](../api/docs/?path=/docs/documentation/customerServices.md) | This API handles all of the Connected Commerce (uCom) Customer Profile Management operations (create, read, update, and delete). You (a merchant) can register a new customer. The response includes the newly created fdCustomerId (ID) and the externalID parameters. |
| [Security Services](../api/?type=post&path=/v1/tokens) | This API handles services related to managing the API security features like access tokens and validation.                                                                                                                                                                 |
| [Account Services](../api/?type=post&path=/v1/accounts/verification) | This API handles services for Connected Commerce (uCom) customer accounts. Accounts can be credit, debit, loyalty, prepaid, etc.                                                                                                                         |
| [Payment Services](../api/?type=post&path=/v1/payments/auths) | This API handles services needed to initiate AUTH/CAPTURE/SALE transactions using a payment account.                                                                                                                                                                |
| [Prepaid Services](../api/?type=post&path=/v2/prepaids/multi-purchases) | This API handles services related to prepaid cards such as creating a new prepaid card, balance check, reloading funds, balance transfer etc.                                                                                                         |

## Merchant Initiated Transactions (MIT)
An MIT provides the ability to run recurring payments and subscriptions to selling product or services on a recurring schedule. Merchants also receive payment on time with this model. This also minimizes the efforts for the customer. Merchant initiated transactions are an enhancement to regular customer-initiated accounts/sale transactions. To run a merchant-initiated transaction, few additional indicators are required, as well as pass/receive network transaction id. These indicators will be used by network to mitigate fraud; transaction id will be provided by uCom at initial transaction. MIT indicators are applicable for certain Payments and Accounts APIs. For the MIT fields and indicators, click here<ADD LINK>.

## Features
### Payment Features
To explore the payment features, go to [Create Payment Sale Authorization](../api/?type=post&path=/v1/payments/sales). Navigate to the Request tab and from the dropdown, select your preferred payment type you want to browse.

Supported Services:
- Vaulted Card
- Sale with Nonce
- Sale with Apple Pay
- Sale with Google Pay
- Sale with PayPal
- Sale with Venmo
- Sale with TA Token

## Service Mapping

| API                                               | Description                                                | Service Name on Portal |
|---------------------------------------------------|------------------------------------------------------------|------------------------|
| POST /v1/payment/sales                            | Anonymous sale                                             | Payment Services       |
| POST /v1/payment/sales                            | Token sale                                                 | Payment Services       |
| POST /v1/payment/sales                            | VCO                                                        | Payment Services       |
| POST /v1/payments/sales/{fdSalesId}/void          | Void sale                                                  | Payment Services       |
| POST /v1/account-tokens                           | Payment tokenization                                       | Payment Services       |
| POST /v1/accounts/verification                    | Account verification                                       | Payment Services       |
| POST /v1/accounts/verification                    | Refund sale                                                | Payment Services       |


## Error Codes
For error codes table, click here<ADD LINK>.