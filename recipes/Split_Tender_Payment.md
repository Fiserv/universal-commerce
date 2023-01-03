# How to Perform a split tender payment

<img title="icon" alt="Alt text" src="https://raw.githubusercontent.com/Fiserv/universal-commerce/94a71289848258b488fbd8b79e4ea9605ba656e5/assets/images/payment-method-svgrepo-com.svg" width="30" height="30">
This flow is used to support split payment. If the user wants to do partial payment, this flow guides how to do that.

Prerequisites for this flow:  Nonce token generation

## Option 1: Auth Flow

### Step 1: Auth Transaction

#### Description

This flow will do the pre authorize the transaction.

### Endpoint URL

HTTP Method: POST

Non-prod: https://int.api.firstdata.com/ucom/v1/payments/auths

Prod: https://prod.api.firstdata.com/ucom/v1/payments/auths

#### Parameters

| Entity Name     | Parent Entity Name | Data Type | Parameter Type | Required |
|-----------------|--------------------|-----------|----------------|----------|
| authorization   | N/A                | Object    | body           | Yes      |
| orderId         | authorization      | String    | body           | No       |
| merchantId      | authorization      | String    | body           | Yes      |
| requestedAmount | authorization      | String    | body           | Yes      |
| currencyCode    | authorization      | Object    | body           | No       |
| number          | currencyCode       | Number    | body           | No       |
| fundingSource   | authorization      | Object    | body           | Yes      |
| token           | fundingSource      | Object    | body           | Yes      |
| tokenId         | token              | String    | body           | Yes      |
| tokenType       | token              | String    | body           | Yes      |
| tokenProvider   | token              | String    | body           | Yes      |
| deviceInfo      | N/A                | Object    | Value          | Yes      |
| id              | deviceInfo         | String    | Value          | Yes      |
| kind            | deviceInfo         | String    | Value          | Yes      |
| details         | deviceInfo         | Object    | Value          | Yes      |
| provider        | details            | String    | Value          | Yes      |
| dataCapture     | details            | Object    | Value          | Yes      |
| rawData         | dataCapture        | String    | Value          | Yes      |
| dataEventId     | dataCapture        | String    | Value          | Yes      |
| captureTime     | dataCapture        | String    | Value          | No       |

#### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

Client-Token:{{tokenId}}

#### Sample Request - Authorization Transaction - Nonce
                                                                                        
```json

{
   "authorization":{
      "orderId":"12143243545467",
      "merchantId":"MO45009483002",
      "requestedAmount":1,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "saveToVault":false,
         "token":{
            "tokenId":"6c67fc73-b2dc-4e0b-a971-5aef623d69b2",
            "tokenType":"CLAIM_CHECK_NONCE",
            "tokenProvider":"UCOM"
         }
      }
   }
}

```

#### Sample Response (201 – Created)

Sample Response – Authorization Transaction - Nonce                                                                                                                                                                                                                                                     
```json

{
   "fdAuthorizationId":"24ea35f2d7ad40e0a95b80d723bf7529",
   "authStatus":"APPROVED",
   "orderId":"Test12341122222007772132",
   "requestedAmount":20,
   "approvedAmount":20,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "transactionDateTime":"2021-04-21T07:13:38-0400",
   "fundingSource":{
      "type":"CREDIT",
      "credit":{
         "nameOnCard":"John Smith",
         "alias":"0026",
         "cardType":"VISA",
         "billingAddress":{
            "streetAddress":"100 Universal City Plaza",
            "locality":"Hollywood",
            "region":"CA",
            "postalCode":"91608",
            "country":"US"
         },
         "expiryDate":{
            "month":"12",
            "year":"21"
         }
      }
   },
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"100945"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"612042"
      },
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"3"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"APPROVED 100945"
      },
      {
         "name":"HOST_AVS_CODE",
         "value":"AVS+Y"
      },
      {
         "name":"HOST_CVV_CODE",
         "value":"M"
      },
      {
         "name":"TRANSACTION_DATETIME",
         "value":"2021-04-21T06:13"
      },
      {
         "name":"NETWORK_TRANSACTION_ID",
         "value":"012000421111338"
      }
   ]
}

```

#### Sample Response (400 – Bad Request)

Sample Error Response       

```json
{
   "code":"272731",
   "message":"Auth transaction failed",
   "category":"payment",
   "developerInfo":{
      "developerMessage":"Auth transaction failed"
   },
   "hostExtraInfo":[
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"100"
      },
      {
         "name":"HOST_AVS_CODE",
         "value":"AVS-U"
      },
      {
         "name":"HOST_CVV_CODE",
         "value":"N"
      }
   ]
}


```

