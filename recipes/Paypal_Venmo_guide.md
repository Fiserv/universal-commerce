# How to do Guest Payment via Paypal/Venmo

<img title="Paypal" alt="Alt text" src="https://raw.githubusercontent.com/Fiserv/universal-commerce/94a71289848258b488fbd8b79e4ea9605ba656e5/assets/images/paypal-svgrepo-com.svg" width="30" height="30">
<img title="Venmo" alt="Alt text" src="https://raw.githubusercontent.com/Fiserv/universal-commerce/94a71289848258b488fbd8b79e4ea9605ba656e5/assets/images/venmo-svgrepo-com.svg" width="30" height="30">
This flow is used if the partner does not have vaulting support. The client generates the nonce from Paypal/Venmo and doing transaction with the nonce.

**Prerequisites:  Paypal/Venmo Nonce to be created**

## Option 1a: Auth with Paypal

### Description

This flow will do the pre auth transaction with paypal nonce.

### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/auths>

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/auths>

### Parameters

| Entity Name     | Parent Entity Name | Data Type | Parameter Type | Required |
|-----------------|--------------------|-----------|----------------|----------|
| authorization   | N/A                | Object    | body           | Yes      |
| orderId         | authorization      | String    | body           | No       |
| merchantId      | authorization      | String    | body           | Yes      |
| requestedAmount | authorization      | String    | body           | Yes      |
| currencyCode    | authorization      | Object    | body           | No       |
| number          | currencyCode       | Number    | body           | No       |
| fundingSource   | authorization      | Object    | body           | Yes      |
| paypal          | fundingSource      | Object    | body           | Yes      |
| payerId         | paypal             | String    | body           | Yes      |
| nonce           | paypal             | String    | body           | Yes      |
| deviceInfo      | N/A                | Object    | Value          | Yes      |
| id              | deviceInfo         | String    | Value          | Yes      |
| kind            | deviceInfo         | String    | Value          | Yes      |
| details         | deviceInfo         | Object    | Value          | Yes      |
| provider        | details            | String    | Value          | Yes      |
| dataCapture     | details            | Object    | Value          | Yes      |
| rawData         | dataCapture        | String    | Value          | Yes      |
| dataEventId     | dataCapture        | String    | Value          | Yes      |
| captureTime     | dataCapture        | String    | Value          | No       |

### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

### Sample Request - Paypal Authorization Transaction - Nonce
```json
{
   "authorization":{
      "orderId":"12345671189128",
      "merchantId":"MO45009483002",
      "requestedAmount":5,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "paypal":{
            "payerId":"LPLWNMTBWMFAY",
            "nonce":"23c2c321-9613-079f-5fa8-9d424d4e8030"
         }
      }
   },
   "deviceInfo":{
      "id":"896e6893-51a0-4d8b-aecc-dfcc9945e0e4",
      "kind":"mobile",
      "details":[
         {
            "provider":"PayPal",
            "dataCapture":{
               "rawData":"aaaaaXREUVZGRlFYaMV",
               "dataEventId":"66f021fb-c7f0-4271-ad68-f66944b71dfd",
               "captureTime":"2021-05-25T11:49:54.855Z"
            },
            "dataDynamic":{
               "captureTime":"2021-05-25T11:49:54.855Z"
            }
         }
      ]
   }
}
```

### Sample Response (201 – Created)

Sample Response – Paypal Authorization Transaction - Nonce    

```json
{
   "fdAuthorizationId":"7244e4d2aadd4202b3245d240c6f391b",
   "authStatus":"APPROVED",
   "orderId":"12345671189128",
   "outdoorSale":true,
   "requestedAmount":5,
   "approvedAmount":5,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "transactionDateTime":"2021-05-10T06:00:54-0400",
   "fundingSource":{
      "type":"PAYPAL",
      "paypal":{
         "token":{
            "tokenId":"7481631140129424",
            "tokenProvider":"TRANS_ARMOR",
            "expiryDate":{
               "month":"07",
               "year":"30"
            }
         }
      }
   },
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"256997"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"736308"
      },
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"2"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"APPROVED 256997"
      },
      {
         "name":"TRANSACTION_DATETIME",
         "value":"2021-05-10T06:00"
      },
      {
         "name":"NETWORK_TRANSACTION_ID",
         "value":"123456789012345"
      }
   ]
}
```

### Sample Response (400 – Bad Request)

| Sample Error Response   

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

## Option 1b: Capture the transaction

### Description

This request will complete the transaction which has been pre authorized.

### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/auths/>{fdAuthorizationId}/captures

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/auths>/{fdAuthorizationId}/captures

\*Replace fdAuthorizationId with Auth transactionId .

### Parameters

| Entity Name       | Parent Entity Name | Data Type | Parameter Type | Required |
|-------------------|--------------------|-----------|----------------|----------|
| capture           | N/A                | Object    | body           | Yes      |
| requestedAmount   | capture            | String    | body           | Yes      |
| currencyCode      | capture            | Object    | body           | No       |
| requestedAmount   | currencyCode       | String    | body           | No       |
| fdAuthorizationId | N/A                | String    | path           | Yes      |

### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

### Sample Request

```json
{
   "capture":{
      "requestedAmount":5,
      "currencyCode":{
         "number":840
      }
   }
}
```

