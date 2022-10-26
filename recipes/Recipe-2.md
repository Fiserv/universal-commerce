# Recipe #2

The PIN Pad or device used to capture the payment source is connected to the terminal or software. The PIN Pad encrypts the customer's payment source and sends the encryption data to the terminal or software. The terminal or software initiates the RESTful API transaction with the encrypted payment source from the 3rd party device.

Commerce Hub supports the following encrypted payment source types: [EMV chip and PIN](?path=docs/In-Person/Encrypted-Payments/EMV.md), [track data (magstripe)](?path=docs/In-Person/Encrypted-Payments/Track.md), NFC/contactless, and [manual entry (EMV fallback)](?path=docs/In-Person/Encrypted-Payments/Manual.md).

---
- [Step 1: Create Keys](#step-1-create-keys)
- [Step 2: Get Payment Details](#step-2-get-payment-details)
- [Step 3: Process Payment](#step-3-process-payment)
- [Step 4: Finalize Transaction](#step-4-finalize-transaction)


---

## Step 1: Create Keys
The benefits of a encyrpted PIN Pad solution are:
- Reduced coding effort for the developer because the encryption handling is already implemented by the third party vendor
- All forms of electronic payment are accepted
- Faster payment improving the customer experience
- Business security by enabling acceptance of chip and signature, and chip and PIN

## Step 2: Get payment details
The benefits of a encyrpted PIN Pad solution are:
- All forms of electronic payment are accepted
- Faster payment improving the customer experience
- Business security by enabling acceptance of chip and signature, and chip and PIN
```json
{
  "amount": {
    "total": "12.04",
    "currency": "USD"
  },
  "paymentSource": {
    "sourceType": "PaymentCard",
    "card": {
      "cardData": "4005550000000019",
      "expirationMonth": "02",
      "expirationYear": "2035",
      "securityCode": "123"
    }
  },
  "transactionDetails": {
    "captureFlag": true
  },
  "merchantDetails":{
      "merchantId": "123456789789567",
      "terminalId": "123456"
    }
}
```

## Step 3: Process Payment
The benefits of a encyrpted PIN Pad solution are:
- Reduced coding effort for the developer because the encryption handling is already implemented by the third party vendor
- All forms of electronic payment are accepted
- Business security by enabling acceptance of chip and signature, and chip and PIN
<!-- theme: info -->
> Commerce Hub highly recommends testing against our sandbox and end to end environments before using our production environment.

## Step 4: Finalize Transaction
The benefits of a encyrpted PIN Pad solution are:
- Reduced coding effort for the developer because the encryption handling is already implemented by the third party vendor
- All forms of electronic payment are accepted
- Faster payment improving the customer experience
<!--
type: tab
titles: Request, Response
-->

##### Example of a charge payload request using `dynamicDescriptors`.

```json
 {
   "amount":{
      "total": "12.04",
      "currency": "USD"
   },
   "source":{
      "sourceType": "PaymentCard",
      "card":{
         "cardData": "4005550000000019",
         "expirationMonth": "02",
         "expirationYear": "2035"
      }
   },
   "dynamicDescriptors":{
      "mcc": "4457",
      "merchantName": "Mywebsite.com",
      "customerServiceNumber": "1231231234",
      "serviceEntitlement": "67893827513",
      "address":{
         "street": "123 Main Street",
         "houseNumberOrName": "Unit B",
         "city": "Atlanta",
         "stateOrProvince": "GA",
         "postalCode": "30303",
         "country": "US"
      }
   },
   "transactionDetails":{
      "captureFlag": true
   },
   "merchantDetails":{
      "merchantId": "123456789789567",
      "terminalId": "123456"
   }
}
```

<!--
type: tab
-->

##### Example of a charge (201: Created) response.

<!-- theme: info -->
> See [Response Handling](?path=docs/Resources/Guides/Response-Codes/Response-Handling.md) for more information.

```json
{
   "gatewayResponse":{
      "orderId": "R-3b83fca8-2f9c-4364-86ae-12c91f1fcf16",
      "transactionType": "CHARGE",
      "transactionState": "AUTHORIZED",
      "transactionOrigin": "ECOM",
      "transactionProcessingDetails":{
         "transactionTimestamp": "2016-04-16T16:06:05Z",
         "apiTraceId": "rrt-0bd552c12342d3448-b-ea-1142-12938318-7",
         "clientRequestId": "30dd879c-ee2f-11db-8314-0800200c9a66",
         "transactionId": "838916029301"
      }
   },
   "source":{
      "sourceType": "PaymentCard",
      "card":{
         "cardData": "4005550000000019",
         "nameOnCard": "Jane Smith",
         "expirationMonth": "02",
         "expirationYear": "2035",
         "bin": "400555",
         "last4": "0019"
      }
   },
   "paymentReceipt":{
      "approvedAmount":{
         "total": 12.04,
         "currency": "USD"
      },
      "processorResponseDetails":{
         "approvalStatus": "APPROVED",
         "approvalCode": "OK3483",
         "authenticationResponseCode": "string",
         "referenceNumber": "845366457890-TODO",
         "schemeTransactionId": "019078743804756",
         "feeProgramIndicator": "123",
         "processor": "FISERV",
         "host": "NASHVILLE",
         "responseCode": "000",
         "responseMessage": "APPROVAL",
         "hostResponseCode": "00",
         "hostResponseMessage": "APPROVAL",
         "localTimestamp": "2016-04-16T16:06:05Z",
         "bankAssociationDetails":{
            "associationResponseCode": "000",
            "transactionTimestamp": "2016-04-16T16:06:05Z"
         }
      }
   },
   "dynamicDescriptors":{
      "mcc": "4457",
      "merchantName": "Mywebsite.com",
      "customerServiceNumber": "1231231234",
      "serviceEntitlement": "67893827513",
      "address":{
         "street": "123 Main Street",
         "houseNumberOrName": "Unit B",
         "city": "Atlanta",
         "stateOrProvince": "GA",
         "postalCode": "30303",
         "country": "US"
      }
   }
}
```

<!-- type: tab-end -->


---
## See also
- [API Explorer](./api/?type=post&path=/payments/v1/charges)
- [Charge Request](?path=docs/Resources/API-Documents/Payments/Charges.md)
- [EMV Chip and PIN](?path=docs/In-Person/Encrypted-Payments/EMV.md)
- [Track Data](?path=docs/In-Person/Encrypted-Payments/Track.md)
- [NFC/Contactless](?path=docs/In-Person/Encrypted-Payments/Contactless.md)
- [Manual Entry](?path=docs/In-Person/Encrypted-Payments/Manual.md)


---
