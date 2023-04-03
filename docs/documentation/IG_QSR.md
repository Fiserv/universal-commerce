# Quick Service Restaurants (QSR) API Integration Guide

## Overview

<Add Product Content on QSR HERE>

To get started, turn to the <a href="../docs/?path=/docs/documentation/Standard_Implementation_Guide.md">Standard Implementation Guide</a> for details on connectivity, API HTTP Headers, API security, and idempotency, then return to this webpage to navigate through the QSR services below.

## Explore the QSR Services

Click on the preferred link or icon below to explore each service.

### [Customer Services](../api/?type=post&path=/v1/customers)

<div id="cs_id">
<a href="../api/?type=post&path=/v1/customers"><img src="https://raw.githubusercontent.com/Fiserv/universal-commerce/develop/assets/images/Picture1.png" alt="Customer_services" style="height:50px"></a>  

These APIs handle all of the Connected Commerce (uCom) Customer Profile Management operations (create, read, update, and delete).
You (a merchant) can register a new customer. The response includes the newly created fdCustomerId (ID) and the externalID parameters.
</div>

### [Security Services](../api/?type=post&path=/v1/tokens)

<div id="cs_id">
<a href="../api/?type=post&path=/v1/tokens"><img src="https://github.com/Fiserv/universal-commerce/blob/develop/assets/images/Picture20.png?raw=true" alt="Security Services" style="height:50px"></a>

These APIs handle Services related to managing the API security features like access tokens and validation.
</div>

### [Account Services API](../api/?type=post&path=/v1/accounts/verification)

<div id="cs_id">
<a href="../api/?type=post&path=/v1/accounts/verification"><img src="https://github.com/Fiserv/universal-commerce/blob/develop/assets/images/Picture4.png?raw=true" alt="Account_services" style="height:50px"></a>  

These APIs handle services for Connected Commerce (uCom) customer accounts. Accounts can be credit, debit, loyalty, prepaid, etc.
</div>

### [Payment Services](../api/?type=post&path=/v1/payments/auths)

<div id="cs_id">
<a href="../api/?type=post&path=/v1/payments/auths"><img src="https://github.com/Fiserv/universal-commerce/blob/develop/assets/images/Picture19.png?raw=true" alt="Payments" style="height:50px"></a>  

These APIs handle services needed to initiate AUTH/CAPTURE/SALE transactions using a payment account.
</div>

### [Prepaid Services API](../api/?type=post&path=/v2/prepaids/multi-purchases)

<div id="cs_id">
<a href="../api/?type=post&path=/v2/prepaids/multi-purchases"><img src="https://github.com/Fiserv/universal-commerce/blob/develop/assets/images/Picture21.png?raw=true" alt="Prepaid Payments" style="height:50px"></a>  

These APIs handle services related to prepaid cards such as creating a new prepaid card, balance check, reloading funds, balance transfer etc.
</div>

## Merchant Initiated Transactions (MIT)
An MIT provides the ability to run recurring payments and subscriptions to selling product or services on a recurring schedule. Merchants also receive payment on time with this model. This also minimizes the efforts for the customer. Merchant initiated transactions are an enhancement to regular customer-initiated accounts/sale transactions. To run a merchant-initiated transaction, few additional indicators are required, as well as pass/receive network transaction id. These indicators will be used by network to mitigate fraud; transaction id will be provided by uCom at initial transaction. MIT indicators are applicable for certain Payments and Accounts APIs. For the MIT fields and indicators, click here<ADD LINK>.

## Fraud Detect
### Fraud Detect – Essentials
### Fraud Detect – Advanced
### Fraud Detect – Premium

## Features
### Reporting

### To explore the payment features, go to [Create Payment Sale Authorization](../api/?type=post&path=/v1/payments/sales&branch=develop&version=1.0.0). Navigate to the Request tab and from the dropdown, select your preferred payment type.

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

 <style>
    div#cs_id {
        display: flex;
        width: 100% !important
        justify-content: between;
            }
    div#cs_id p {
        width: 50%;
        flex-grow: 1;
    }
    div#cs_id  * {
        display: block;
    }
</style>