### Sample Response (200 – Created)

Sample Response – Capture of Authorization  

```json
{
   "fdCaptureId":"662c9b5c27ea4b3c9627dcf1035c4fa8",
   "status":"APPROVED",
   "requestedAmount":5,
   "approvedAmount":5,
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

### Sample Response (400 – Bad Request)

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

## Option 2: Sale with Paypal

### Description

This flow will do the sale transaction with paypal nonce.

### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/sales>

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/s>ales

### Parameters

| Entity Name     | Parent Entity Name | Data Type | Parameter Type | Required |
|-----------------|--------------------|-----------|----------------|----------|
| sale            | N/A                | Object    | body           | Yes      |
| orderId         | sale               | String    | body           | No       |
| merchantId      | sale               | String    | body           | Yes      |
| requestedAmount | sale               | String    | body           | Yes      |
| currencyCode    | sale               | Object    | body           | No       |
| number          | currencyCode       | Number    | body           | No       |
| fundingSource   | sale               | Object    | body           | Yes      |
| paypal          | fundingSource      | Object    | body           | Yes      |
| payerId         | paypal             | String    | body           | Yes      |
| nonce           | paypal             | String    | body           | Yes      |
| deviceInfo      | N/A                | Object    | Value          | Yes      |
| id              | deviceInfo         | String    | Value          | Yes      |
| kind            | deviceInfo         | String    | Value          | Yes      |
| details         | deviceInfo         | Object    | Value          | Yes      |
| provider        | details            | String    | Value          | Yes      |
| dataCapture     | details            | Object    | Value          | Yes      |
| rawData         | dataCapture        | String    | Value          | Yes      |
| dataEventId     | dataCapture        | String    | Value          | Yes      |
| captureTime     | dataCapture        | String    | Value          | No       |

### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

### Sample Request - Paypal Sale Transaction - Nonce

Sample Request – Paypal Sale Transaction - Nonce    
```json
{
   "sale":{
      "orderId":"12345671189128",
      "merchantId":"MO45009483002",
      "requestedAmount":5,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "paypal":{
            "payerId":"LPLWNMTBWMFAY",
            "nonce":"23c2c321-9613-079f-5fa8-9d424d4e8030"
         }
      }
   },
   "deviceInfo":{
      "id":"896e6893-51a0-4d8b-aecc-dfcc9945e0e4",
      "kind":"mobile",
      "details":[
         {
            "provider":"PayPal",
            "dataCapture":{
               "rawData":"aaaaaXREUVZGRlFYaMV",
               "dataEventId":"66f021fb-c7f0-4271-ad68-f66944b71dfd",
               "captureTime":"2021-05-25T11:49:54.855Z"
            },
            "dataDynamic":{
               "captureTime":"2021-05-25T11:49:54.855Z"
            }
         }
      ]
   }
}
```

### Sample Response (201 – Created)

Sample Response – Paypal Sale Transaction - Nonce
```json
{
   "fdSaleId":"7244e4d2aadd4202b3245d240c6f391b",
   "status":"APPROVED",
   "orderId":"12345671189128",
   "requestedAmount":5,
   "approvedAmount":5,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "partialPaymentAllowed":true,
   "transactionDateTime":"2021-05-10T06:00:54-0400",
   "fundingSource":{
      "type":"PAYPAL",
      "paypal":{
         "token":{
            "tokenId":"7481631140129424",
            "tokenProvider":"TRANS_ARMOR",
            "expiryDate":{
               "month":"07",
               "year":"30"
            }
         }
      }
   },
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"256997"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"736308"
      },
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"2"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"APPROVED 256997"
      },
      {
         "name":"TRANSACTION_DATETIME",
         "value":"2021-05-10T06:00"
      },
      {
         "name":"NETWORK_TRANSACTION_ID",
         "value":"123456789012345"
      }
   ]
}
```
### Sample Response (400 – Bad Request)

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
## Option 3a: Auth with Venmo

### Description

This flow will do the pre auth transaction with Venmo nonce.

### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/auths>

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/auths>

### Parameters

| Entity Name     | Parent Entity Name | Data Type | Parameter Type | Required           |
|-----------------|--------------------|-----------|----------------|--------------------|
| authorization   | N/A                | Object    | body           | Yes                |
| orderId         | authorization      | String    | body           | No                 |
| merchantId      | authorization      | String    | body           | Yes                |
| requestedAmount | authorization      | String    | body           | Yes                |
| currencyCode    | authorization      | Object    | body           | No                 |
| number          | currencyCode       | Number    | body           | No                 |
| fundingSource   | authorization      | Object    | body           | Yes                |
| venmo           | fundingSource      | Object    | body           | Yes                |
| nonce           | venmo              | String    | body           | Yes                |
| fdCustomerId    | N/A                | String    | body           | Yes (Only Vaulted) |
| vaultedAccount  | fundingSource      | Object    | body           | Yes (Only Vaulted) |
| fdAccountId     | vaultedAccount     | String    | body           | Yes (Only Vaulted) |
| deviceInfo      | N/A                | Object    | Value          | Yes                |
| id              | deviceInfo         | String    | Value          | Yes                |
| kind            | deviceInfo         | String    | Value          | Yes                |
| details         | deviceInfo         | Object    | Value          | Yes                |
| provider        | details            | String    | Value          | Yes                |
| dataCapture     | details            | Object    | Value          | Yes                |
| rawData         | dataCapture        | String    | Value          | Yes                |
| dataEventId     | dataCapture        | String    | Value          | Yes                |
| captureTime     | dataCapture        | String    | Value          | No                 |

### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

### Sample Request - Venmo Authorization Transaction - Nonce

Sample Request – Venmo Authorization Transaction - Nonce                                                                                                                                                                                                                                             
```json

