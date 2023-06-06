# Error Codes

Listed below are the error codes being returned during uCom operations.
The codes are separated into sections based on what was being done in the software at the time the error occurred.

## Common

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Common|269801|Blocked for suspicious activity.|400|
|Common|269802|Its considered as parallel transaction and blocked.|400|
|Common|269901|Unable to process your request please try again later if problem persist contact sys admin.|500|
|Common|269902|Invalid request format/data.|400|
|Common|269903|Time out while connecting to adapter|400|
|Common|269904|Invalid Global transaction id. No data found for the given Global Transaction Id.|400|
|Common|269905|Invalid Location Id. No data found for the given Location Id.|400|
|Common|269906|This service is down at the moment, please try again later.|500|
|Common|279903|Your secure session has expired due to longer period of inactivity. Please try again.|400|
|Common|279904|Customer profile not found.|400|
|Common|279905|Account detail not found.|400|
|Common|279907|The account has already been enrolled by the maximum allowable number of customers.|400|
|Common|279908|Operation not permitted. Customer Profile is DELETED/INACTIVE.|400|
|Common|279909|Operation not permitted. Account is DELETED/INACTIVE.|400|
|Common|279910|Payment instrument revoked.|400|
|Common|279911|Invalid nonce.|400|
|Common|279912|Decryption failed.|400|
|Common|279913|Transaction failed|400|
|Common|290020|The transaction is in progress through Async channel. Please try some time later|400|
|Common|290032|Operation not allowed based on current membership status|400|
|Common|290020|The transaction is in progress through Async channel. Please try some time later|400|
|Common|274007|The consumer has exceeded the maximum account velocity constraints for associated payment instruments.|400|
|Common|290032|Operation not allowed based on current membership status|400|
|Common|274002|The consumer has already enrolled the maximum allowable number of payment instruments|400|
|Common|274003|The Payment Instrument has already been enrolled by the maximum allowable number of consumers|400|
|Common|274013|Duplicate enrollment request : Card already enrolled to the customer|400|
|Common|272707|Store Id not configured|400|
|Common|272791|Operation not supported|400|
|Common|272783|Site settlement failed|400|
|Common|261001|QR code identifier is invalid / expired / used.|400|
|Common|999901|Downstream system is not responding. Please try later|400|
|Common|999902|Downstream system is unavailable. Please try later|400|
|Common|999903|QDownstream system processing error. Please try later|400|

## Customer

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Register a Customer|270101|Customer already registered|409|
|Update Customer Profile|270201|Customer profile details update failed|400|
|Deregister Customer|270401|Consumer profile is already de-registered|400|

## Tokenization

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Payment Method Nonce|273601|Account validation failed.|400|
|Payment Method Nonce|273602|Message decryption failed.|500|
|Payment Method Nonce|273603|Decryption Key has expired.|400|

## Account

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Add Account|274001|Account registration was unsuccessful. Please check the account details|400|
|Add Account|274002|Account already registered.|409|
|Add Account|274004|The consumer has already enrolled the maximum allowable number of accounts.|400|
|Tokenization|274005|Tokenization is unsuccessful. Please check the account details.|400|
|Verify Account|274006|Verification is unsuccessful. Please check the account details.|400|
|Update Account|270701|Account update failed. Please check the provided account details.|400|
|Deregister Account| 270402| Account is already de-registered.|400|

## Prepaid

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Purchase Gift Card|271001|Gift card purchase failed : Gift card creation failure|500|
|Purchase Gift Card|271002|Gift card purchase failed : Payment Transaction failure|400|
|Gift Card Balance|272501|Gift card balance retrieval failed|500|
|Reload Gift Card|271101|Gift card reload failed|500|
|Reload Gift Card|271102|Gift card reload failed : Payment failure|400|
|Gift Card Balance Merge|271201|Gift card balance merge failed.|500|
|Gift Card Balance Merge|271202|Card validation failed : Incorrect card details provided.|400|
|Gift Card Transaction History|271501|Card transaction history retrieval failed|500|
|Gift Card Balance|290000|InsufficientFunds|400|
|Prepaid|290001|Invalid request: Gift card details not found.|400|
|Prepaid|290002|Transaction failed: Inactive Gift Card|400|
|Prepaid|290003|Error: Gift Card Does Not Require Activation|400|
|Prepaid|290004|Operation not permitted: Maximum allowable balance on the gift card cannot be exceeded. Please try again with a lower amount.|400|
|Prepaid|290005|Invalid request: Please try again with a valid gift card amount.|400|
|Prepaid|290006|Operation not permitted: Maximum number of gift card  transactions exceeded  please try again with a lower transaction count.|400|
|Prepaid|290007|Operation not permitted. There are no more transactions to view|400|
|Prepaid|290008|Operation not permitted: Transaction history requested is unavailable.|400|
|Prepaid|290009|Operation not permitted for this gift card|400|
|Prepaid|290010|Operation not permitted: gift card activation cannot be voided.|400|
|Prepaid|290011|Operation not successful. Please check the PIN of the gift card provided and try again.|400|
|Prepaid|290012|Operation not permitted: please review merchant setup for cross border transactions and try again|400|
|Prepaid|290013|The gift card host is unable to return a PIN with your request|400|
|Prepaid|290014|Invalid request: The merchant is not configured to return a PIN with your request|400|
|Prepaid|290015|Invalid request: Transaction already voided|400|
|Prepaid|290030|Transaction Processing Failure. There are no mapping accounts for given customer.|400|
|Prepaid|290031|Balance Enquiry failed|400|
|Prepaid|290033|Transaction denied. Duplicate transaction please try after some time|425|

