# What is ApplePay?

Apple Pay is an in-app payment method. As the name suggests, an in-app payment allows a consumer to pay with one touch from within a merchant’s mobile app and handles the details of the purchase flow, payment processing, receipts, etc.

It replaces your physical cards and cash with an easier, safer, more secure, and private payment method — whether you’re in a store, online, or sending cash to friends or family.

# Supported Card types/schemes

Apple Pay payments are possible with: Visa, Mastercard, Maestro, American Express (Amex) and Diners (Discover) cards.

# Supported Devices

Which are the supported OS versions, devices, browser versions for Apple Pay? See here [https://support.apple.com/en-gb/HT208531](https://support.apple.com/en-gb/HT208531)

# Where we can get the Test Data

[https://developer.apple.com/apple-pay/sandbox-testing/](https://developer.apple.com/apple-pay/sandbox-testing/)

## Step 1: Add a card to the Apple Wallet

* Consumer adds card as a payment method into the mobile app and enters card details into the Apple wallet.

* ApplePay is not onboarded into Connected Commerce (uCom) vault, but it is onboarded into Apple Wallet only.

* From Fiserv Connected Commerce (uCom) side encryption/decryption does not happen during card onboarding.

## Step 2 : Payment with Apple Pay

1. Consumers to perform payments with their plastic bank cards added into the Apple Wallet.

2. Consumer can select in the Apple wallet with which card payment should be done.

3. Encrypted Apple Pay payload details and payment details are provided and transferred via MAS (Mobile Application Server) to Connected Commerce (uCom) system.

4. During payment flow, encrypted DPAN (Not actual PAN number), expiry, holder name, card type, cvv, eci and necessary headers are coming into Connected Commerce (uCom) via (Mobile -> MAS -> Connected Commerce (uCom)).

5. Connected Commerce (uCom) get decrypted data (DPAN, expiry, holder name, card type, cvv, eci, etc) from Fiserv’s Payeezy decryption service.

6. Connected Commerce (uCom) sends DPAN, expiry, holder name, card type, cvv, eci and all necessary payment data to payment processor for payment processing.

## Payeezy Integration

In order to process Apple Pay and Google Pay payments through Connected Commerce (uCom), a CSR along with a Merchant Identifier are needed.

To get the Apple Certificate (CSR) you have to register an account with our Payeezy Developer portal. This is used for a different gateway (Payeezy), but you are just registering so you can create and save the certificate then add it your Apple developer account.

**Kindly follow the steps below to create an account, generate an API key, a certificate, and a merchant ID:**

-  This process will need to be done for both Test and Prod; you would select **Sandbox** for Test and **Live** for Prod.

## Merchant – Create Apple Certificate Sandbox (test)

### Step 1: Create a Payeezy Developer account

>Please consider creating an account using a shared/group mailbox to avoid access issues in the future. 

1. Enroll here:[https://developer.payeezy.com/user/register](https://developer.payeezy.com/user/register)
>Select “developer as the merchant” option in the “Tell us about your business” section. 

2. Activate your account using the email sent to your mailbox.

3. Enter a secure password using the activation link in the email and click the “LOG IN” button once
completed. 

4. Once logged in, click the “Get Certified” button on top to begin the certification process. You will be asked to change your password one more time, kindly do so. 

5. Once the password is changed, expand the “Personal Information” section, and fill out the form
completely. 

>Please select “FIRSTDATA” for the “Who were you referred by?” question and fill out the target market accordingly.

>Select “developer as the merchant” option in the “Tell us about your business” section. 

6. Finally, click on “CERTIFY” and then “SAVE”. 

7. Click cancel on the “Add A Merchant” screen that will show up as we automatically create a
sandbox merchant ID on your behalf. 

## Step 2: Create a Sandbox API Key 

1. Go to the “APIS” page and click the “ADD A NEW API” button. 

2. Name your API and select “Sandbox”. 

3. You will be redirected back to the “My API” screen. Click on the API name that you just created, and you will see your API Key and Secret. Please take note of your API key. 

>When ready to use the API in a production environment, you will come back to this page and select “LIVE” (or you can keep the original Sandbox API and create a new one for LIVE).

4. Go to the “Merchant” page and make a note of the token. The information found on this page are header parameter values that uniquely identify your transactions associated with all API calls.

>Please note that ACME SOCK is a generic merchant ID for the Demo environment. It is strictly for the demo environment and not associated with a specific merchant profile. The correct value in the merchant token field will start with "FDOA-" and this is the value that will be provided to the project technical support team. 

## Step 3: Generate a Sandbox Apple Pay Cert 
To enable Apple Pay & Google Pay through the Connected Commerce (uCom) platform, you will need to generate an Apple Pay cert as demonstrated below: 

1. Click on “CERTS” in the top right. Enter an app label and select the product you would like, for example, Apple Pay then click on the “ADD” button. 

2. Once done, take a note of the public key hash and app label. 

>If you need to generate more than one apple pay/android pay cert, you will need to email the Payeezy onboarding email (payeezyboarding@fiserv.com). Same step will need to be done if any modifications are needed to the existing certs. 

## Step 4: Generate Production Credentials 

>Please note that the Sandbox & Live merchant App labels, certifications, and key information will need to be shared with Connected Commerce (uCom) technical support/Implementations team for account configuration.

1. Generate a live API Key, by going to the “APIS” page and clicking add a new API. Please enter your application name and select “Live” and finally click “CREATE
YOUR APP” when done.

2. Please take note of your API keys. 

3. Generate a live Apple Pay cert by going to “CERTS” page, then select the “live” tab and create a new Apple Pay cert. 

4. Request a live merchant ID by emailing the Payeezy onboarding team (payeezyboarding@fiserv.com) and requesting a live merchant ID. 

## Step 5: Integrate Apple Pay & Google Pay's SDK

Kindly use the links below to get started integrating Apple Pay & Google Pay into your app: 

**<ins> Apple Pay: </ins>**

https://developer.apple.com/apple-pay/implementation/

https://developer.apple.com/apple-pay/

**<ins> Google Pay: </ins>**

https://developers.google.com/pay