{
   "authorization":{
      "orderId":"Ordermar19000012",
      "merchantId":"MO45009483002",
      "requestedAmount":10,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "saveToVault":false,
         "venmo":{
            "nonce":"fake-venmo-account-nonce"
         }
      }
   },
   "deviceInfo":{
      "id":"896e6893-51a0-4d8b-aecc-dfcc9945e0e4",
      "kind":"mobile",
      "details":[
         {
            "provider":"Venmo",
            "dataCapture":{
               "rawData":"aaaaaXREUVZGRlFYaMV",
               "dataEventId":"66f021fb-c7f0-4271-ad68-f66944b71dfd",
               "captureTime":"2021-05-25T11:49:54.855Z"
            },
            "dataDynamic":{
               "captureTime":"2021-05-25T11:49:54.855Z"
            }
         }
      ]
   }
}
```
### Sample Response (201 – Created)

Sample Response – Venmo Authorization Transaction - Nonce    
```json
{
   "fdAuthorizationId":"517b57799dd44edeb0c86c15e3cfc377",
   "authStatus":"APPROVED",
   "orderId":"Ordermar19000012",
   "requestedAmount":10,
   "approvedAmount":10,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "transactionDateTime":"2021-05-06T10:03:16-0400",
   "fundingSource":{
      "type":"VENMO",
      "venmo":{
         "token":{
            "tokenId":"7481631140129424",
            "tokenProvider":"TRANS_ARMOR",
            "expiryDate":{
               "month":"11",
               "year":"29"
            }
         }
      }
   },
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"252932"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"614480"
      },
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"2"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"APPROVED 252932"
      },
      {
         "name":"TRANSACTION_DATETIME",
         "value":"2021-05-06T10:03"
      },
      {
         "name":"NETWORK_TRANSACTION_ID",
         "value":"123456789012345"
      }
   ]
}
```

### Sample Response (400 – Bad Request)

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

## Option 3b: Capture the transaction

### Description

This request will complete the transaction which has been pre authorized.

### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/auths/>{fdAuthorizationId}/captures

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/auths>/{fdAuthorizationId}/captures

\*Replace fdAuthorizationId with Auth transactionId .

### Parameters

| Entity Name       | Parent Entity Name | Data Type | Parameter Type | Required |
|-------------------|--------------------|-----------|----------------|----------|
| capture           | N/A                | Object    | body           | Yes      |
| requestedAmount   | capture            | String    | body           | Yes      |
| currencyCode      | capture            | Object    | body           | No       |
| requestedAmount   | currencyCode       | String    | body           | No       |
| fdAuthorizationId | N/A                | String    | path           | Yes      |

### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

### Sample Request

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

### Sample Response (200 – Created)

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
### Sample Response (400 – Bad Request)

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

## Option 4: Sale with Venmo

### Description

This flow will do the sale transaction with Venmo nonce.

### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/sales>

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/s>ales

### Parameters

| Entity Name     | Parent Entity Name | Data Type | Parameter Type | Required           |
|-----------------|--------------------|-----------|----------------|--------------------|
| sale            | N/A                | Object    | body           | Yes                |
| orderId         | sale               | String    | body           | No                 |
| merchantId      | sale               | String    | body           | Yes                |
| requestedAmount | sale               | String    | body           | Yes                |
| currencyCode    | sale               | Object    | body           | No                 |
| number          | currencyCode       | Number    | body           | No                 |
| fundingSource   | sale               | Object    | body           | Yes                |
| venmo           | fundingSource      | Object    | body           | Yes                |
| nonce           | venmo              | String    | body           | Yes                |
| fdCustomerId    | N/A                | String    | body           | Yes (Only Vaulted) |
| vaultedAccount  | fundingSource      | Object    | body           | Yes (Only Vaulted) |
| fdAccountId     | vaultedAccount     | String    | body           | Yes (Only Vaulted) |
| deviceInfo      | N/A                | Object    | Value          | Yes                |
| id              | deviceInfo         | String    | Value          | Yes                |
| kind            | deviceInfo         | String    | Value          | Yes                |
| details         | deviceInfo         | Object    | Value          | Yes                |
| provider        | details            | String    | Value          | Yes                |
| dataCapture     | details            | Object    | Value          | Yes                |
| rawData         | dataCapture        | String    | Value          | Yes                |
| dataEventId     | dataCapture        | String    | Value          | Yes                |
| captureTime     | dataCapture        | String    | Value          | No                 |

### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

### Sample Request - Venmo Sale Transaction - Nonce

Sample Request – Venmo Sale Transaction - Nonce                                                                                                                     
```json
{
   "sale":{
      "orderId":"1234567890124",
      "merchantId":"MO45009483002",
      "requestedAmount":20,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "saveToVault":false,
         "venmo":{
            "nonce":"fake-venmo-account-nonce"
         }
      }
   },
   "deviceInfo":{
      "id":"896e6893-51a0-4d8b-aecc-dfcc9945e0e4",
      "kind":"mobile",
      "details":[
         {
            "provider":"Venmo",
            "dataCapture":{
               "rawData":"aaaaaXREUVZGRlFYaMV",
               "dataEventId":"66f021fb-c7f0-4271-ad68-f66944b71dfd",
               "captureTime":"2021-05-25T11:49:54.855Z"
            },
            "dataDynamic":{
               "captureTime":"2021-05-25T11:49:54.855Z"
            }
         }
      ]
   }
}
```
### Sample Response (201 – Created)

Sample Response –Venmo Sale Transaction - Nonce      
```json
{
   "fdSaleId":"8b16126b29e548c7bb14fe877fff88ac",
   "status":"APPROVED",
   "orderId":"1234567890124",
   "requestedAmount":20,
   "approvedAmount":20,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "partialPaymentAllowed":true,
   "transactionDateTime":"2021-05-24T08:19:07-0400",
   "fundingSource":{
      "type":"VAULTED_ACCOUNT",
      "vaultedAccount":{
         "fdAccountId":"8a7f0d8c798e7cf701799e4c81d10821",
         "type":"VENMO"
      },
      "venmo":{
         "token":{
            "tokenId":"7481631140129424",
            "tokenProvider":"TRANS_ARMOR",
            "expiryDate":{
               "month":"08",
               "year":"30"
            }
         }
      }
   },
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"269482"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"264745"
      },
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"2"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"APPROVED 269482"
      },
      {
         "name":"TRANSACTION_DATETIME",
         "value":"2021-05-24T08:19"
      },
      {
         "name":"NETWORK_TRANSACTION_ID",
         "value":"123456789012345"
      }
   ]
}

