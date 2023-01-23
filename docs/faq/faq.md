# How we can help you? 

**Here are few common questions that may help you while you are exploring our API.**

<ins> ### General FAQs </ins>

<details>
<summary><b>How are Debit cards handled in uCom?</b></summary>

Debit cards are treated the same way as credit cards in uCom requests. 

</details>

### <ins>Customer Services FAQs</ins>

<details>
<summary><b>Can we pull a customer profile using just the external customer ID?</b></summary>

Yes, this operation is possible using the query strong “externalId’ as demonstrated below: </br>
GET /v1/customers/?externalId=customerid

</details>

<details>
<summary><b>How can we send customer's email address for Fraud scoring in Guest Checkout scenario?</b></summary>

To pass through the customer’s email address for fraud scoring, you have to add the “purchaseInfo” field to your API call as demonstrated below: <br>
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

### <ins>Account Services FAQs</ins>

<details>
  <summary><b>How many credit cards can we vault to a wallet?</b></summary>

The number of cards allowed to be vaulted per wallet is adjustable based on the client’s preferences. 

</details>

<details>
<summary><b>How can we remove all credit cards or accounts vaulted to a wallet within uCom?</b></summary>

uCom does not offer the ability to remove all accounts tied to a specific wallet. uCom, does, however offer the ability to remove one account at a time using the API call below: <br>
DELETE /v1/customers/{fdCustomerId}/accounts/{fdAccountId} </br>
Also, please note that if you delete a customer profile, by default all vaulted/saved cards will be deleted automatically along with the customer profile. 

</details> 


### <ins>Payment Services FAQs</ins>  


<details>
<summary><b>Can we send an auth or sale payload with the "Name on Card" field blank?</b></summary>

Yes, uCom does not require name on card to be sent as part of the auth or sale transaction. 
</details>

<details>
<summary><b>Is there a recommendation on how to use data returned in hostExtraInfo portion of the response payloads? Do we need to log this data for history or troubleshooting purposes?</b></summary>

Yes, we recommend making use of the data returned in the “hostExtraInfo” field to troubleshoot issues with transactions as that provides the exact reason why a transaction was declined. 
  
</details>
  
<details>
<summary><b>Does the platform support partial reversal of authorized funds after a portion of the held amount has been captured?</b></summary>

Yes, uCom does support partial reversal. For example, let’s assume we have a auth for $50 and we only captured $20, the remaining amount will be released automatically. 
</details>

<details>
<summary><b>If we send Expiry month and year with an expired date, will uCom throw an error?</b></summary>

UCom does not have any validation against the Expiry month and year, but our downstream payment system does the validation and throws error, which then gets passed to uCom. 

</details>


<details>
<summary><b>On the auth endpoint, fdCustomerId is marked “Required (unless specifically configured not to be)”. What does this mean exactly?  Do we need a customer id for anonymous payments?</b></summary>

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

Void is generally used for cancelling a previous operation, such as a capture, sale, or auth. </br>
Refund, on the other hand, is used when a transaction is fully completed. Either the money has  moved or settlement is done.
 
For QSR, void is the most likely use case as the change would likely occur very quickly after a sale (you're not refunding food 3 days later). That said, refunds probably have to be done at the POS, while an order cancellation for QSR is likely done through the mobile app or before food is received, so Void is more likely in that case. 

</details>

### <ins>Security FAQs</ins>

<details>
<summary><b>Can we use multiple algorithms when interacting with the uCom API?</b></summary>

No, uCom does not support multiple algorithms for the same partner.

</details>

<details>
<summary><b>If we signed up to use a multi-use public key, what is the expiration period of a static key pair?</b></summary>

We will generate a multi-use key on your behalf once and disable the option to generate a key again. The public key we provide does not expire unless requested. 

</details>

<details>
<summary><b>If we need to renew or replace a key, will the previous key remain valid until the new key can be deployed to our prod server?</b></summary>

Each environment (CAT and prod) will have its own key. if you would like to replace or renew a key we need to do a deployment, once you generate new key the old key will not work. 

</details>






[//]: # (These are reference links used in markdown file)

[Setup Tenant]: <?path=docs/getting-started/setup-tenant/setup-tenant.md>

[Register Tenant]: <?path=docs/getting-started/setup-tenant/register-tenant.md>

[Deploy Tenant]: <?path=docs/getting-started/setup-tenant/deploy-tenant.md>

[Sample tenant repo]: <https://github.com/fiserv/sample-tenant>
