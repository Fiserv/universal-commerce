
# Fraud Detect 

## What benefits does fraud detect offer? 

## What are the different providers? 

## How to integrate fraud detect in uCom? 

## What information can be passed to fraud detect?

### Sample Customer Profile Payload with Device ID 
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
            "value":"555-555-5555",
            "type":"work"
         }
      ]
   },
   "deviceInfo":{
      "id":"537edec8-d33e-4ee8-93a7-b9f61876950c",
      "kind":"mobile",
      "details":[
         {
            "provider":"RAVELIN",
            "dataCapture":{
               "dataEventId":"BB8E4E92...Fz1E063113"
            }
         }
      ]
   }
}


```

### Sample Auth Payment Payload With Device ID 

```json
{
   "fdCustomerId":"dfa509ed45ab442ba31061ab2ab1e3e3",
   "authorization":{
      "orderId":"1234567890122",
      "merchantId":"MO45009483002",
      "requestedAmount":20,
      "currencyCode":{
         "number":840
      },
      "fundingSource":{
         "vaultedAccount":{
            "fdAccountId":"8a7f811778f4c4f60178fe37205a0672"
         }
      }
   },
   "deviceInfo":{
      "id":"537edec8-d33e-4ee8-93a7-b9f61876950c",
      "kind":"mobile",
      "details":[
         {
            "provider":"RAVELIN",
            "dataCapture":{
               "dataEventId":"BB8E4E92...Fz1E063113"
            }
         }
      ]
   }
}
```