```

### Sample Response (400 – Bad Request)

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

### HTTP Headers

| Header Name       | Required      | Description                                                                                                                                                                                                                                                                   |
|-------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Api-Key           | Yes           | Merchant API key                                                                                                                                                                                                                                                              |
| Timestamp         | Yes           | Request initiation UTC timestamp, formatted as Epoch time. The value is in milliseconds.  Sample value format is 1499961987232                                                                                                                                                |
| Authorization     | Yes           | Authorization header is required to have the "HMAC" string capitalized and followed by one space followed by the calculated hmac signature.  When using the /account-tokens API: **Authorization**: - Bearer \<tokenId\> \*Utilizes the tokenId returned from the /tokens api |
| Client-Request-Id | Yes           | Contains a unique ID generated by the client that is used for enforcing idempotency on POST actions.                                                                                                                                                                          |
| Content-Type      | Yes           | application/json                                                                                                                                                                                                                                                              |
| access_token      | Conditionally | Required when vaulting payment information. Utilizes the tokenId returned from the /tokens api.                                                                                                                                                                               |

#### Sample Header

| Sample Format and Values                                                                                                                                                                                                                                                                                                                                                                                           |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Content-Type:application/json Api-Key:{{key}} Timestamp:{{time}} Client-Request-Id: {{\$guid}} Authorization:HMAC {{signature}} access_token: {{tokenId}}  Content-Type: application/json Api-Key: pnQgbD4jjfp5Gu2eqA1i4VnzZtT9mW5I Timestamp: 1501621439636 Client-Request-Id: abded-12345-ddcce-4r45t Authorization:HMAC W5X9NAlPgSNsfQX55fXbXrk3arzL6KxcCTA6SrnxL+U= access_token: SPaAADBdzaMbmR7RU7QdftIFLGIa |


# How to do Vaulted Payment via Paypal/Venmo

Please use this flow if vaulting is enabled through uCom. The client generates a nonce from Paypal/Venmo and then does vaulting with Paypal/Venmo nonce, then preform the transaction with vaulted account.

## Step 1: Create a Customer

### Description

This request will create a customer for card vaulting or payment purposes. This is always the first step that needs to be taken to do vaulting an account in the ucom.

The client sends the externalId field (unique identifier) for this customer and ucom generate fdCustomerId and send it in the response to the client.

### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/customers>

Prod: <https://prod.api.firstdata.com/ucom/v1/customers>

### Parameters

| Entity Name  | Parent Entity Name | Data Type | Parameter Type | Required |
|--------------|--------------------|-----------|----------------|----------|
| customer     | N/A                | Object    | body           | Yes      |
| externalId   | customer           | String    | body           | Yes      |
| name         | customer           | Object    | body           | No       |
| familyName   | name               | String    | body           | No       |
| givenName    | name               | String    | body           | No       |
| middleName   | name               | String    | body           | No       |
| nickName     | customer           | String    | body           | No       |
| emails       | customer           | Object    | body           | No       |
| value        | emails             | String    | body           | No       |
| primary      | emails             | Boolean   | body           | No       |
| phoneNumbers | customer           | Object    | body           | No       |
| value        | phoneNumbers       | String    | body           | No       |
| type         | phoneNumbers       | String    | body           | No       |

### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

### Sample Request - Minimum Passed Params

```json

{
   "customer":{
      "externalId":"123abc456def890ghi098jkl765mno"
   }
}

