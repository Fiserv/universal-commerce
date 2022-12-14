<html>
<head>
<title>Implementation Guide</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style type="text/css">
.s0 { color: #8c8c8c; font-style: italic;}
.s1 { color: #080808;}
.s2 { color: #080808;}
.s3 { color: #0033b3;}
.ln { color: #adadad; font-weight: Bold; font-style: normal; }
</style>
</head>
<body bgcolor="#ffffff">
<table CELLSPACING=0 CELLPADDING=5 COLS=1 WIDTH="100%" BGCOLOR="#c0c0c0" >
<tr><td><center>
<font face="Arial, Helvetica" color="#000000">
Implementation Guide - Sample Spec Document</font>
</center></td></tr></table>

# Sandbox Implementation Guide
<a name=headinsttuction><span class="ln"> 
Here is how to utilize this guide. All your necessary steps are on your right and will guide you through the necessary steps to create a customer and start processing payments in universal commerce</span>

## **Customer Setup**
[Customer services steps](?path=/reference/1.0.0/Customer%20Services/customerservices.yaml)

### Step 1: Create a Customer Profile
to-do - is this really step one or is this something 

<a name="Customer Profile1"><span class="ln"></span></a><span class="s1"></span><span class="s2">Parameters</span>


| Name     | Data Type | Parameter Type| Required  | Max Length |
|:----------|:---------:|:----------:|:-----:| ----:|
|externalID |string     |body        | yes   | 50   |

<a name="Customer Profile2"><span class="ln"></span></a><span class="s1"></span><span class="s2">Request</span>
```json
  {
    "customer": {
      "externalId": "513306228"
    }
}
```


### Step 2: Something
### Step 3: Something


<a name="Customer Profile3"><span class="ln"></span></a><span class="s1"></span><span class="s2">Customer Creation Full AVS(Optional)</span>

<div id="copy_button"></div>
<script src="/docs/documentation/copybutton.js"</script>
```json
{
    "customer": {
      "externalId": "123abc456def890ghi098jkl765mno", 
      "name": {
       "familyName": "Jensen",
       "givenName": "Barbara",
       "middleName": "Jane"
      },
      "displayName": "Babs Jensen", 
      "nickName": "Babs", 
      "emails": [
       {
          "value": "bjensen@example.com",
          "primary": true
          }
      ],
      "addresses": [
    {
      "streetAddress": "100 Universal City Plaza", 
      "locality": "Hollywood",
      "region": "CA",
      "postalCode": "91608",
      "country": "US"
        }
      ],
      "phoneNumbers": [
        {
          "value": "555-555-5555",
          "type": "work"
         } 
      ]
   }
}
```

## Sample Formats

### Sample Format and Values (No nonce in payload)
```json
Content-Type: application/json
Api-Key: pAhDVh6ALjje4zja5W24PlhvL3A3mJSA
Authorization: HMAC yMHQiDA2qHVy1t/WX3AdvQawoIWH5m/o3/dIit40rY= Timestamp: 1501621439636
Client-Request-Id: 123445241
```
### Sample Format and Values Sample Format and Values (Nonce in payload)
```json
Content-Type:application/json Api-Key:{{key}} Authorization:HMAC {{signature}} Timestamp:{{time}} Client-Request-Id:{{$guid}} Client-Token: {{tokenId}}
Content-Type: application/json
Api-Key: pAhDVh6ALjje4zja5W24PlhvL3A3mJSA
Authorization: HMAC yMHQiDA2qHVy1t/WX3AdvQawoIWH5m/o3/dIit40rY= Timestamp: 1501621439636
Client-Request-Id: 123445241
Client-Token: e3W0jHqpuutK6vwtlOt80GWvwBI0
```
## Security
### API Security
<a name="l33"><span class="ln"></span></a><span class="s1"></span><span class="s2">Please see the reference document for current implementation. Please note that it is subject to change and the below link shall be updated with relevant details. </span>


<a name="Reference Link"><span class="ln"></span></a><span class="s1"></span><span class="s2"> [API Security Link](https://firstdatanp-ucomgateway.apigee.io/get-started/api-security) </span>
<a name="blank line"><span class="ln"></span></a>

<a name="blank line"><span class="ln"></span></a>


<a name="blank line"><span class="ln"></span></a>
## Security for Wallet Notification
<a name="Wallet Security"><span class="ln"></span></a><span class="s1"></span><span class="s2"> [Security for Wallet Link](https://firstdatanp-ucomgateway.apigee.io/get-started/webhooks)</span>

<a name="Reference Link"><span class="ln"></span></a><span class="s1"></span><span class="s2"> 
Field Encryption/Decryption Algorithm
Unless explicitly decided otherwise, confidential information such as account number, card number, passwords etc. should be encrypted prior to exchanging with uCom. The wallet app server has to encrypt the messages using the public key (that will be shared by uCom) and sent to uCom. The required steps for encrypting the sensitive information are:</p></span>
<a name="Reference Link"><span class="ln"></span></a><span class="s1"></span><span class="s2"> 
<p>• The cipher algorithm is setup to use “RSA/None/OAEPWithSHA1AndMGF1Padding”</p>
<p>• The sensitive data, such as credit card account number, should be encrypted with the cipher algorithm using the shared public key</p>
<p>• The encrypted string should then be Base64 encoded</p>
<p>• The final encoded string value replaces the sensitive data</p>
<p>Note:</p>
<p>Please share following card details as encrypted format for server to server</p>
<p> • cardNumber</p>
<p>• securityCode</p>
<p> • month</p>
<p>• year </p>
<p> Please note that format mentioned in the sample to send encrypted data is mandatory. Encrypted data should be wrapped by ENC_[ and ].
Ex) "cardNumber" : "ENC_[fwU...g==]</p>
</span>

## Idempotency
<a name="Idempotency1"><span class="ln"></span></a><span class="s1"></span><span class="s2">

<a name="Idempotency2"><span class="ln"></span></a><span class="s1"></span><span class="s2"> The way idempotency is enforced in uCom is strictly as follows:</span>
<p></p>
<a name="Idempotency3"><span class="ln"></span></a><span class="s1"></span><span class="s2"> 
A transaction can be sent with the same idempotent ID (Client-Request-Id) at any time to receive the same response as the original transaction, however if no response from uCom was received during the initial transaction then the subsequent time the ID is sent will be treated as a new request.</span>
<p></p>
<a name="Idempotency4"><span class="ln"></span></a><span class="s1"></span><span class="s2"> 
A response includes timeouts, errors, or anything else that is being returned from uCom as a response to the request. This response constitutes a completed transaction as per idempotency rules.</span>
<p></p>
<a name="Idempotency5"><span class="ln"></span></a><span class="s1"></span><span class="s2"> 
If a transaction is still in flight and the same idempotent ID is used, a 503 error will be returned to signify that the transaction is still in progress. This can be continually retried until a different response (non-503 error) is received to signify whether the transaction has completed or not.</span>
<p></p>
<a name="Idempotency6"><span class="ln"></span></a><span class="s1"></span><span class="s2"> 
Any other 500 error received constitutes a completed transaction and would need to have a new idempotent ID generated to retry that transaction. In this case the original transaction will be rolled back and no duplicate payments will be made.
An example of a scenario when you should resend the idempotent ID would be if the network timed out on client side and no response was received from the uCom application.</span>
<p></p>
<a name="Idempotency7"><span class="ln"></span></a><span class="s1"></span><span class="s2"> 
Also note that the idempotent ID will only last for 24 hours regardless, so any retries with the same ID would need to be made within the 24-hour window after generation.</span>
<p></p>

.blog-pre {
    margin-bottom: 3em !important;
    -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 35px -23px 2px -16px rgba(0, 0, 0, 0);
    box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 35px -23px 2px -16px rgba(0, 0, 0, 0);
    position: relative;
}

.code-copy-btn {
    color: white;
    position: absolute;
    right: 10px;
    top: -2px;
    font-size: 1.5em;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.code-copy-btn:hover {
    transform: scale(1.1);
    opacity: 0.9;
}

</body>
</html>

