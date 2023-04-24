# How we can help you? 

**Here are few common questions that may help you while you are exploring our API.**

### General FAQs

<details>
<summary><b>How are debit cards handled in Connected Commerce (uCom)?</b></summary>

Debit cards are treated the same way as credit cards in Connected Commerce (uCom) requests. 

</details>

### Customer Services FAQs

<details>
<summary><b>Can we pull a customer profile using just the external customer ID?</b></summary>

Yes, this operation is possible using the query strong "externalId" as demonstrated below: </br>
GET /v1/customers/?externalId=customerid

</details>

<details>
<summary><b>How can we send customer's email address for Fraud scoring in Guest Checkout scenario?</b></summary>

To pass through the customer’s email address for fraud scoring, you have to add the "purchaseInfo" field to your API call as demonstrated below: <br>
```json
{
   "authorization":{
      "orderId":"Order8341003",
      "storeId":"703904",
      "requestedAmount":349.5,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "token":{
            "tokenId":"2a6078ab-c9d7-4113-8dee-bad68417a1c7",
            "tokenProvider":"CLAIM_CHECK_NONCE"
         }
      },
      "purchaseInfo":[
         {
            "order":{
               "emails":[
                  {
                     "value":"sample01@sample01.com",
                     "type":"home"
                  }
               ]
            }
         }
      ]
   }
}

```
</details>

### Account Services FAQs

<details>
  <summary><b>How many credit cards can we vault to a wallet?</b></summary>

The number of cards allowed to be vaulted per wallet is adjustable based on the client’s preferences. 

</details>

<details>
<summary><b>How can we remove all credit cards or accounts vaulted to a wallet within Connected Commerce (uCom)?</b></summary>

Connected Commerce (uCom) does not offer the ability to remove all accounts tied to a specific wallet. Connected Commerce (uCom) does, however, offer the ability to remove one account at a time using the API call below: <br>
DELETE /v1/customers/{fdCustomerId}/accounts/{fdAccountId} </br>
Also, please note that if you delete a customer profile, by default all vaulted/saved cards will be deleted automatically along with the customer profile.

</details>


### Payment Services FAQs 


<details>
<summary><b>Can we send an auth or sale payload with the "Name on Card" field blank?</b></summary>

Yes, Connected Commerce (uCom) does not require name on card to be sent as part of the auth or sale transaction.
</details>

<details>
<summary><b>Is there a recommendation on how to use data returned in hostExtraInfo portion of the response payloads? Do we need to log this data for history or troubleshooting purposes?</b></summary>

Yes, we recommend making use of the data returned in the "hostExtraInfo" field to troubleshoot issues with transactions as that provides the exact reason why a transaction was declined.
  
</details>
  
<details>
<summary><b>Does the platform support partial reversal of authorized funds after a portion of the held amount has been captured?</b></summary>

Yes, Connected Commerce (uCom) does support partial reversal. For example, if we have an authorization for $50 and we only captured $20, the remaining amount will be released automatically.
</details>

<details>
<summary><b>If we send Expiry month and year with an expired date, will Connected Commerce (uCom) throw an error?</b></summary>

Connected Commerce (uCom) does not have any validation against the Expiry month and year, but our downstream payment system does the validation and throws error, which then gets passed to Connected Commerce (uCom).

</details>


<details>
<summary><b>On the auth endpoint, fdCustomerId is marked "Required (unless specifically configured not to be)."  What does this mean exactly?  Do we need a customer id for anonymous payments?</b></summary>

An fdCustomerId is required to perform payments using a vaulted account only, but it is not mandatory for anonymous payments. 

</details>

<details>
<summary><b>Is there a way to flag an account (payment method) as the default/primary/preferred for a customer?</b></summary>

 No, however, hosted pages does allow you to pass a "preferred" card in JSON that will preselect an account ID as demonstrated below: <br>
 
 ```json
 "preferredCard": { "fdAccountId": "8a7f7fb770427dbf01704518eee40019"
```
</details>

<details>
<summary><b>How long does a claim check nonce tokenized account last?</b></summary>

There is no time expiration, but a nonce expires once it is used.

</details>

<details>
<summary><b>How long does the payment nonce last?</b></summary>

23 hours and 20 minutes
  
</details>


<details>
<summary><b>What is the difference between a refund and a void?</b></summary>

Void is generally used for canceling a previous operation, such as a capture, sale, or auth. </br>
Refund, on the other hand, is used when a transaction is fully completed. Either the money has  moved or settlement is done.
 