```

### Sample Request – Customer profile creation

```json
{
   "customer":{
      "externalId":"123abc456def890ghi098jkl765mno",
      "name":{
         "familyName":"Jensen",
         "givenName":"Barbara",
         "middleName":"Jane"
      },
      "displayName":"Babs Jensen",
      "nickName":"Babs",
      "emails":[
         {
            "value":"bjensen@example.com",
            "type":"work",
            "primary":true
         }
      ],
      "addresses":[
         {
            "streetAddress":"100 Universal City Plaza",
            "locality":"Hollywood",
            "region":"CA",
            "postalCode":"91608",
            "country":"US"
         }
      ],
      "phoneNumbers":[
         {
            "value":"1876543210",
            "type":"mobile",
            "primary":true
         }
      ]
   }
}
```
### Sample Response (201 – Created)
```json
{
   "id":"a077e1383a334b4bb032b1358f2288cd",
   "externalId":"extCustomerId5187841"
}

```

### Sample Response (400 – Bad Request)

Sample Error Response                                                                                                                                                                                                                                                    |
```json
{
   "code":"269902",
   "message":" Invalid request format/data.",
   "category":"common",
   "developerInfo":{
      "developerMessage":" Invalid request format/data.",
      "fieldError":[
         {
            "field":" customer.externalId",
            "message":"externalId is required"
         }
      ]
   }
}

```

## Step 2: Vault a Payment Method

### Option 1: Account Enrollment - Paypal Nonce

#### Description

This request will create a vaulted account in ucom.

#### Endpoint URL

HTTP Method: POST

Non-prod: [https://int.api.firstdata.com/ucom/v1/customers/%7BfdCustomerId%7D/accounts](https://int.api.firstdata.com/ucom/v1/customers)

Prod: [https://prod.api.firstdata.com/ucom/v1/customers/%7BfdCustomerId%7D/accounts](https://prod.api.firstdata.com/ucom/v1/customers)

#### Parameters

| Entity Name  | Parent Entity Name | Data Type | Parameter Type | Required |
|--------------|--------------------|-----------|----------------|----------|
| account      | N/A                | Object    | body           | Yes      |
| paypal       | account            | Object    | body           | Yes      |
| payerId      | paypal             | String    | body           | Yes      |
| nonce        | paypal             | String    | body           | Yes      |
| fdCustomerId | N/A                | String    | path           | Yes      |
| deviceInfo   | N/A                | Object    | Value          | Yes      |
| id           | deviceInfo         | String    | Value          | Yes      |
| kind         | deviceInfo         | String    | Value          | Yes      |
| details      | deviceInfo         | Object    | Value          | Yes      |
| provider     | details            | String    | Value          | Yes      |
| dataCapture  | details            | Object    | Value          | Yes      |
| rawData      | dataCapture        | String    | Value          | Yes      |
| dataEventId  | dataCapture        | String    | Value          | Yes      |
| captureTime  | dataCapture        | String    | Value          | No       |

#### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

#### Sample Request – Paypal Nonce

```json
{
   "account":{
      "paypal":{
         "payerId":"LPLWNMTBWMFAY",
         "nonce":"4a7f1f84-1c8f-043d-56f9-68df0487f747"
      }
   },
   "deviceInfo":{
      "id":"896e6893-51a0-4d8b-aecc-dfcc9945e0e4",
      "kind":"mobile",
      "details":[
         {
            "provider":"Paypal",
            "dataCapture":{
               "rawData":"aaaaaXREUVZGRlFYaMV",
               "dataEventId":"66f021fb-c7f0-4271-ad68-f66944b71dfd",
               "captureTime":"2021-05-25T11:49:54.855Z"
            },
            "dataDynamic":{
               "captureTime":"2021-05-25T11:49:54.855Z"
            }
         }
      ]
   }
}
```

#### Sample Response (201 – Created)

Sample Response – Paypal Nonce    
```json
{
   "fdAccountId":"8a7f3353790bb3c2017941ed5e060cbd",
   "type":"PAYPAL",
   "status":"ACTIVE"
}

```
#### Sample Response (400 – Bad Request)

Sample Error Response   

```json
{
   "code":"269902",
   "message":"Invalid request format/data.",
   "category":"common",
   "developerInfo":{
      "developerMessage":"Invalid request format/data.",
      "fieldError":[
         {
            "field":"Invalid fdCustomerId/deviceId",
            "message":"fdCustomerId/deviceId is required."
         }
      ]
   }
}