### Step 2: Capture the transaction

#### Description

This request will complete the transaction which has been pre-authorized.

#### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/auths/>{fdAuthorizationId}/captures

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/auths>/{fdAuthorizationId}/captures

\*Replace fdAuthorizationId with Auth transactionId.

#### Parameters

| Entity Name       | Parent Entity Name | Data Type | Parameter Type | Required |
|-------------------|--------------------|-----------|----------------|----------|
| capture           | N/A                | Object    | body           | Yes      |
| requestedAmount   | capture            | String    | body           | Yes      |
| currencyCode      | capture            | Object    | body           | No       |
| requestedAmount   | currencyCode       | String    | body           | No       |
| fdAuthorizationId | N/A                | String    | path           | Yes      |

#### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

#### Sample Request

Sample Request – Capture of Authorization                                      

```json

{
   "capture":{
      "requestedAmount":10,
      "currencyCode":{
         "number":840
      }
   }
}

```

#### Sample Response (200 – Created)

Sample Response – Capture of Authorization                                                                                                         

```json

{
   "fdCaptureId":"662c9b5c27ea4b3c9627dcf1035c4fa8",
   "status":"APPROVED",
   "requestedAmount":10,
   "approvedAmount":10,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "transactionDateTime":"2021-06-30T08:31:05-0400",
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"338162"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"321338"
      },
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"0"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"APPROVED 338162"
      },
      {
         "name":"TRANSACTION_DATETIME",
         "value":"2021-07-30T07:31"
      },
      {
         "name":"NETWORK_TRANSACTION_ID",
         "value":"123456789012345"
      }
   ]
}

```
#### Sample Response (400 – Bad Request)

Sample Error Response                                                                                                                               

```json
{
   "code":" 272761",
   "message":"Capture transaction failed.",
   "category":"common",
   "developerInfo":{
      "developerMessage":" Capture transaction failed."
   }
}

```

### Step 3: Refund the transaction

#### Description

This request will refund the transaction which has been completed.

#### Endpoint URL

HTTP Method: POST

Non-prod: https://int.api.firstdata.com/ucom/v1/payments/captures/%7BfdCaptureId%7D/refunds

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/>captures/{fdCaptureId}/refunds

\*Replace fdCaptureId with Capture transactionId .

#### Parameters

| Entity Name     | Parent Entity Name | Data Type | Parameter Type | Required |
|-----------------|--------------------|-----------|----------------|----------|
| refund          | N/A                | Object    | body           | Yes      |
| requestedAmount | refund             | String    | body           | Yes      |
| currencyCode    | refund             | Object    | body           | No       |
| requestedAmount | currencyCode       | String    | body           | No       |
| fdCaptureId     | N/A                | String    | path           | Yes      |

#### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

#### Sample Request

Sample Response – Partial Refund                                              

```json

{
   "refund":{
      "currencyCode":{
         "number":840
      },
      "requestedAmount":1
   }
}

```

#### Sample Response (200 – Created)

Sample Response – Refund of Capture 

```json

{
   "fdRefundId":"918ac166b1ab4146a8c7b17ab993e816",
   "status":"APPROVED",
   "requestedAmount":1.0,
   "approvedAmount":1.0,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "transactionDateTime":"2021-06-28T12:18:11-0400",
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"563212"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"728178"
      },
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"0"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"RETURN 563212"
      },
      {
         "name":"TRANSACTION_DATETIME",
         "value":"2021-06-28T12:18"
      },
      {
         "name":"NETWORK_TRANSACTION_ID",
         "value":"024000628161812"
      }
   ],
   "partialPaymentAllowed":true
}

```

## Option 2: Sale Flow

### Step 1: Sale Transaction

#### Description

This flow will do the sale transaction.

#### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/sales>

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/s>ales

#### Parameters

| Entity Name     | Parent Entity Name | Data Type | Parameter Type | Required |
|-----------------|--------------------|-----------|----------------|----------|
| sale            | N/A                | Object    | body           | Yes      |
| orderId         | sale               | String    | body           | No       |
| merchantId      | sale               | String    | body           | Yes      |
| requestedAmount | sale               | String    | body           | Yes      |
| currencyCode    | sale               | Object    | body           | No       |
| number          | currencyCode       | Number    | body           | No       |
| fundingSource   | sale               | Object    | body           | Yes      |
| token           | fundingSource      | Object    | body           | Yes      |
| tokenId         | token              | String    | body           | Yes      |
| tokenType       | token              | String    | body           | Yes      |
| tokenProvider   | token              | String    | body           | Yes      |
| deviceInfo      | N/A                | Object    | Value          | Yes      |
| id              | deviceInfo         | String    | Value          | Yes      |
| kind            | deviceInfo         | String    | Value          | Yes      |
| details         | deviceInfo         | Object    | Value          | Yes      |
| provider        | details            | String    | Value          | Yes      |
| dataCapture     | details            | Object    | Value          | Yes      |
| rawData         | dataCapture        | String    | Value          | No       |
| dataEventId     | dataCapture        | String    | Value          | Yes      |
| captureTime     | dataCapture        | String    | Value          | No       |

#### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

Client-Token:{{tokenId}}

#### Sample Request - Sale Transaction - Nonce

Sample Request – Sale Transaction - Nonce       

```json
{
   "sale":{
      "orderId":"12143243545467",
      "merchantId":"MO45009483002",
      "requestedAmount":20,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "saveToVault":false,
         "token":{
            "tokenId":"6c67fc73-b2dc-4e0b-a971-5aef623d69b2",
            "tokenType":"CLAIM_CHECK_NONCE",
            "tokenProvider":"UCOM"
         }
      }
   }
}

```
#### Sample Response (201 – Created)

Sample Response – Sale Transaction - Nonce  
```json

{
   "fdSaleId":"24ea35f2d7ad87e0a95b80d723bf7529",
   "status":"APPROVED",
   "orderId":"Test12341122222007772132",
   "requestedAmount":20,
   "approvedAmount":20,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "transactionDateTime":"2021-04-21T07:13:38-0400",
   "fundingSource":{
      "type":"CREDIT",
      "credit":{
         "nameOnCard":"John Smith",
         "alias":"0026",
         "cardType":"VISA",
         "billingAddress":{
            "streetAddress":"100 Universal City Plaza",
            "locality":"Hollywood",
            "region":"CA",
            "postalCode":"91608",
            "country":"US"
         },
         "expiryDate":{
            "month":"12",
            "year":"21"
         }
      }
   },
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"100945"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"612042"
      },
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"3"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"APPROVED 100945"
      },
      {
         "name":"HOST_AVS_CODE",
         "value":"AVS+Y"
      },
      {
         "name":"HOST_CVV_CODE",
         "value":"M"
      },
      {
         "name":"TRANSACTION_DATETIME",
         "value":"2021-04-21T06:13"
      },
      {
         "name":"NETWORK_TRANSACTION_ID",
         "value":"012000421111338"
      }
   ]
}

```

#### Sample Response (400 – Bad Request)

Sample Error Response

```json
{
   "code":"272701",
   "message":"Sale transaction failed",
   "category":"payment",
   "developerInfo":{
      "developerMessage":"Sale transaction failed"
   },
   "hostExtraInfo":[
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"4"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"APPROVED 093096"
      },
      {
         "name":"HOST_AVS_CODE",
         "value":"AVS+Y"
      }
   ]
}

```
### Step 2: Refund the transaction

#### Description

This request will refund of the sale transaction.

#### Endpoint URL

HTTP Method: POST

Non-prod: https://int.api.firstdata.com/ucom/v1/payments/sales/%7BfdSaleId%7D/refunds

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/>sales/{fdSaleId}/refunds

\*Replace fdSaleId with Sale transactionId .

#### Parameters

| Entity Name     | Parent Entity Name | Data Type | Parameter Type | Required |
|-----------------|--------------------|-----------|----------------|----------|
| refund          | N/A                | Object    | body           | Yes      |
| requestedAmount | refund             | String    | body           | Yes      |
| currencyCode    | refund             | Object    | body           | No       |
| requestedAmount | currencyCode       | String    | body           | No       |
| fdSaleId        | N/A                | String    | path           | Yes      |

#### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

#### Sample Request

Sample Response – Partial Refund    

```json

{
   "refund":{
      "currencyCode":{
         "number":840
      },
      "requestedAmount":5
   }
}

```

#### Sample Response (200 – Created)

Sample Response – Refund of Sale 

```json
{
   "fdRefundId":"8bd1173e41ac4f13969036d0269221ec",
   "status":"APPROVED",
   "requestedAmount":5.0,
   "approvedAmount":5.0,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "transactionDateTime":"2021-06-28T12:18:11-0400",
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"563212"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"728178"
      },
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"0"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"RETURN 563212"
      },
      {
         "name":"TRANSACTION_DATETIME",
         "value":"2021-06-28T12:18"
      },
      {
         "name":"NETWORK_TRANSACTION_ID",
         "value":"024000628161812"
      }
   ],
   "partialPaymentAllowed":true
}

```
