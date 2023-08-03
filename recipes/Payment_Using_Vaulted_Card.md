<img title="icon" alt="hosted pages icon" src="https://raw.githubusercontent.com/Fiserv/universal-commerce/develop/assets/images/Picture28.png" width="40" height="40"> 

# How to Make a Payment Using a Vaulted Card

To make a payment using a vaulted card through the Connected Commerce (uCom) API, users must securely onboard their card details onto the platform and subsequently utilize the stored card information. Below is a step-by-step guide on how to achieve this:

## Step 1: Vaulted Card Setup
Ensure you have already set up and securely stored the credit card or Gift card information in the Connected Commerce (uCom) digital vault. If not, then feel free to follow <a href="../docs/?path=recipes/vault_credit_card_gift_card.md"> this API guide</a> for card vaulting instructions.

## Step 2: Create a Payment Request
To initiate a payment using a vaulted card, construct a payment request using either the sale or auth/capture flows. The specifics of the request may vary depending on the configuration, but it typically includes the following information:

- **Amount:** The total amount to be charged for the transaction.
- **Currency:** The currency in which the payment is to be processed (e.g., USD, EUR, GBP).
- **Vaulted Card Account ID:** The unique identifier or token associated with the vaulted card you want to use for the payment.
- **Order ID:** A unique identifier for this specific transaction or order.
- **Billing and Shipping Information:** If applicable, provide the billing and shipping details for the order.

## Step 3: Call the API to Process the Payment
Make an API call to the Connected Commerce (uCom) platform's payment endpoint (either sale or auth), providing the payment request data you constructed in the previous step. Ensure that you pass your API access credentials (API key/token) for authentication.

Below are sample payloads that demonstrate how to invoke either the sale or the authorization endpoints.

### Sample Auth transaction

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: https://int.api.firstdata.com/ucom/v1/payments/auths

Prod: https://prod.api.firstdata.com/ucom/v1/payments/auths

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

Content-Type: application/json

Client-Request-Id:{{$guid}}

Api-Key:{{clientKey}}

Authorization: Bearer {{tokenId}}

Timestamp:{{time}}


