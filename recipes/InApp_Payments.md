# What is ApplePay?

Apple Pay is an in-app payment method. As the name suggests, an in-app payment allows a consumer to pay with one touch from within a merchant’s mobile app and handles the details of the purchase flow, payment processing, receipts, etc.

It replaces your physical cards and cash with an easier, safer, more secure, and private payment method — whether you’re in a store, online, or sending cash to friends or family.

# Supported Card types/schemes

Apple Pay payments are possible with: Visa, Mastercard, Maestro, American Express (Amex) and Diners (Discover) cards.

# Supported Devices

Which are the supported OS versions, devices, browser versions for Apple Pay? See here [https://support.apple.com/en-gb/HT208531](https://support.apple.com/en-gb/HT208531)

# Where we can get the Test Data

[https://developer.apple.com/apple-pay/sandbox-testing/](https://developer.apple.com/apple-pay/sandbox-testing/)

# Step 1: Adding a card to the Apple Wallet

* Consumer adds card as a payment method into the mobile app and enters card details into the Apple wallet.

* ApplePay is not onboarded into uCom vault, but it is onboarded into Apple Wallet only.

* From Fiserv uCom side encryption / decryption is not happening during card onboarding.

# Step 2 : Payment with Apple Pay

1. Consumers to perform payments with their plastic bank cards added into the Apple Wallet.

2. Consumer can select in the Apple wallet with which card payment should be done.

3. Encrypted Apple Pay payload details and payment details are provided and transferred via MAS (Mobile Application Server) to uCom system.

4. During payment flow, encrypted DPAN (Not actual PAN number), expiry, holder name, card type, cavv, eci and necessary headers are coming into uCom via (Mobile -> MAS -> uCom).

5. uCom get decrypted data (DPAN, expiry, holder name, card type, cavv, eci, etc) from Fiserv’s Payeezy decryption service.

6. uCom sends DPAN, expiry, holder name, card type, cavv, eci and all necessary payment data to payment processor for payment processing.

# Payeezy Integration­­

In order to process Apple Pay and Google Pay payments with uCom, a CSR a long with a Merchant Identifier are needed.

To get the Apple Certificate (CSR) you have to register an account with our Payeezy Developer portal. This is used for a different gateway (Payeezy), but you are just registering so you can create and save the certificate then add it your Apple developer account.

**Kindly follow the steps below to create an account, generate an API key, a certificate, and a merchant ID:**

-  This process will need to be done for both Test and Prod; you would select **Sandbox** for Test and **Live** for Prod.

-  For questions or issues regarding the Apple developer account and portal, please work with Apple directly.

# Merchant – Create Apple Certificate Sandbox (test)

## Step 1: Create a Payeezy Developer account

1) Enroll here: [https://developer.payeezy.com/user/register](https://developer.payeezy.com/user/register)

* Please consider creating an account using a shared/group mailbox to avoid access issues in the future. 
* Select “developer as the merchant” option in the “Tell us about your business” section

 2) Activate your account using the email sent to your mailbox. 
 3) Enter a secure password using the activation link in the email and click the “LOG IN” button once
completed. 
 4) Once logged in, click the “Get Certified” button on top to begin the certification process. You will be
asked to change your password one more time, kindly do so. 
 5) Once the password is changed, expand the “Personal Information” section, and fill out the form
completely. 
* Please select “FIRSTDATA” for the “Who were you referred by?” question and fill out the target market
accordingly.
*Select “developer as the merchant” option in the “Tell us about your business” section. 
6) Finally, click on “CERTIFY” and then “SAVE”. 
7) Click cancel on the “Add A Merchant” screen that will show up as we automatically create a
sandbox merchant ID on your behalf. 