```
### Option 2: Account Enrollment - Venmo Nonce

#### Description

This request will create a vaulted account in ucom.

#### Endpoint URL

HTTP Method: POST

Non-prod: [https://int.api.firstdata.com/ucom/v1/customers/%7BfdCustomerId%7D/accounts](https://int.api.firstdata.com/ucom/v1/customers)

Prod: [https://prod.api.firstdata.com/ucom/v1/customers/%7BfdCustomerId%7D/accounts](https://prod.api.firstdata.com/ucom/v1/customers)

#### Parameters

| Entity Name  | Parent Entity Name | Data Type | Parameter Type | Required |
|--------------|--------------------|-----------|----------------|----------|
| account      | N/A                | Object    | body           | Yes      |
| venmo        | account            | Object    | body           | Yes      |
| nonce        | venmo              | String    | body           | Yes      |
| fdCustomerId | N/A                | String    | path           | Yes      |
| deviceInfo   | N/A                | Object    | Value          | Yes      |
| id           | deviceInfo         | String    | Value          | Yes      |
| kind         | deviceInfo         | String    | Value          | Yes      |
| details      | deviceInfo         | Object    | Value          | Yes      |
| provider     | details            | String    | Value          | Yes      |
| dataCapture  | details            | Object    | Value          | Yes      |
| rawData      | dataCapture        | String    | Value          | Yes      |
| dataEventId  | dataCapture        | String    | Value          | Yes      |
| captureTime  | dataCapture        | String    | Value          | No       |

#### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

#### Sample Request – Venmo Nonce

```json
{
   "account":{
      "venmo":{
         "nonce":"fake-venmo-account-nonce"
      }
   },
   "deviceInfo":{
      "id":"896e6893-51a0-4d8b-aecc-dfcc9945e0e4",
      "kind":"mobile",
      "details":[
         {
            "provider":"Venmo",
            "dataCapture":{
               "rawData":"aaaaaXREUVZGRlFYaMV",
               "dataEventId":"66f021fb-c7f0-4271-ad68-f66944b71dfd",
               "captureTime":"2021-05-25T11:49:54.855Z"
            },
            "dataDynamic":{
               "captureTime":"2021-05-25T11:49:54.855Z"
            }
         }
      ]
   }
}

```



#### Sample Response (201 – Created)

Sample Response – Venmo Nonce                                                               
```json
{
   "fdAccountId":"8a7f0d8c798e7cf701799e4c81d10821",
   "type":"VENMO",
   "status":"ACTIVE"
}

```
#### Sample Response (400 – Bad Request)

Sample Error Response      

```json
{
   "code":"269902",
   "message":"Invalid request format/data.",
   "category":"common",
   "developerInfo":{
      "developerMessage":"Invalid request format/data.",
      "fieldError":[
         {
            "field":"Invalid fdCustomerId/deviceId",
            "message":"fdCustomerId/deviceId is required."
         }
      ]
   }
}

```
## Step 3: Make a Payment with Vaulted Account

### Option 1a: Auth with Paypal

#### Description

This flow will do the pre auth transaction with a paypal nonce.

#### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/auths>

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/auths>

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
| fdCustomerId    | N/A                | String    | body           | Yes      |
| vaultedAccount  | fundingSource      | Object    | body           | Yes      |
| fdAccountId     | vaultedAccount     | String    | body           | Yes      |
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

#### Sample Request - Paypal Authorization Transaction - Vaulted

Sample Request – Paypal Authorization Transaction - Vaulted   

```json
{
   "fdCustomerId":"f18041b21ae04dee9a00e8289ed262a4",
   "authorization":{
      "orderId":"12345671189123",
      "merchantId":"MO45009483002",
      "requestedAmount":5,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "vaultedAccount":{
            "fdAccountId":"8a7f3353790bb3c2017941ed5e060cbd"
         }
      }
   },
   "deviceInfo":{
      "id":"896e6893-51a0-4d8b-aecc-dfcc9945e0e4",
      "kind":"mobile",
      "details":[
         {
            "provider":"PayPal",
            "dataCapture":{
               "rawData":"aaaaaXREUVZGRlFYaMV",
               "dataEventId":"66f021fb-c7f0-4271-ad68-f66944b71dfd",
               "captureTime":"2021-05-25T11:49:54.855Z"
            },
            "dataDynamic":{
               "captureTime":"2021-05-25T11:49:54.855Z"
            }
         }
      ]
   }
}

```

#### Sample Response (201 – Created)

Sample Response – Paypal Authorization Transaction - Vaulted 
```json
{
   "fdAuthorizationId":"00fa2f9401fa4b6e841ae91d03960526",
   "authStatus":"APPROVED",
   "orderId":"12345671189123",
   "requestedAmount":5,
   "approvedAmount":5,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "transactionDateTime":"2021-05-06T09:58:58-0400",
   "fundingSource":{
      "type":"VAULTED_ACCOUNT",
      "vaultedAccount":{
         "fdAccountId":"8a7f3353790bb3c2017941ed5e060cbd",
         "type":"PAYPAL"
      },
      "paypal":{
         "token":{
            "tokenId":"7481631140129424",
            "tokenProvider":"TRANS_ARMOR",
            "expiryDate":{
               "month":"11",
               "year":"29"
            }
         },
         "billingAgreementId":"B_FAKE_ID-a3ae"
      }
   },
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"252998"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"525638"
      },
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"2"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"APPROVED 252998"
      },
      {
         "name":"TRANSACTION_DATETIME",
         "value":"2021-05-06T09:58"
      },
      {
         "name":"NETWORK_TRANSACTION_ID",
         "value":"123456789012345"
      }
   ]
}