For QSR, void is the most likely use case as the change would likely occur very quickly after a sale (you're not refunding food 3 days later). That said, refunds probably have to be done at the POS, while an order cancellation for QSR is likely done through the mobile app or before food is received, so void is more likely in that case.

</details>

### Security FAQs

<details>
<summary><b>Can we use multiple algorithms when interacting with the Connected Commerce (uCom) API?</b></summary>

No, Connected Commerce (uCom) does not support multiple algorithms for the same partner.

</details>

<details>
<summary><b>If we signed up to use a multi-use public key, what is the expiration period of a static key pair?</b></summary>

We will generate a multi-use key on your behalf once, and disable the option to generate a key again. The public key we provide does not expire unless requested.

</details>

<details>
<summary><b>If we need to renew or replace a key, will the previous key remain valid until the new key can be deployed to our Prod server?</b></summary>

Each environment (CAT and Prod) will have its own key. If you would like to replace or renew a key, we need to do a deployment. Once the new key is generated, the old key will not work.

</details>

### Fraud Mitigation FAQs

<details>

<summary><b>What payment methods are covered by Fraud Mitigation by Carat?</b></summary>

 Fraud Mitigation by Carat provides a fraud prevention solution for a merchant's eCommerce/Digital Commerce offering. The solution supports any payment method which has a card number format as the primary key (i.e., 14-20 digits). Example payment methods currently supported for scoring are:

- Major Card Brands: Visa, MasterCard, Discover, AMEX, etc.
- Local Payment Methods: Carte Bancaires, Carte Bleue, CartaSi, etc.
- Digital Wallets: Apple Pay, Google Pay, Samsung Pay, Amazon Pay, etc.
- Other: Gift Cards, PLCC, EBT Online, etc.

The most notable absence is PayPal support, which is on the product roadmap.

</details>

<details>

<summary><b>What data is required for Fraud Mitigation by Carat?</b></summary>

Data required for an effective fraud mitigation service can be broken into five categories:

- Customer Information: customer ID, name, address, email address and telephone number
- Payment Method Information: card number, expiration date, cardholder name and address
- Order Information: price, currency, basket contents, shipping address and store information
- Transaction Information: transaction type, issuer response, 3DS response and transaction status
- Device Information: device ID, IP address, device manufacturer, model and operating system

</details>

<details>

<summary><b>Where in the payment flow should Fraud Mitigation by Carat be implemented?</b></summary>

It is strongly advised that Fraud Mitigation by Carat is implemented pre-authorization and pre-authentication (prior to submission to networks for authorization or to 3DS services for authentication). In this set-up the fraud prevention suite can proactively prevent potential and known fraudsters prior to the card networks or issuers knowing of the attempted payment. Up front fraud prevention provides a merchant with several benefits:

- Where a payment is declined due to being categorized as potentially fraudulent, the merchant does not suffer the costs associated with processing the transaction
- Where an attack on a merchant's eCommerce platform is identified the fraudulent activity never reaches the networks or issuers, helping the merchant avoid fines
- Known fraudsters on a merchant's eCommerce platform are instantly refused to conduct payments

While the solution allows for a post-authorization configuration it is strongly discouraged and is only implementable with sign-off from the Fraud Mitigation Product Owner.

</details>

<details>

<summary><b>Is Device Intelligence required for Fraud Mitigation by Carat?</b></summary>

Fraud Mitigation by Carat provides a set of Device Intelligence components which can be integrated to a merchant’s website (JavaScript) or mobile application (SDK). The solution also allows merchants to provide device fingerprinting information pulled from another provider to the service – however the scope of data that can be provided through this method is less than that which is collected by the provided device components. Regardless of device intelligence provider the data collected is a core component of eCommerce fraud prevention, and as such integrating device intelligence is a requirement for using the solution. Any exceptions to this requirement need approval from the Fraud Mitigation Product Owner.
</details>

## Hosted Pages 

<details>
<summary>**How to enable CORS on Mobile App server?** </summary>

Browser/App will be sending the preflight request (OPTIONS method) instead of actual method(POST/GET) to server when access different domain in ajax call. In this case, we have to handle and enable CORS in server to handle this preflight request. OPTIONS method has to be handled and respond with following request:

```code
access-control-allow-headers !ACCEPT, fdCustomerId, ORIGIN, 
AUTHORIZATION, CONTENT-TYPE
 access-control-allow-methods !POST, GET, OPTIONS
 access-control-allow-origin !*
 allow !GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH
 connection !Keep-Alive
 content-language !en-US
 content-length !0
 date !Tue, 19 Dec 2017 23:14:23 GMT
 keep-alive !timeout=10, max=100
 x-powered-by !Servlet/3.0          
```
>Once browser/app receives the above as a response header then, it will subsequently invoke actual methods.

</details>

<details>
<summary>**Does Hosted Pages support other Languages?**</summary>

HP supports all texts in multiple languages. This process is manual and someone has to provide all texts displayed by HP in different languages. Please note that error messages from uCom server do not support multiple languages in current version.

</details>

<details>
<summary>**How to enable Threatmetrix feature on Hosted Pages?**</summary>

Threatmetrix feature can be enabled on HP when you pass the orgId and sessionId in SDK configuration parameters.

</details>



<details>
<summary>**Is it possible to control the look and feel of Hosted Pages?** </summary>

HP customization is limited. But it provides option to change the following style properties

1. Background Color, Text color 
1. Label Changes 
1. Native Button (Form can be triggered from outside of iFrame)
1. Fields position changes 
1. Label position (Above or floating) Changes 
1. Hint text changes 

**Sample Form** 

**Default View** 
<center><img src="https://raw.githubusercontent.com/Fiserv/universal-commerce/develop/assets/images/HostedPages%20(1).jpeg" alt="HP Diagram" class="center"></center>
**Error View** 

 <center><img src="https://github.com/Fiserv/universal-commerce/blob/develop/assets/images/HostedPages%20(5).png?raw=true" alt="HP Diagram" class="center"></center>         
          
</details>


<details>
<summary>**Does Hosted Pages support Local Validation?**</summary>

HP will do its own local validation of fields and show errors to the end-user as needed. Local validation is configurable. 

</details>

[//]: # (These are reference links used in markdown file)

[Setup Tenant]: <?path=docs/getting-started/setup-tenant/setup-tenant.md>

[Register Tenant]: <?path=docs/getting-started/setup-tenant/register-tenant.md>

[Deploy Tenant]: <?path=docs/getting-started/setup-tenant/deploy-tenant.md>

[Sample tenant repo]: <https://github.com/fiserv/sample-tenant>
