# Interactive Guide

## Getting Started

To get started, turn to the [API Fundamentals](../docs/?path=/docs/documentation/Connectivity.md) page for details on connectivity, API HTTP Headers, API security, then return to this webpage to navigate through the QSR services below.

Determine whether a customer wants to vault an account into Connected Commerce (uCom) or use Guest Checkout (Anonymous Payment).  

### Set up customer profile

 A. [Register customer](../api/?type=post&path=/v1/customers)  
 OR  
 B. [Guest Checkout](../docs/?path=recipes/guest_checkout.md)

>**Note:**
>If customer wants to use Guest Checkout, then it is not necessary to register customer profile. Although once customer profile is created for a specific customer, that customer can still opt to make an Anonymous Payment, where vaulting is not required.

### Set up payment account
Registering an account consists of several steps listed here below. These steps are required for a merchant to send card details to Connected Commerce (uCom).

Step 2a: [Create Security Access Token](../api/?type=post&path=/v1/tokens) This is the first step to transfer PCI data (public key and token Id) from client to Connected Commerce (uCom).  
Step 2b: [Tokenize by Card Detail](../api/?type=post&path=/v1/account-tokens) This step calls account tokens to send encrypted card details and get nonce token. You can also use our [Hosted Pages](../docs/?path=recipes/HostedPages.md) Solution to tokenize the card.

>**Note:** For Guest Checkout (Anonymous Payment), skip step 2c below and jump to step 3.

Step 2c: [Vault an Account](../api/?type=post&path=/v1/customers/{fdCustomerId}/accounts)  

## What is your Business?

<!--
type: tab
titles: Restaurant, Gas Station, Automobiles
-->
<b> Select payment type </b>

Once the customer is are ready for checkout, customer has the option to choose either payment using Vaulted Account or One Time Payment without vaulting (Anonymous Payment) or prefer Guest Checkout.

A. Vaulted account: User has the ability to select payment type from already saved payment methods.
<ADD LINK TO VAULTED CARDS USE CASE once that page is created>
<ADD How to retrieve what is vaulted - How to pull details from vaulted list>
Go to the [Get Account Details](../api/?type=get&path=/v1/customers/{fdCustomerId}/accounts/{fdAccountId}) and [Get List of Accounts](../api/?type=get&path=/v1/customers/{fdCustomerId}/accounts) APIs to explore these payment methods.

B. One Time Payment processing: One Time Payment processing can be done by simply following the vaulting process Step 2a & 2b and use the nonce to do payment

C. Guest Checkout: Guest checkout is same process like One Time Payment processing

<b> Perform a Sale </b>

When you are ready to place an order you perform a [Sale](../api/?type=post&path=/v1/payments/sales) operation. 

<!--
type: tab
-->
<b> Locate a Gas Station </b>

Connected Commerce (uCom) provide Site location service to get information of the Gas stations, Go to the [Get List of Petro Sites](..//api/?type=get&path=/v1/petro-sites) and [Get Site Details](../api/?type=get&path=/v1/petro-sites/{siteLocationId}) APIs to explore these API services.

Once you selected the gas station and found an available pump you will get into the next step

<b> Authorize the payment </b>

<details>
<summary><b><i>Pay @ Pump</i></b></summary>

This step include selecting the gas status, pump number and funding source and authorize. The petro cycle start with [Create Petro Transaction](../api/?type=post&path=/v1/petro-transactions) API, once approved the customer will see the message [Begin Fueling] on the pump screen. After fueling is complete and the nozzle is placed back, The authorization completion process takes place in the Connected Commerce (uCom).

</details>

<details>
<summary><b>Pay @ In-Store</b></summary>

Customer walks inside the store to the cashier and shows QR code generated on the phone using [Create QR](../api/?type=post&path=/v1/stac)

Cashier scans the QR code and triggers the [Create Petro Transaction](../api/?type=post&path=/v1/petro-transactions) API from the Point Of Sale, once approved the customer will see the message [Begin Fueling] on the pump screen. After fueling is complete and the nozzle is placed back, The authorization completion process takes place in the Connected Commerce (uCom).

</details>

<b> Fuel Completion & Sale Receipt </b>

Customer can view the transaction using [Read Petro Transaction](../api/?type=get&path=/v1/petro-transactions/{fdTransactionId}) and view receipt using [Get receipt](../api/?type=get&path=/v1/txhistory/receipts/{fdTransactionId}).

Customer have the option to [Cancel Transaction](../api/?type=patch&path=/v1/petro-transactions/{fdTransactionId}) before starting the fuelling process. Additional service and information can be found [here](../docs/?path=/docs/documentation/APIServices.md)

<!--
type: tab
-->
In the Auto or Online Shopping domain the concept of Auth & Capture is a common e-commerce flow, Where merchant needs to perform an Auth when placing and order and perform a Capture when the order is processed or delivered. Connected Commerce [uCom] provides features.
<!-- type: tab-end -->




# Headline Section
<!-- Client Name Details -->

## Change Log Table

|Version|Date|Updated by| Notes| 
|:------|:-----:|:---------:|-----:|
|1.0| 8/30/2017| Mohl| Base Implementation Completed. All features that allow client to make payment | 
<!-- Line item on Base implementation (this includes all that is in the standard implementation guide. It should have a line item when that was completed. Anything else should be additional features/functionality. -->

## Features enabled currently 
<!--Inventory view of everything the client has. This can or cannot be in a table  -->

## Features enabled in this guide
<!-- What does this guide cover?  -->

## Links
<!-- This is where you put links for the client. We will want to make sure they all work. -->

## Additional Snippets 
<!-- What are the actions the client is trying to do?  What are the steps to take to implement. If the client is adding to an additional implementation where do they need to add?    -->

## Steps to implement feature in this guide 
<!-- Any feature implementation requires steps for the client. What are those steps?  -->
<!-- This is where we want to inventory this, validate and keep as a master -->

### Endpoints 
<!-- Endpoints required to implement -->

### Step 1  
#### Snippets 
<!-- What are the actions the client is trying to do?  What are the steps to take to implement. If the client is adding to an additional implementation where do they need to add?    -->
### Step 2  
#### Snippets 
<!-- What are the actions the client is trying to do?  What are the steps to take to implement. If the client is adding to an additional implementation where do they need to add?    -->
### Step 3
#### Snippets
 <!-- What are the actions the client is trying to do?  What are the steps to take to implement. If the client is adding to an additional implementation where do they need to add?    -->

## Success and Error Codes
<a href = "https://developer.fiserv.com/product/ConnectedCommerce/docs/?path=docs/documentation/API_Response_Codes.md&branch=main"> Connected Commerce uCOM Error Code link </a>
[Connected Commerce uCOM Error Code Link] (https://developer.fiserv.com/product/ConnectedCommerce/docs/?path=docs/documentation/API_Response_Codes.md&branch=main)
 <!-- Develop master list for successes as well depending on payment type. We should already have this and would be easy to partner   -->