```


#### Sample Response (400 – Bad Request)

Sample Error Response                                                                                                                                                                                                                                                                                                                      |
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

### Option 1b: Capture the transaction

#### Description

This request will complete the transaction which has been pre-authorized.

#### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/auths/>{fdAuthorizationId}/captures

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/auths>/{fdAuthorizationId}/captures

\*Replace fdAuthorizationId with Auth transactionId .

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

Sample Response – Capture of Authorization                                       

```json
{
   "fdCaptureId":"662c9b5c27ea4b3c9627dcf1035c4fa8",
   "status":"APPROVED",
   "requestedAmount":20,
   "approvedAmount":20,
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

#### Sample Response (200 – Created)

Sample Response – Capture of Authorization      

```json
{
   "fdCaptureId":"662c9b5c27ea4b3c9627dcf1035c4fa8",
   "status":"APPROVED",
   "requestedAmount":20,
   "approvedAmount":20,
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

### Option 2: Sale with Paypal

#### Description

This flow will do the pre auth transaction with paypal nonce.

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
| fdCustomerId    | N/A                | String    | body           | Yes      |
| vaultedAccount  | fundingSource      | Object    | body           | Yes      |
| fdAccountId     | vaultedAccount     | String    | body           | Yes      |
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

#### Sample Request - Paypal Sale Transaction - Vaulted

Sample Request – Paypal Sale Transaction - Vaulted
```json

{
   "fdCustomerId":"f18041b21ae04dee9a00e8289ed262a4",
   "sale":{
      "orderId":"12345671189123",
      "merchantId":"MO45009483002",
      "requestedAmount":5,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "vaultedAccount":{
            "fdAccountId":"8a7f3353790bb3c2017941ed5e060cbd"
         }
      }
   },
   "deviceInfo":{
      "id":"896e6893-51a0-4d8b-aecc-dfcc9945e0e4",
      "kind":"mobile",
      "details":[
         {
            "provider":"PayPal",
            "dataCapture":{
               "rawData":"aaaaaXREUVZGRlFYaMV",
               "dataEventId":"66f021fb-c7f0-4271-ad68-f66944b71dfd",
               "captureTime":"2021-05-25T11:49:54.855Z"
            },
            "dataDynamic":{
               "captureTime":"2021-05-25T11:49:54.855Z"
            }
         }
      ]
   }
}
```

#### Sample Response (201 – Created)

Sample Response – Paypal Sale Transaction - Vaulted    

```json
{
   "fdSaleId":"8b16126b29e548c7bb14fe877fff88ac",
   "status":"APPROVED",
   "orderId":"1234567890124",
   "requestedAmount":5,
   "approvedAmount":5,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "partialPaymentAllowed":true,
   "transactionDateTime":"2021-05-24T08:19:07-0400",
   "fundingSource":{
      "type":"VAULTED_ACCOUNT",
      "vaultedAccount":{
         "fdAccountId":"8a7f0d8c798e7cf701799e4c81d10821",
         "type":"VENMO"
      },
      "venmo":{
         "token":{
            "tokenId":"7481631140129424",
            "tokenProvider":"TRANS_ARMOR",
            "expiryDate":{
               "month":"08",
               "year":"30"
            }
         }
      }
   },
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"269482"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"264745"
      },
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"2"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"APPROVED 269482"
      },
      {
         "name":"TRANSACTION_DATETIME",
         "value":"2021-05-24T08:19"
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
### Option 3a: Auth with Venmo

#### Description

This flow will do the pre auth transaction with Venmo nonce.

#### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/auths>

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/auths>

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
| fdCustomerId    | N/A                | String    | body           | Yes      |
| vaultedAccount  | fundingSource      | Object    | body           | Yes      |
| fdAccountId     | vaultedAccount     | String    | body           | Yes      |
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

#### Sample Request - Venmo Authorization Transaction - Vaulted

Sample Request – Venmo Authorization Transaction - Vaulted                                                                                                             

```json

{
   "fdCustomerId":"f18041b21ae04dee9a00e8289ed262a4",
   "authorization":{
      "orderId":"12345671189123",
      "merchantId":"MO45009483002",
      "requestedAmount":5,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "vaultedAccount":{
            "fdAccountId":"8a7f3353790bb3c2017941ed5e060cbd"
         }
      }
   },
   "deviceInfo":{
      "id":"896e6893-51a0-4d8b-aecc-dfcc9945e0e4",
      "kind":"mobile",
      "details":[
         {
            "provider":"PayPal",
            "dataCapture":{
               "rawData":"aaaaaXREUVZGRlFYaMV",
               "dataEventId":"66f021fb-c7f0-4271-ad68-f66944b71dfd",
               "captureTime":"2021-05-25T11:49:54.855Z"
            },
            "dataDynamic":{
               "captureTime":"2021-05-25T11:49:54.855Z"
            }
         }
      ]
   }
}
```

#### Sample Response (201 – Created)

Sample Response – Venmo Authorization Transaction - Vaulted  

```json
{
   "fdAuthorizationId":"8b16126b29e548c7bb14feb87fff88ac",
   "authStatus":"APPROVED",
   "orderId":"1234567890124",
   "requestedAmount":5,
   "approvedAmount":5,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "transactionDateTime":"2021-05-24T08:19:07-0400",
   "fundingSource":{
      "type":"VAULTED_ACCOUNT",
      "vaultedAccount":{
         "fdAccountId":"8a7f0d8c798e7cf701799e4c81d10821",
         "type":"VENMO"
      },
      "venmo":{
         "token":{
            "tokenId":"7481631140129424",
            "tokenProvider":"TRANS_ARMOR",
            "expiryDate":{
               "month":"08",
               "year":"30"
            }
         }
      }
   },
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"269482"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"264745"
      },
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"2"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"APPROVED 269482"
      },
      {
         "name":"TRANSACTION_DATETIME",
         "value":"2021-05-24T08:19"
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

### Option 3b: Capture the transaction

#### Description

This request will complete the transaction which has been pre authorized.

#### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/auths/>{fdAuthorizationId}/captures

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/auths>/{fdAuthorizationId}/captures

\*Replace fdAuthorizationId with Auth transactionId .

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
      "requestedAmount":5,
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
   "requestedAmount":5,
   "approvedAmount":5,
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

Sample Error Response                                                                                                                                           |

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

### Option 4: Sale with Venmo

#### Description

This flow will preform a sale transaction with a Venmo nonce.

#### Endpoint URL

HTTP Method: POST

Non-prod: <https://int.api.firstdata.com/ucom/v1/payments/sales>

Prod: <https://prod.api.firstdata.com/ucom/v1/payments/s>ales

#### Parameters

| Entity Name     | Parent Entity Name | Data Type | Parameter Type | Required           |
|-----------------|--------------------|-----------|----------------|--------------------|
| sale            | N/A                | Object    | body           | Yes                |
| orderId         | sale               | String    | body           | No                 |
| merchantId      | sale               | String    | body           | Yes                |
| requestedAmount | sale               | String    | body           | Yes                |
| currencyCode    | sale               | Object    | body           | No                 |
| number          | currencyCode       | Number    | body           | No                 |
| fundingSource   | sale               | Object    | body           | Yes                |
| venmo           | fundingSource      | Object    | body           | Yes                |
| nonce           | venmo              | String    | body           | Yes                |
| fdCustomerId    | N/A                | String    | body           | Yes (Only Vaulted) |
| vaultedAccount  | fundingSource      | Object    | body           | Yes (Only Vaulted) |
| fdAccountId     | vaultedAccount     | String    | body           | Yes (Only Vaulted) |
| deviceInfo      | N/A                | Object    | Value          | Yes                |
| id              | deviceInfo         | String    | Value          | Yes                |
| kind            | deviceInfo         | String    | Value          | Yes                |
| details         | deviceInfo         | Object    | Value          | Yes                |
| provider        | details            | String    | Value          | Yes                |
| dataCapture     | details            | Object    | Value          | Yes                |
| rawData         | dataCapture        | String    | Value          | Yes                |
| dataEventId     | dataCapture        | String    | Value          | Yes                |
| captureTime     | dataCapture        | String    | Value          | No                 |

#### Headers

Content-Type:application/json

Client-Request-Id:{{\$guid}}

Api-Key:{{clientKey}}

Authorization:HMAC {{signature}}

Timestamp:{{time}}

#### Sample Request - Venmo Sale Transaction - Vaulted

Sample Request – Venmo Sale Transaction - Vaulted
```json

{
   "fdCustomerId":"f18041b21ae04dee9a00e8289ed262a4",
   "sale":{
      "orderId":"12345671189123",
      "merchantId":"MO45009483002",
      "requestedAmount":5,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "vaultedAccount":{
            "fdAccountId":"8a7f3353790bb3c2017941ed5e060cbd"
         }
      }
   },
   "deviceInfo":{
      "id":"896e6893-51a0-4d8b-aecc-dfcc9945e0e4",
      "kind":"mobile",
      "details":[
         {
            "provider":"Venmo",
            "dataCapture":{
               "rawData":"aaaaaXREUVZGRlFYaMV",
               "dataEventId":"66f021fb-c7f0-4271-ad68-f66944b71dfd",
               "captureTime":"2021-05-25T11:49:54.855Z"
            },
            "dataDynamic":{
               "captureTime":"2021-05-25T11:49:54.855Z"
            }
         }
      ]
   }
}