## Stac

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|STAC Transaction|261002|Payment initialization failed|400|
|STAC Transaction|261003|Cancellation of Payment initialization failed|400|
|STAC Transaction|261004|StacId identifier is invalid / expired / used|400|

## Sale

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Sale Transaction|272701|Sale transaction failed|400|
|Sale Transaction|272706|Sale transaction not found|400|
|Sale Transaction using Paypal|272724|Sale declined due to insufficient funds|400|
|Sale Void|272711|Sale transaction cancellation failed|400|
|Sale Void|272712|Sale transaction cancellation already done|400|
|Sale refund|272721|Sale refund transaction failed|400|
|Sale refund|272722|Sale refund transaction already done|400|
|Sale refund|272723|Refund transaction not found|400|

## Authorization

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Auth Transaction|272731|Auth transaction failed|400|
|Auth Transaction|272736|Auth transaction not found|400|
|Auth Void|272741|Auth transaction cancellation failed|400|
|Auth Void|272742|Auth transaction cancellation already done|400|
|Auth refund|272751|Auth refund transaction failed|400|
|Auth refund|272752|Auth refund transaction already done|400|

## Capture

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Capture Transaction|272761|Capture transaction failed|400|
|Capture Transaction|272766|Capture transaction not found|400|
|Capture Void|272771|Capture transaction cancellation failed|400|
|Capture Void|272772|Capture transaction cancellation already done|400|
|Capture refund|272781|Capture refund transaction failed|400|
|Capture refund|272782|Capture refund transaction already done|400|

## Void

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Void|272727||Void transaction not found|400|

## Refund

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Refund|290034|Refund transaction failed|400|
|Refund Cancellation|272725|Refund transaction cancellation failed|400|
|Refund Void|272726|Void refund transaction already done|400|

## Charges

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Payment Charges|272880| Fee details not found|400|

## Petro Authorizations

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Service Authorization|260202|Dispenser busy|400|
|Service Authorization|260203|Dispenser offline|400|
|Service Authorization|260204|Pump number specified is invalid or does not exist|400|
|Service Authorization|260205|Unable to perform transaction on the specified pump|400|
|Service Authorization|260206|Mobile authorization in progress for this dispenser|400|
|Service Authorization|260216|Card authorization failed. Information entered does not match our records|400|
|Service Authorization|260225|Card authorization failed. Card type not supported|400|
|Service Authorization|260231|Loyalty account authorization failed|400|
|Service Authorization|260232|Dispenser could not be authorized because loyalty already presented. |400|
|Service Authorization|260233|Loyalty not available at site |400|
|Service Authorization|260217|Transaction velocity limit reached. Please try after 24hrs.|400|
|Service Authorization|260218|Payment Instrument Details mismatch. Please contact card issuer for assistance.|400|
|Service Authorization|260219|Network Error. Please contact card issuer for assistance.|500|
|Service Authorization|269802|Transaction denied. Please try after some time.|500|
|Service Authorization|262601|Payment instrument not supported for the transaction|400|
|Service Authorization|262602|This funding source become invalid. Please select another method of payment|400|
|Service Authorization|262603|Transaction is pending at POS. Check at the POS to make sure if it is authorized|400|
|Auth Transaction|262601|Payment instrument not supported for the transaction|400|

## Petro Transaction Status

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Transaction Status Update|260309|The dispenser is already fueling|400|
|Transaction Status Update|260312|The dispenser is already processing request to cancel|400|
|Transaction Status Update|260315|Transaction has been already Cancelled|400|
|Transaction Status Update|260316|Transaction has been already Completed|400|
|Transaction Status Update|260318|Authorization has not found|400|

## Provisioning

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Provision|279912|Invalid request: Provision not found/valid|400|
|Provision|279914|The issuer could not continue with provision operation. Kindly contact the card issuer operations directly|400|
|Provision|279915|Authorization process could not be completed as there are no phone numbers available on file. Kindly contact the card issuer operations directly|400|
|Provision|279916|Issuer has declined the request to provision the card|400|
|Provision|279917|Provided information does not match records. Kindly enter the details again|400|
|Apply buy|279925|Invalid request: Requested application is invalid|400|

## Value Add Services

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Value Add Services|280001| Operation was unsuccessful. Please check the account details.|400|
|Value Add Services|280002| Please narrow the date range.|400|
|Value Add Services|280003| Offer expired.|400|
|Value Add Services|280004| Invalid login or password.|400|
|Value Add Services|280005| Error: transaction not found.|400|
|Value Add Services|280006| Invalid location or transaction.|400|
|Value Add Services|280007|Email is already used, invalid or blocked.|400|
|Value Add Services|280008|Unable to retrieve loyalty offer, please complete your purchase and try again.|400|
|Value Add Services|7085| Service unavailable|400|

## Loyalty

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Loyalty Service|300001| Transaction Processing Failure. This is a permanent failure|400|
|Loyalty Service|300002|Transaction Processing Failure. This is a temporary failure and the transaction will be retried later|400|

## Order

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|Order Services |310000| Missing Header Data|400|
|Order Services |310001| Missing Query Parameter|400|
|Order Services |310002| Missing External Customer ID|400|
|Order Services |310003| Missing Field Error|400|
|Order Services |310004| Expected resource is not available. Resource not found|400|
|Order Services |310005| Delivery quotes not found|400|

## 3DS Integration

|Use Case|Response Code|Response Message|Http Status Code|
|-------|-------------|----------------|----------------|
|3DS |269701|ThreeDSecure authentication declined.|400|
|3DS |269702|Failed to complete ThreeDSecure authentication.|400|
|3DS |269703|Merchant Acquired Bin party configuration does not found||400|
