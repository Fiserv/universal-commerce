# How to Issue a Refund

much like other platforms, refunds in uCom are possible for transactions that have settled already. Since uCom provides multiple ways of making a payment, there are multiple ways to perform a refund depending on the transaction type. For starters, for a sale transaction type, a sale ID is required to process a refund. Similarly, an auth/capture type of transcation will require a Capture ID.

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

## Refund of a Capture:

### POST /payments/captures/{fdCaptureId}/refunds

| **Name** | **Type** | **Parameter Type** | **Required** | **Max Length** |
| --- | --- | --- |
| fdCaptureId | String | path |yes|32|

<ins> Sample Request </ins>

```json

{
 "refund": {
 "currencyCode": {
 "number": 840
 },
 "requestedAmount": 1
 }
}


```

<ins>Sample Response (201 - Created)</ins>

```json
{
 "fdRefundId": "918ac166b1ab4146a8c7b17ab993e816",
 "status": "APPROVED",
 "requestedAmount": 1.0,
 "approvedAmount": 1.0,
 "currencyCode": {
 "code": "USD",
 "number": 840
 },
 "transactionDateTime": "2021-06-28T12:18:11-0400",
 "hostExtraInfo": [
 {
 "name": "APPROVAL_NUMBER",
 "value": "563212"
 },
 {
 "name": "SEQUENCE_NUMBER",
 "value": "728178"
 },
 {
 "name": "HOST_RESPONSE_CODE",
 "value": "0"
 },
 {
 "name": "HOST_RESPONSE_MESSAGE",
 "value": "RETURN 563212"
 },
 {
 "name": "TRANSACTION_DATETIME",
 "value": "2021-06-28T12:18"
 },
 {
 "name": "NETWORK_TRANSACTION_ID",
 "value": "024000628161812"
 }
 ]
} 

```