```

#### Sample Response (201 – Created)

Sample Response – Venmo Sale Transaction - Vaulted     

```json

{
   "fdSaleId":"8b16126b29e548c7bb14fe877fff88ac",
   "status":"APPROVED",
   "orderId":"1234567890124",
   "requestedAmount":20,
   "approvedAmount":20,
   "currencyCode":{
      "code":"USD",
      "number":840
   },
   "partialPaymentAllowed":true,
   "transactionDateTime":"2021-05-24T08:19:07-0400",
   "fundingSource":{
      "type":"VAULTED_ACCOUNT",
      "vaultedAccount":{
         "fdAccountId":"8a7f0d8c798e7cf701799e4c81d10821",
         "type":"VENMO"
      },
      "venmo":{
         "token":{
            "tokenId":"7481631140129424",
            "tokenProvider":"TRANS_ARMOR",
            "expiryDate":{
               "month":"08",
               "year":"30"
            }
         }
      }
   },
   "hostExtraInfo":[
      {
         "name":"APPROVAL_NUMBER",
         "value":"269482"
      },
      {
         "name":"SEQUENCE_NUMBER",
         "value":"264745"
      },
      {
         "name":"HOST_RESPONSE_CODE",
         "value":"2"
      },
      {
         "name":"HOST_RESPONSE_MESSAGE",
         "value":"APPROVED 269482"
      },
      {
         "name":"TRANSACTION_DATETIME",
         "value":"2021-05-24T08:19"
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

