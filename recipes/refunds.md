# How to issue a Refund

Just like with other platforms, refunds in uCom are possible for transactions that have settled already. Since uCom provides multiple ways of making a payment, there are multiple ways to perform a refund depending on the transaction type. For starters, for a sale transaction type, a sale ID is required to process a refund.

## Refund of a sale:

### POST /v1/payments/sales/{fdSaleId}/refunds

| **Name** | **Type** | **Parameter Type** | **Required** | **Max Length** |
| --- | --- | --- |
| fdSaleId | String | path |yes|32|

<ins> Sample Request </ins>

```json

{
"refund":{
"currencyCode":{
"number":840
},
"requestedAmount":500
}
}

```

<ins>Sample Response (201 - Created)</ins>

```json
{   
   "fdRefundId":"5b4cf9da15e0475eb9ef3bcea5734442",
   "status":"APPROVED",
   "requestedAmount":500,
   "approvedAmount":500,
   "currencyCode":{   
      "number":840
   },
   "transactionDateTime":"2017-10-04T21:49:21.94"
}

```
