# Quick Service Restaurants (QSR) API Integration Guide

## Overview

<Add Product Content on QSR HERE>

## Getting Started
To get started, turn to the [API Fundamentals](../docs/?path=/docs/documentation/Connectivity.md) page for details on connectivity, API HTTP Headers, API security, and idempotency, then return to this webpage to navigate through the QSR services below.

### Step 1: Set up customer profile
Determine whether a merchant wants to vault an account into Connected Commerce (uCom) or use guest check out (anonymous check out).  
A. [Register customer profile (Create customer)](../api/?type=post&path=/v1/customers)  
B. [Guest checkout](../docs/?path=recipes/guest_checkout.md&branch=develop)

Note: If merchant wants to use guest checkout, then it is not necessary to register customer profile. Although once customer profile is created for a specific merchant, that merchant can still opt to perform anonymous checkout without vaulting.

### Step 2: Set up payment account
Registering an account consists of several steps listed here below. These steps are required for a merchant to send card details to Connected Commerce (uCom).  
Step 2a: [Create Security Access Token](api/?type=post&path=/v1/tokens) (Get access token.)
Step 2b: [Tokenize by Card Detail](../api/?type=post&path=/v1/account-tokens) (Call account tokens to send encrypted card details and get nonce token.)
Step 2c: [Vault account](../api/?type=post&path=/v1/customers/{fdCustomerId}/accounts)

### Step 3: Select payment type
Determine whether a merchant wants to use vaulted account or guest check out.  

A. Vaulted account: Send key parameters – payment by fdAccountId, merchantId, and transaction details  

 Note: In order to vault an account, tokenization—a secure way for Connected Commerce and end customer to securely exchange card details—must be done first.  

B. Guest check out: Tokenize card details and process for payment  
 1. Call account tokens to get nonce token  
 2. Payment by nonce  
  a. Vaulted account - Payment by fdAccountId, transaction details  
  b. Payment by nonce, transaction details

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

For other payment related options such as to cancel, void, or refund a transaction, click on the Payment Services dropdown on the <Explore the QSR Services> page and select the action you want to perform. From there, you may also explore the other QSR API services through the links provided.

## Error Codes
For error codes table, click here<ADD LINK>.