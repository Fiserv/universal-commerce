# Interactive Guide

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

Step 2a: [Create Security Access Token](../api/?type=post&path=/v1/tokens) This is the first step to transfer PCI data (public key and token Id) from client to Connected Commerce (uCom).  
Step 2b: [Tokenize by Card Detail](../api/?type=post&path=/v1/account-tokens) This step calls account tokens to send encrypted card details and get nonce token. You can also use our [Hosted Pages](../docs/?path=recipes/HostedPages.md) Solution to tokenize the card.

>**Note:** For Guest Checkout (Anonymous Payment), skip step 2c below and jump to step 3.

Step 2c: [Vault an Account](../api/?type=post&path=/v1/customers/{fdCustomerId}/accounts)  

## What is your Business?

<!--
type: tab
titles: Restaurant, Gas Station, Automobiles, Sports Arena, Health & Wellness 
-->
### Step 3: Select payment type

Once the customer is are ready for checkout, customer has the option to choose either payment using Vaulted Account or One Time Payment without vaulting (Anonymous Payment) or prefer Guest Checkout.

A. Vaulted account: User has the ability to select payment type from already saved payment methods.
<ADD LINK TO VAULTED CARDS USE CASE once that page is created>
<ADD How to retrieve what is vaulted - How to pull details from vaulted list>
Go to the [Get Account Details](..//api/?type=get&path=/v1/customers/{fdCustomerId}/accounts/{fdAccountId}) and [Get List of Accounts](../api/?type=get&path=/v1/customers/{fdCustomerId}/accounts) APIs to explore these payment methods.

B. One Time Payment processing: One Time Payment processing can be done by simply following the vaulting process Step 2a & 2b and use the nonce to do payment

C. Guest Checkout: Guest checkout is same process like One Time Payment processing

<!--
type: tab
-->
### Step 3: Locate a Gas Station

Connected Commerce (uCom) provide Site location service to get information of the Gas stations, Go to the [Get List of Petro Sites](..//api/?type=get&path=/v1/petro-sites) and [Get Site Details](../api/?type=get&path=/v1/petro-sites/{siteLocationId}) APIs to explore these API services.

<!--
type: tab
-->
TODO
<!--
type: tab
-->
TODO
<!--
type: tab
-->
TODO
<!-- type: tab-end -->
