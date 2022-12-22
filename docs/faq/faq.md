# How we can help you

## Here are few common questions that may help you.

<details>
  <summary><b>How many credit cards can we vault to a wallet?</b></summary>

The number of cards allowed to be vaulted per wallet is adjustable based on the client’s preferences. 

</details>


<details>
<summary>How can we remove all credit cards or accounts vaulted to a wallet within uCom?</summary>

uCom does not offer the ability to remove all accounts tied to a specific wallet. uCom, does, however offer the ability to remove one account at a time using the API call below: </br>
DELETE /v1/customers/{fdCustomerId}/accounts/{fdAccountId} </br>
Also, please note that if you delete a customer profile, by default all vaulted/saved cards will be deleted automatically along with the customer profile. 

</details> 

<details>
<summary>Can we send an auth or sale payload with the "Name on Card" field blank?</summary>

Yes, uCom does not require name on card to be sent as part of the auth or sale transaction. 
</details>

<details>
<summary>Is there a recommendation on how to use data returned in hostExtraInfo portion of the response payloads? Do we need to log this data for history or troubleshooting purposes?</summary>

Yes, we recommend making use of the data returned in the “hostExtraInfo” field to troubleshoot issues with transactions as that provides the exact reason why a transaction was declined. 

</details>

<details>
<summary>On the auth endpoint, fdCustomerId is marked “Required (unless specifically configured not to be)”. What does this mean exactly?  Do we need a customer id for anonymous payments?</summary>

An fdCustomerId is required to perform payments using a vaulted account only, but it is not mandatory for anonymous payments. 

</details>

<details>
<summary>Can we pull a customer profile using just the external customer ID?</summary>

Yes, this operation is possible using the query strong “externalId’ as demonstrated below: </br>
GET /v1/customers/?externalId=customerid

</details>

<details>
<summary>Does the platform support partial reversal of authorized funds after a portion of the held amount has been captured?</summary>

Yes, uCom does support partial reversal.  For example, let’s assume we have a auth for $50 and we only captured $20, the remaining amount will be released automatically. 
</details>

<details>
<summary>Can we use multiple algorithms when interacting with the uCom API?</summary>

No, uCom does not support multiple algorithms for the same partner.

</details>


[//]: # (These are reference links used in markdown file)

[Setup Tenant]: <?path=docs/getting-started/setup-tenant/setup-tenant.md>

[Register Tenant]: <?path=docs/getting-started/setup-tenant/register-tenant.md>

[Deploy Tenant]: <?path=docs/getting-started/setup-tenant/deploy-tenant.md>

[Sample tenant repo]: <https://github.com/fiserv/sample-tenant>
