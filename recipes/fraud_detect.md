
# Fraud Mitigation

## What is Fraud Mitigation?

Fraud Mitigation by Carat — the enterprise payment platform of Fiserv — is a comprehensive solution that can identify fraudulent activity and proactively prevent disputes prior to placing an order, while allowing genuine customers to proceed with their activity. The solution utilizes customer, device, and transactional data (beyond authorization data), specifically asking whether the customer is acting in a genuine or fraudulent manner. The aim of the solution is to achieve the business goals of a merchant, that is, reduce disputes and fraudulent actors, while not introducing customer friction for genuine customers.

## What benefits does Fraud Mitigation offer?

Fraud Mitigation by Carat is an enterprise fraud solution which mainly utilizes machine learning and artificial intelligence (AI) to prevent fraudulent activities carried out by customers while attempting to place an order. The solution accurately identifies differences in the patterns exhibited by genuine and fraudulent customers. The solution also uses a real-time graph network, which builds connections across hard identifiers of customers (for example, customer ID, device ID and email ID). This helps to identify and prevent the activities of fraud rings and provides significant network patterns to the machine learning algorithms. While machine learning is key to fraud prevention, rules are also a relevant part of the prevention toolkit. Fraud Mitigation by Carat combines advanced machine learning and artificial intelligence algorithms along with an expansive rules engine.

## Services Available

<!-- type: row -->

<!-- type: card
title: Customer Onboarding

description: When a customer onboard's to a merchant's platform as a registered user, they provide personally identifiable data associated with their account (e.g., name, email, phone). Calling the Fraud Mitigation service at the time of customer onboarding allows the customer profile to be built up from the first interaction that the consumer has with the platform.

Data Collected:</br>
Customer Information</br>
Device Information</br>

-->

<!-- type: card
title: Payment Method Onboarding

description: Customers add a payment method to a merchant’s website/app for the convenience  of future checkouts. Fraud Mitigation can score the payment method at time of enrollment. In addition, adding this service allows the Fraud Mitigation tool to see all attempted card enrollments, even if they are declined enrollment by other systems.
Data Collected:</br>
Payment Information </br>
Device Information </br>

-->

<!-- type: card
title: Orders
description: The scoring and decision on orders is the primary responsibility of Fraud Mitigation, as this is where the merchant is exposed to financial risk. The platform scores the likelihood that this consumer is behaving in a fraudulent manner on this particular order or has a history of fraudulent behavior. At a minimum, a merchant must integrate this service.

Data Collected: </br> 
Customer Information </br> 
Order Information </br> 
Payment Information </br> 
Device Information </br> 
Transaction Information </br> 
-->
<!-- type: row-end -->

## How to integrate Fraud Mitigation in uCom?

<details>
<summary> Customer Registration </summary>

The customer registration service within the Fraud Mitigation platform is carried out at the time at which the customer account is being provisioned within the uCom system. It should be noted that this service will consistently return an "Approve" response to uCom (i.e., no decision), but calling this service results in a customer profile being created within the Fraud Mitigation platform at the time of the first interaction of the customer at the merchant.

The following diagram provides clarity on the interaction points between the merchant, uCom and Fraud Mitigation for this service:

1. **Merchant** integrates with appropriate uCom endpoint for customer enrollment
2. **uCom** routes the enrollment information to Fraud Mitigation
3. **Fraud Mitigation** responds to uCom acknowledging the request (no decision)
4. **uCom** responds to merchant indicating if the customer account has been enrolled or not

<Insert Flow chart>

## Data Requirements

The following table provides the field level data definition, along with the API field names and requirement level. Fields marked as Required must be provided, Optional fields may be excluded if not available. If any Required fields are not collected/available discuss with the assigned Implementation Advisor.