**Request - Vaulted Card Authorization transaction**

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
   }
}
```

---

**Request - Vaulted Card Authorization transaction - with deviceInfo**

```json
{
  "fdCustomerId": "dfa509ed45ab442ba31061ab2ab1e3e3",
  "authorization": {
    "orderId": "1234567890122",
    "merchantId": "MO45009483002",
    "requestedAmount": 20,
    "currencyCode": {
      "number": 840
    },
    "fundingSource": {
      "vaultedAccount": {
        "fdAccountId": "8a7f811778f4c4f60178fe37205a0672"
      }
    }
  },
  "deviceInfo": {
    "id": "537edec8-d33e-4ee8-93a7-b9f61876950c",
    "kind": "mobile",
    "details": [
      {
        "provider": "RAVELIN",
        "dataCapture": {
          "dataEventId": "BB8E4E92...Fz1E063113"
        }
      }
    ]
  }
}
```

> Please note that the device info section is optional and only required when Fraud Mitigation is enabled.

**Response (201) - Auth - Credit card - Vaulted**

```json
{
  "fdAuthorizationId": "66b46c2ac6a94f2a9f0aac3e36deedae",
  "authStatus": "APPROVED",
  "orderId": "1234567890122",
  "requestedAmount": 20,
  "approvedAmount": 20,
  "currencyCode": {
    "code": "USD",
    "number": 840
  },
  "transactionDateTime": "2021-04-23T09:56:17-0400",
  "fundingSource": {
    "type": "VAULTED_ACCOUNT",
    "vaultedAccount": {
      "fdAccountId": "8a7f811778f4c4f60178fe37205a0672",
      "type": "CREDIT"
    },
    "credit": {
      "alias": "6775",
      "cardType": "VISA",
      "billingAddress": {
        "postalCode": "06413"
      },
      "expiryDate": {
        "month": "12",
        "year": "24"
      }
    }
  },
  "hostExtraInfo": [
    {
      "name": "APPROVAL_NUMBER",
      "value": "003965"
    },
    {
      "name": "SEQUENCE_NUMBER",
      "value": "434048"
    },
    {
      "name": "HOST_RESPONSE_CODE",
      "value": "3"
    },
    {
      "name": "HOST_RESPONSE_MESSAGE",
      "value": "APPROVED 003965"
    },
    {
      "name": "HOST_AVS_CODE",
      "value": "AVS+Z"
    },
    {
      "name": "TRANSACTION_DATETIME",
      "value": "2021-04-23T09:56"
    },
    {
      "name": "NETWORK_TRANSACTION_ID",
      "value": "024000423135618"
    }
  ]
}
```

### Sample Sale transaction

**<ins> Endpoint URL </ins>**

HTTP Method: POST

Non-prod: https://int.api.firstdata.com/ucom/v1/payments/sales

Prod: https://prod.api.firstdata.com/ucom/v1/payments/sales

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

Content-Type: application/json

Client-Request-Id:{{$guid}}

Api-Key:{{clientKey}}

Authorization: Bearer {{tokenId}}

Timestamp:{{time}}

**Request - Sale - Credit card - Vaulted**

```json
{
  "fdCustomerId": "dfa509ed45ab442ba31061ab2ab1e3e3",
  "sale": {
    "orderId": "1234567890122",
    "merchantId": "MO45009483002",
    "requestedAmount": 20,
    "currencyCode": {
      "number": 840
    },
    "fundingSource": {
      "vaultedAccount": {
        "fdAccountId": "8a7f811778f4c4f60178fe37205a0672"
      }
    }
  },
  "deviceInfo": {
    "id": "537edec8-d33e-4ee8-93a7-b9f61876950c",
    "kind": "mobile",
    "details": [
      {
        "provider": "RAVELIN",
        "dataCapture": {
          "dataEventId": "BB8E4E92...Fz1E063113"
        }
      }
    ]
  }
}
```
> Please note that the device info section is optional and only required when Fraud Mitigation is enabled.

**Response (201) - Credit Card - Vaulted**

```json
{
  "fdSaleId": "66b46c2ac6a94f2a9f0aac3e3eed34ae",
  "status": "APPROVED",
  "orderId": "1234567890122",
  "requestedAmount": 20,
  "approvedAmount": 20,
  "currencyCode": {
    "code": "USD",
    "number": 840
  },
  "partialPaymentAllowed": true,
  "transactionDateTime": "2021-04-23T09:56:17-0400",
  "fundingSource": {
    "type": "VAULTED_ACCOUNT",
    "vaultedAccount": {
      "fdAccountId": "8a7f811778f4c4f60178fe37205a0672",
      "type": "CREDIT"
    },
    "credit": {
      "alias": "6775",
      "cardType": "VISA",
      "billingAddress": {
        "postalCode": "06413"
      },
      "expiryDate": {
        "month": "12",
        "year": "24"
      }
    }
  },
  "hostExtraInfo": [
    {
      "name": "APPROVAL_NUMBER",
      "value": "003965"
    },
    {
      "name": "SEQUENCE_NUMBER",
      "value": "434048"
    },
    {
      "name": "HOST_RESPONSE_CODE",
      "value": "3"
    },
    {
      "name": "HOST_RESPONSE_MESSAGE",
      "value": "APPROVED 003965"
    },
    {
      "name": "HOST_AVS_CODE",
      "value": "AVS+Z"
    },
    {
      "name": "TRANSACTION_DATETIME",
      "value": "2021-04-23T09:56"
    },
    {
      "name": "NETWORK_TRANSACTION_ID",
      "value": "024000423135618"
    }
  ]
}
```

## Error Codes 

For comprehensive troubleshooting of potential errors, kindly refer to the designated <a href="../docs/?path=docs/documentation/API_Response_Codes.md"> Error Codes Section</a>. This resource will aid in addressing and resolving any errors that may arise during the course of testing.