## Step 2: Create a Sandbox API Key 
1) Go to the “APIS” page and click the “ADD A NEW API” button. 
2) Name your API and select “Sandbox”. 
3) You will be redirected back to the “My API” screen. Click on the API name that you just created, and you
will see your API Key and Secret. Please take note of your API key. 
*When ready to use the API in a production environment, you will come back to this page and select
“LIVE” (or you can keep the original Sandbox API and create a new one for LIVE).
4) Go to the “Merchant” page and make a note of the token. The information found on this page are
header parameter values that uniquely identify your transactions associated with all API calls.
Please note that ACME SOCK is a generic merchant ID for the Demo environment. It is strictly for the
demo environment and not associated with a specific merchant profile. The correct value in the
merchant token field will start with "FDOA-" and this is the value that will be provided to the uCom DL
Team.

## Step 3: Generate a Sandbox Apple Pay Cert 
To enable Apple Pay & Google Pay through the uCom platform, you will need to generate an Apple Pay
cert as demonstrated below: 
1) Click on “CERTS” in the top right.
Enter an app label and select the product you would like, for example, Apple Pay then click on the
“ADD” button.  
2) Once done, take a note of the public key hash and app label. 
* If you need to generate more than one apple pay/android pay cert, you will need to email the payeezy
onboarding email (payeezyboarding@fiserv.com). Same step will need to be done if any modifications
are needed to the existing certs. 

# Merchant – Genrate a Live/Prod Apple Certificate 

1.  Create a Payeezy Developer account or log into an existing account.

    Enroll here:  [https://developer.payeezy.com/](https://developer.payeezy.com/)

2.  You will either get an error when attempting to create a certificate for Live or the button will be grayed out. Please follow the below steps to resolve this.

3.  Please complete step 2. GET CERTIFIED of the Developer Portal setup. Once that is completed, you will be able to generate the Live/Production ApplePay CERT.

4.  Skip this step if already performed.

- After you click on the activate link on your Developer Email, you will be prompted to create your password.

-  After you create your password, you will be asked to create three security questions and answers.

- Once you have completed this, you will be moved to the APIS section of the Dev Portal.

5.  Click on “APIS”.

6.  Click + ADD A NEW API.

7.  Enter name for a dummy test APP, choose Sandbox as Type, and click “CREATE YOUR APP”.

8.  Click “GET CERTIFIED.”

8.  Complete the form (be sure to complete the nestled sections under “personal information” and “profile settings”). Check the box to agree to the terms and click “CERTIFY”.

9.  After clicking “CERTIFY,” you should get a success response. Once this happens, click “SAVE.”

10.  Once you have completed these steps, you should be able to create the Live ApplePay certificate.

11.  Provide me with the email address used to enroll. I will complete the setup on my end and will notify you once completed.

**Apple Pay Setup -** **Same Process for Test & Prod**

1. Client/Developer will create a Payeezy Developer account.

Enroll here: [https://developer.payeezy.com/](https://developer.payeezy.com/)

Once logged in select the **CERTS** tab on the top right hand corner.

Select the **Add Certs** drop down and select APPLE_PAY. Name the Cert under “Enter App Label”

And click on **+ADD**.

2. Provide us with the email address used to enroll. We will complete the setup on our end and will notify you once completed.

  
**Integrations --- Apple Pay Decrypt APIGEE Setup**

1. We will need the dev email that was used to enroll and set up ApplePay within developer tool.

2. We will need to complete the [Apigee Maintenance Request](https://sharepoint.1dc.com/sites/ESD/BIA/BIAIM/BIAIMECOM/Lists/Apigee%20Maintenance%20Request/AllItems.aspx?Paged=TRUE&p_ID=134&PageFirstRow=121&&View=%7bF9F9ECDF-8881-46D4-A822-0AC04C466A06%7d&InitialTabId=Ribbon%2EList&VisibilityContext=WSSTabPersistence) form to update the clients Apigee app.

3. Within Apigee you will need to add the custom attribute of **payeezyDecryptDeveloperEmail** and the value will be the dev email address which was used to set up the ApplePay cert within Payeezy developer site. Sample below.

4. NOTE: The attribute, once added for Apple Pay, will work the same as for Samsung Pay (both at the same time). No other changes need to be done at this point.
