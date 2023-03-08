
# Fraud Mitigation

## What is Fraud Mitigation?

Fraud Mitigation by Carat — the enterprise payment platform of Fiserv — is a comprehensive solution that can identify fraudulent activity and proactively prevent disputes prior to placing an order, while allowing genuine customers to proceed with their activity. The solution utilizes customer, device, and transactional data (beyond authorization data), specifically asking whether the customer is acting in a genuine or fraudulent manner. The aim of the solution is to achieve the business goals of a merchant, that is, reduce disputes and fraudulent actors, while not introducing customer friction for genuine customers.

## What benefits does Fraud Mitigation offer? 

Fraud Mitigation by Carat is an enterprise fraud solution which mainly utilizes machine learning and artificial intelligence (AI) to prevent fraudulent activities carried out by customers while attempting to place an order. The solution accurately identifies differences in the patterns exhibited by genuine and fraudulent customers. The solution also uses a real-time graph network, which builds connections across hard identifiers of customers (for example, customer ID, device ID and email ID). This helps to identify and prevent the activities of fraud rings and provides significant network patterns to the machine learning algorithms. While machine learning is key to fraud prevention, rules are also a relevant part of the prevention toolkit.  They should be used for immediate responses to emerging fraud concerns or to implement business controls (for example, velocity controls for card usage dictated by business policies). Fraud Mitigation by Carat combines advanced machine learning and artificial intelligence algorithms along with an expansive rules engine. This is further strengthened by proprietary linking technology, which builds a network of the connections across the complete customer base. In comparison to other providers, Fraud Mitigation by Carat is known for its machine learning component, which is the primary decision maker in customer classification (as genuine or fraudulent). Additionally, the rules provide the ability to implement business logic, that is, maximum order amount (for example, $500) or respond to immediate fraud concerns, that is, block the Internet Protocol (IP) address of the fraudulent customer.

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
description: The scoring and decisioning of orders is the primary responsibility of Fraud Mitigation, as this is where the merchant is exposed to financial risk. The platform scores the likelihood that this consumer is behaving in a fraudulent manner on this particular order or has a history of fraudulent behavior. At a minimum, a merchant must integrate this service.

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
| --- | --- | --- |
| customer.name.givenName | First Name of the customer. | Required |
| customer.name.familyName | Last Name of the customer. | Required |
| customer.emails.value | Email address of the customer. | Required |
| customer.emails.primary | Set to "true" | Required |
| customer.addresses.streetAddress | Street 1 of customer's home address. | Optional |
| customer.addresses.locality | City of customer's home address. | Optional |
| customer.addresses.region | State/Province of customer's home address. | Optional |
| customer.addresses.postalCode | ZIP/Postal Code of customer's home address. | Optional |
| customer.addresses.country | Country of customer's home address.
 Requires [ISO Alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) Country Codes. | Optional |
| customer.phoneNumbers.value | Phone number of the customer.
 Best in [E.164](https://en.wikipedia.org/wiki/E.164) format. | Required |
| customer.phoneNumbers.type | Set to "home" | Required |
| deviceInfo.id | Device Intelligence generated Device ID.See [Device Intelligence](#_Device_Intelligence) for details. | Required |
| deviceInfo.kind | Set to "mobile" | Required |
| deviceInfo.details.provider | Device Intelligence provider name.
 Set to "RAVELIN" | Required |
| deviceInfo.details.dataCapture.dataEventId | Device Intelligence generated Device ID.See [Device Intelligence](#_Device_Intelligence) for details. | Required |

</details>

## What information can be passed to Fraud Mitigation?

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


