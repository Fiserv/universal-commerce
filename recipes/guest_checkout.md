
# How to make a guest checkout? 
<img title="icon" alt="Alt text" src="https://raw.githubusercontent.com/Fiserv/universal-commerce/f946a413c920caa34ae2b2aabf8fd04d7bcdbeea/assets/images/Picture2.png" width="30" height="30"> 
Making a guest checkout, or an anonymous checkout, as its often referred to, is a fairly simple process in Connected Commerce (uCom). A few bits of data are needed to successfully process an anonymous checkout or order, however. For starters, an orderId, merchantId, or storeId (depending on the configuration), and the requested amount are needed to complete a guest checkout. Below, we will break down what each field means and what kind of information is needed to successfully perform an anonymous transaction. 

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: https://int.api.firstdata.com/ucom/v1/payments/sales

Prod: https://prod.api.firstdata.com/ucom/v1/payments/sales

## Step 1: Generate an order ID 

**<ins> Description </ins>**

In order to perform a guest checkout or sale using the ucom/v1/payments/sales API call, an order ID is needed to help identify the order or transaction. The order ID could any string of characters with a maximum 36 characters limit.

**<ins> Sample Value </ins>**

```json
"orderId":"34548sdfdsfer769" 
```
## Step 2: Pass Through the Merchant ID or Store ID 

**<ins> Description </ins>**

The sales API call requires either a merchant ID (MID) or store ID in the body to identify the merchant or store making the transaction. The MID or store ID need to be configured and to be provided by Fiserv. 

**<ins> Sample Value </ins>**

```json
"merchantId":"1120542230"
```

## Step 3: Provide the Requested Amount 

**<ins> Description</ins>**

An amount is needed to process a guest checkout transaction. This value must be the final price that the customer is required to pay for the goods or services received. Along with the requested amount field, an ISO currency code is required based on the country and currency where the transaction is taking place. For example, to processor a payment using USD, simply use the code "840" as demonstrated below. 

**<ins> Sample Value </ins>**

```json
"requestedAmount":1,
 "currencyCode":{
 "number":840
```

## Step 4: Provide a Funding Source

**<ins> Description </ins>**

This portion of the API call/payload will require a funding source or payment method to process the transaction. Since all credit card details need to encrypted, a nonce token or TA Token are needed to mask the credit card details. A nonce could be obtained through the POST \- /v1/account\-tokens API call. There are several ways one could obtain a nonce, please refer to the implementation guide for the full process. 

**<ins> Sample Value (Nonce) </ins>**
```json
            "token": {
                "tokenProvider": "UCOM",
                "tokenType": "CLAIM_CHECK_NONCE",
                "tokenId": "26d0487a-126d-4640-a128-e9ee2c3efc2e"
            }

```

## Full Payload Sample

**<ins> Description </ins>**

This is a sample sales API payload that combines all of the previous steps. 

**<ins> Parameters </ins>**

| Attributes| Data Type| Required| Max Length
|:----------|:----------|:----------|:----------
| fdCustomerId| String| Optional| Maximum 36 characters. 
| orderId| String| Required| Maximum 36 characters.
| storeId/merchantId| String| Required| FD Issued - Alpha-Numeric
| fundingSource| String| Optional| Credit, prepaid
| requestedAmount| String| Required| Dollars. Cents
| Number| Integer| Required| USD = 840
| nameOnCard| String| Required| Maximum 50 characters
| cardType| String| Required| VISA, MASTERCARD,DISCOVER,AMEX
| securityCode| String| Required| Payment card security code 
| Type| String| Optional| Canonical type values of "work", "home", and "other".
| streetAddress| String| Optional| The full street address component, which may include house number, street name, P.O. box, and multi-line extended street address information.
| Locality| String| Optional| The city or locality component.
| Region| String| Optional| 4
| postalCode| String| Required| 5
| Country| String| Optional| The country name component. When specified, the value MUST be in ISO 3166-1 "alpha-2" code format; e.g., the United States and Sweden are "US" and "SE", respectively.
| Formatted| String| Optional| The full mailing address, formatted for display or use with a mailing label.
| Primary| Boolean| Optional| Indicates if this is the default address for the associated resource. It only has meaning when used in a set or array of addresses.
| Month| String| Required| Month format ‘MM’
| Year| String| Required| Year format ‘YY’

**<ins> Headers </ins>**

Content\-Type:application/json

Client\-Request\-Id:{{$guid}}

Api\-Key:{{clientKey}}

Authorization: Bearer {{tokenId}}

Timestamp:{{time}}

**<ins> Sample Request (with storeId) </ins>**

Sample Request - anonymous CC transaction using Nonce with storeId

```json
{
   "sale":{
      "orderId":"Order00122",
      "storeId":"KNOWN_STORE_ID",
      "requestedAmount":1,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "saveToVault":false,
         "token":{
            "tokenId":"bab8a932-f9f1-483b-9cf9-bb9a899e1a55",
            "tokenProvider":"UCOM",
            "tokenType":"CLAIM_CHECK_NONCE"
         }
      }
   }
}
```
 
**<ins> Sample Request (with merchantid) </ins>**

Sample Request - anonymous CC transaction using Nonce with merchantId 

```json
{
   "sale":{
      "orderId":"Order00122",
      "merchantId":"M017311360001",
      "requestedAmount":1,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "saveToVault":false,
         "token":{
            "tokenId":"bab8a932-f9f1-483b-9cf9-bb9a899e1a55",
            "tokenType":"CLAIM_CHECK_NONCE"
         }
      }
   }
}

```

**<ins> Sample Response (201 - Created) </ins>**

Sample Response - anonymous card sale transaction
```json

{
   "fdSaleId":"2651f121f7e64f90871fa25ee5921027",
   "status":"APPROVED",
   "orderId":"34548sdfdsfer769",
   "storeId":"KNOWN_STORE_ID",
   "requestedAmount":1,
   "approvedAmount":1,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "transactionDateTime":"2020-05-07T18:15:52-0400",
   "fundingSource":{
      "type":"CREDIT",
      "credit":{
         "nameOnCard":"John Smith",
         "alias":"1111",
         "cardType":"VISA",
         "billingAddress":{
            "streetAddress":"100 Universal City Plaza",
            "postalCode":"00000"
         },
         "expiryDate":{
            "month":"04",
            "year":"20"
         },
         "token":{
            "tokenId":"8973365013201111",
            "tokenProvider":"TRANS_ARMOR"
         }
      }
   },
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"ET144721"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"303417"
      }
   ]
}

```
