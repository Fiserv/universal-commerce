# Quick Service Restaurants (QSR) API Integration Guide

## Overview

<Add Product Content on QSR HERE>

To get started, turn to the <a href="">API Requirements</a> page for details on client authorization (connectivity, API HTTP Headers, API security), and idempotency, then return to this webpage to navigate through the QSR services below.

## Explore the QSR Services

Click on the preferred link or icon below to explore each service.

| **API Service**                                           | **Description** |
| --------------------------------------------------------- | --------------  |
| [Customer Services](../api/?type=post&path=/v1/customers) | This API handles all of the Connected Commerce (uCom) Customer Profile Management operations (create, read, update, and delete). You (a merchant) can register a new customer. The response includes the newly created fdCustomerId (ID) and the externalID parameters. |
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