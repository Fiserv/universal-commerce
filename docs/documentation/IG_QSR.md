# Quick Service Restaurants (QSR) and Petro API Integration Guide

## Overview

<Add Product Content on QSR HERE>

## QSR API Flow

## Getting Started
To get started, turn to the [API Fundamentals](../docs/?path=/docs/documentation/Connectivity.md) page for details on connectivity, API HTTP Headers, API security, then return to this webpage to navigate through the QSR services below.

Determine whether a customer wants to vault an account into Connected Commerce (uCom) or use Guest Checkout (Anonymous Payment).  

### Step 1: Set up customer profile

 A. [Register customer](../api/?type=post&path=/v1/customers)  
 OR  
 B. [Guest Checkout](../docs/?path=recipes/guest_checkout.md)

>**Note:**
>If customer wants to use Guest Checkout, then it is not necessary to register customer profile. Although once customer profile is created for a specific customer, that customer can still opt to make an Anonymous Payment, where vaulting is not required.

### Step 2: Set up payment account
Registering an account consists of several steps listed here below. These steps are required for a merchant to send card details to Connected Commerce (uCom).

Step 2a: [Create Security Access Token](../api/?type=post&path=/v1/tokens) (This is the first step to transfer PCI data (public key and token Id) from client to Connected Commerce (uCom)).  
Step 2b: [Tokenize by Card Detail](../api/?type=post&path=/v1/account-tokens) (Call account tokens to send encrypted card details and get nonce token.)  

>**Note:** For Guest Checkout (Anonymous Payment), skip step 2c below and jump to step 3.

Step 2c: [Vault an Account](../api/?type=post&path=/v1/customers/{fdCustomerId}/accounts)  

### Step 3: Select payment type
Determine whether a customer wants to use Vaulted Account or Guest Checkout (Anonymous Payment).

A. Vaulted account: User has the ability to select payment type from already saved payment methods.
<ADD LINK TO VAULTED CARDS USE CASE once that page is created>
<ADD How to retrieve what is vaulted - How to pull details from vaulted list>
Go to the [Get Account Details](..//api/?type=get&path=/v1/customers/{fdCustomerId}/accounts/{fdAccountId}) and [Get List of Accounts](../api/?type=get&path=/v1/customers/{fdCustomerId}/accounts) APIs to explore these payment methods.

 >**Note:**
 >In order to vault an account, **tokenization**—a secure way for Connected Commerce and end customer to securely exchange card details—must be done first.  

B. Guest Checkout: Tokenize card details and process payment using nonce.  

 1. Call account tokens to get nonce token  
 2. Payment by nonce  
  a. Vaulted account – Payment by fdAccountId, transaction details  
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

## Petro API Flow

### Step 1: Set up customer profile

### Step 2: Set up payment account

### Step 3: Locate a gas station

  A. Pay at pump – type of gas, air pressure, car wash, . . . GO TO STEP 4  
  B. Pay in store – Generate QR in app (Create Stack Request to generate QR code)

### Step 4: Select payment type

  A. Request service authorization (app confirms authorization and next step)  
  B. Receipt received  
  C. Site transaction history