|Field Name| Field Description| Requirement|
| --- | --- | --- |
| customer.externalId | ID of the customer on the merchant side. | Required |
| customer.name.givenName | First Name of the customer. | Required |
| customer.name.familyName | Last Name of the customer. | Required |
| customer.emails.value | Email address of the customer. | Required |
| customer.emails.primary | Set to "true" | Required |
| customer.addresses.streetAddress | Street 1 of customer's home address. | Optional |
| customer.addresses.locality | City of customer's home address. | Optional |
| customer.addresses.region | State/Province of customer's home address. | Optional |
| customer.addresses.postalCode | ZIP/Postal Code of customer's home address. | Optional |
| customer.addresses.country | Country of customer's home address. Requires [ISO Alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) Country Codes. | Optional |
| customer.phoneNumbers.value | Phone number of the customer. Best in [E.164](https://en.wikipedia.org/wiki/E.164) format. | Required |
| customer.phoneNumbers.type | Set to "home" | Required |
| deviceInfo.id | Device Intelligence generated Device ID. See [Device Intelligence](#_Device_Intelligence) for details. | Required |
| deviceInfo.kind | Set to "mobile" | Required |
| deviceInfo.details.provider | Device Intelligence provider name. Set to "RAVELIN" | Required |
| deviceInfo.details.dataCapture.dataEventId | Device Intelligence generated Device ID. See [Device Intelligence](#_Device_Intelligence) for details. | Required |

</details>

<details>

<summary> Payment Method Registration </summary>

Invoking the payment method registration service within the Fraud Mitigation platform is carried out by uCom when a merchant requests a new payment method be adding to a customer's account profile. The service can return one of two possible responses to uCom (i.e., approve, decline).

The following diagram provides a view to how this service should be enabled:

1. **Merchant** integrates with uCom's account enrollment endpoint providing information on the payment method as specified in the merchant's integration guide

1. **uCom** orchestrates a request to the **Fraud Mitigation** service and receives a response
2. **uCom** carries out card verification services on behalf of merchant
3. **uCom** responds to the merchant informing if the account has been successfully enrolled or not
4. **uCom** updates Fraud Mitigation with final status of account enrollment
5. **Fraud Mitigation** acknowledges uComs enrollment status update

![](RackMultipart20230309-1-mpio16_html_785c3f922c611983.gif)

## Data Requirements

The following table provides the field level data definition, along with the API field names and requirement level. Fields marked as Required must be provided, Optional fields may be excluded if not available. If any Required fields are not collected/available discuss with the assigned Implementation Advisor.

|Field Name| Field Description| Requirement|
| --- | --- | --- |
| account.type | Type of the account. | Required |
| account.credit.cardNumber | Encrypted card number. | Required |
| account.credit.cardType | Card Type. | Required |
| account.credit.billingAddress.streetAddress | Street of the cardholder's address. | Required |
| account.credit.billingAddress.locality | City of the cardholder's address. | Required |
| account.credit.billingAddress.region | State/Province of the cardholder's address. | Required |
| account.credit.billingAddress.postalCode | ZIP/Postal Code of the cardholder's address. | Required |
| account.credit.billingAddress.country | Country of the cardholder's address. Requires [ISO Alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) Country Codes. | Required |
| account.credit.expiryDate.month | Encrypted expiration month on card | Required |
| account.credit.expiryDate.year | Encrypted expiration year on card | Required |
| account.credit.securityCode | Encrypted security code on card | Required |
| deviceInfo.id | Device Intelligence generated Device ID. See [Device Intelligence](#_Device_Intelligence) for details. | Required |
| deviceInfo.kind | Set to "mobile" | Required |
| deviceInfo.details.provider | Device Intelligence provider name. Set to "RAVELIN" | Required |
| deviceInfo.details.dataCapture.dataEventId | Device Intelligence generated Device ID. See [Device Intelligence](#_Device_Intelligence) for details. | Required |

</details>

<details>

<Summary>Checkout</summary>

Invoking the checkout service within the Fraud Mitigation platform is carried out by uCom when a merchant submits an authorization or sale request. This service returns one of two possible responses to the uCom (i.e., approve, decline).

The flow of this process is outlined as follows:

1. **Merchant** integrates with uCom's payments endpoints providing information as specified in the merchant's integration guide

1. **uCom** orchestrates a request to the **Fraud Mitigation** service and receives a response
2. **uCom** carries out authorization (and authentication) services as required
3. **uCom** responds to the merchant informing if checkout attempt has been approved/declined
4. **uCom** updates Fraud Mitigation with subsequent transaction/order information
5. **Fraud Mitigation** acknowledges uComs transaction/order update

## Data Requirements

The following table provides the field level data definition, along with the API field names and requirement level. Fields marked as Required must be provided, Optional fields may be excluded if not available. If any Required fields are not collected/available discuss with the assigned Implementation Advisor.

>XX in the below request field names can be one of authorization or sale.

|Field Name| Field Description| Requirement|
| --- | --- | --- |
| fdCustomerId | Unique ID for the specific customer. | Required |
| XX.orderId | Order ID for this order, should be consistent across the Fraud Call and Fraud Update events for a specific order | Required |
| XX.requestedAmount | Value of the transaction in currency base units, e.g. $20.12 should be 2012 | Required |
| XX.currencyCode.number | Alpha-3 currency codes, e.g., US Dollar should be USD | Required |
| XX.merchantId | ID of the merchant completing the transaction | Required |
| XX.fundingSource.saveToVault | Save to Vault Indicator | Required |
| XX.fundingSource.credit.cardNumber | Encrypted card number. | Required |
| XX.fundingSource.credit.nameOnCard | Cardholders Name. | Required |
| XX.fundingSource.credit.cardType | Card Type. | Required |
| XX.fundingSource.credit.billingAddress.streetAddress | Street of the cardholder's address. | Required |
| XX.fundingSource.credit.billingAddress.locality | City of the cardholder's address. | Required |
| XX.fundingSource.credit.billingAddress.region | State/Province of the cardholder's address. | Required |
| XX.fundingSource.credit.billingAddress.postalCode | ZIP/Postal Code of the cardholder's address. | Required |
| XX.fundingSource.credit.billingAddress.country | Country of the cardholder's address.
 Requires [ISO Alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) Country Codes. | Required |
| XX.fundingSource.credit.expiryDate.month | Encrypted expiration month on card | Required |
| XX.fundingSource.credit.expiryDate.year | Encrypted expiration year on card | Required |
| XX.fundingSource.credit.securityCode | Encrypted security code on card | Required |
| XX.fundingSource.vaultedAccount.fdAccountId | Vaulted FD account ID instead of Card Details | Required |
| purchaseInfo.order.orderId | Order ID associated with this order | Required |
| purchaseInfo.order.altOrderId | Custom field discuss usage with Implementation Advisor | Optional |
| purchaseInfo.order.orderType | Custom field discuss usage with Implementation Advisor | Optional |
| purchaseInfo.order.emails.value | Email of the customer | Required |
| purchaseInfo.order.emails.type | Type takes value of "home" | Required |
| purchaseInfo.order.phoneNumbers.value | Shipping or Home Phone numbers; see type | Required |
| purchaseInfo.order.phoneNumbers.type | Type takes value of "home" or "shipping" | Required |
| purchaseInfo.order.addresses.streetAddress | Street of the address. For address type see addresses.type field | Required |
| purchaseInfo.order.addresses.type | Type takes value of "home" or "shipping" | Optional |
| purchaseInfo.order.addresses.locality | City of the address. | Required |
| purchaseInfo.order.addresses.region | State/Province of the address. | Required |
| purchaseInfo.order.addresses.postalCode | ZIP/Postal Code of the ship-to-address. | Required |
| purchaseInfo.order.addresses.country | Country of the ship-to-address. Requires [ISO Alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) Country Codes. | Required |
| purchaseInfo.items.productCode | Unique ID for this item | Required |
| purchaseInfo.items.itemDescription | Name of the item | Required |
| purchaseInfo.items.unitOfMeasurement | Unit of measurement; each, gallon, etc. | Required |
| purchaseInfo.items.itemPrice | Unit price for this item | Required |
| purchaseInfo.items.totalItemSaleAmount | Total price for this item | Required |
| purchaseInfo.items.unitsSold | Number of this item in the basket | Required |
| deviceInfo.id | Device Intelligence generated Device ID. See [Device Intelligence](#_Device_Intelligence) for details. | Required |
| deviceInfo.kind | Set to "mobile" | Required |
| deviceInfo.details.provider | Device Intelligence provider name. Set to "RAVELIN" | Required |
| deviceInfo.details.dataCapture.dataEventId | Device Intelligence generated Device ID. See Device Intelligence for details. | Required |
 
</details>

<details>

<summary> Device Intelligence </summary>

The collection of the Device Intelligence data should always occur at the point of a customer executing an action (i.e., creating an account, enrolling a payment method, completing an order) and when there is an API call to the Fraud Mitigation platform via uCom. For completeness, there is no requirement to integrate the device intelligence component across all pages of the web or mobile application and the following provides guidelines on optimal usage where the merchant is enabled for all Fraud Mitigation services:

- Customer Registration: collect the device information on the page on which the customer clicks "Register Account" or equivalents
- Payment Method Registration: collect the device information on the page on which the customer clicks "Add Payment Method" or equivalent
- Checkout: collect the device information on the page on which the customer clicks "Pay Now" or equivalent

## Installation Guidelines

To keep the installation guidelines for each of the components up to date, this section provides the associated developer documentation for each offering:

|Component|Developer Docs|Bundle to use|
| --- | --- | --- |
| JavaScript | [JavaScript Dev Docs](https://developer.ravelin.com/libraries-and-sdks/ravelinjs/integration/) | ravelin-core+promise |
| Android SDK | [Android SDK Dev Docs](https://developer.ravelin.com/libraries-and-sdks/android/core-sdk/android/) | ravelin-core |
| iOS SDK | [iOS SDK Dev Docs](https://developer.ravelin.com/libraries-and-sdks/ios/) | RavelinCore |

While the development documentation included will provide a full view to all services that the device intelligence components can provide, the only items to be considered are the generation of unique device IDs and the collection of additional device details. As such, card encryption and session tracking components can be safely ignored.

</details>
 

## What information can be passed to Fraud Mitigation?

### Sample Customer Registration Request – Device Intelligence

```json

{
    "customer":{
        "externalId":"123abc456def890ghi098jkl765mno",
        "name":{
            "familyName":"Jensen",
            "givenName":"Barbara"
        },
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
                    "dataEventId":"537edec8-d33e-4ee8-93a7-b9f61876950c"
                }
            }
        ]
    }
}


```

### Sample Customer Registration Declined Response

```json

{
  "code": "269801",
  "message": "Blocked for suspicious activity",
  "category": "common",
  "developerInfo": {
    "developerMessage": "Blocked for suspicious activity"
  }
}


```

### Sample Payment Method Registration Request with Device Intelligence

```json

{
   "account":{
      "type":"CREDIT",
      "credit":{
         "cardNumber":"ENC_[...]",
         "cardType":"VISA",
         "billingAddress":{
            "streetAddress":"100 Universal City Plaza",
            "locality":"Hollywood",
            "region":"CA",
            "postalCode":"91608",
            "country":"US "
         },
         "expiryDate":{
            "month":"ENC_[...]",
            "year":"ENC_[...]"
         },
         "securityCode":"ENC_[...]"
      }
   },
   "deviceInfo":{
      "id":"537edec8-d33e-4ee8-93a7-b9f61876950c",
      "kind":"mobile",
      "details":[
         {
            "provider":"RAVELIN",
            "dataCapture":{
               "dataEventId":"537edec8-d33e-4ee8-93a7-b9f61876950c"
            }
         }
      ]
   }
}
```

### Sample Payment Method Registration Declined Response

```json

{
  "code": "269801",
  "message": "Blocked for suspicious activity",
  "category": "common",
  "developerInfo": {
    "developerMessage": "Blocked for suspicious activity"
  }
}

```

### Sample Auth/Checkout Payment Request With Device ID

```json
{
    "fdCustomerId": "bc590d87b5fe4e0a96f7b60178a9313d",
    "authorization": {
        "orderId": "1234567890125",
        "merchantId": "MO45009483002",
        "requestedAmount": 20,
        "currencyCode": {
            "number": 840
        },
        "fundingSource": {
            "saveToVault": false,
            "credit": {
                "cardNumber": "ENC_[...]",
                "nameOnCard": "John Smith",
                "cardType": "VISA",
                "billingAddress": {
                    "streetAddress": "100 Universal City Plaza",
                    "locality": "Hollywood",
                    "region": "CA",
                    "postalCode": "91608",
                    "country": "US"
                },
                "expiryDate": {
                    "month": "ENC_[...]",
                    "year": "ENC_[...]"
                },
                "securityCode":"ENC_[...]"
            }
        }
    },
    "purchaseInfo": [ 
        { 
            "order": {
                "orderId": "1234",
                "altOrderId": "Employee",
                "orderType": "FanCustomer", 
                "emails": [ 
                    {
                        "value": "example@example.com",
                        "type": "home"
                    } 
                ], 
                "addresses": [ 
                    { 
                        "type": "home",
                        "streetAddress": "100 Universal City Plaza", 
                        "locality": "Hollywood", 
                        "region": "CA", 
                        "postalCode": "91608", 
                        "country": "US"
                    }, 
                    { 
                        "type": "shipping", 
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
                        "type": "home"
                    }, 
                    { 
                        "value": "555-555-5555", 
                        "type": "shipping" 
                    } 
                ] 
            }, 
            "items": [ 
                {
                    "itemDescription": "GiftCard", 
                    "itemPrice": 7.5, 
                    "unitOfMeasurement": "each", 
                    "unitsSold": 1, 
                    "totalItemSaleAmount": 7.5, 
                    "productCode": "874" 
                }, 
                {
                    "itemDescription": "Chips", 
                    "itemPrice": 2, 
                    "unitOfMeasurement": "each",
                    "unitsSold": 1,
                    "totalItemSaleAmount": 2,
                    "productCode": "874" 
                } 
            ] 
        } 
    ], 
    "deviceInfo":{
        "id": "537edec8-d33e-4ee8-93a7-b9f61876950c",
        "kind": "mobile",
        "details": [
            {
                "provider": "RAVELIN",
                "dataCapture": {
                    "dataEventId": "537edec8-d33e-4ee8-93a7-b9f61876950c"
                }
            }
        ]
    }
}

```

### Sample Auth Payment Method Declined Response

```json
{
  "code": "269801",
  "message": "Blocked for suspicious activity",
  "category": "common",
  "developerInfo": {
    "developerMessage": "Blocked for suspicious activity"
  }
}

```
