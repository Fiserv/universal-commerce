# Interactive Guide

## Getting Started

EMV® 3-D Secure (EMV 3DS) helps payment card issuers and merchants around the world prevent card-not-present (CNP) fraud and increase the security of e-commerce payments.

3-D Secure is an additional security layer for online credit and debit card transactions. The name refers to the "three domains" which interact using the protocol: the merchant/acquirer domain, the issuer domain, and the interoperability domain.

EMV Co enable COF transactions for uCom clients that provide 100% liability shift for our merchants.
Mobile app and uCom shall integrate with EMV 3-D Secure 2.2 specification to support digital payment channels and the delivery of industry leading security, performance and user experience.


# Core Sequence

1.  uCom receives a request to initiate payment on an open loop credit card.
    1.  This request could be any one of:
        1.  Payments
        2.  Account Onboarding
        3.  Petro Transaction
    2.  Initial request will contain additional data in the device info section of the request
2.  uCom initiates a 3DS Authentication call to 3DS Server
    1.  uCom initiates this request only if the partner is enabled for 3DS
    2.  Response can be one of:
        1.  Success
        2.  Challenge
        3.  Decline
    3.  If success, uCom proceeds onto payment authorization - this FEP authorization message will include additional data elements from the 3DS Authentication step
    4.  By means of a decision flag, a challenge or decline response may be forwarded onto the payment authorization step.
3.  If challenge flow needs to be initiated, a "3DS Authentication Challenge Needed" response is sent as the response to the App Server.
    1.  App Server / App then conducts challenge interactions with the issuer out of band from uCom.
4.  Once App Server / App completes the challenge flow, App Server reinitiates the payment request in the form of a PATCH operation
    1.  Again, this request can be any one of those listed in 1.a.
    2.  This PATCH request will likely contain nothing but a nonce id (in the case of Account Onboarding request) OR a transaction id (in the case of the other requests)
5.  uCom initiates a Status Check call to 3DS Server
    1.  Response can be one of:
        1.  Success
        2.  Decline
    2.  If success, uCom proceeds onto payment authorization - this FEP authorization message will include additional data elements from the 3DS Authentication step.

     **Types of 3DS flows:**

1.  Frictionless flow
    
2.  Challenge Flow
    
    
## Scope

1.  Apis
    1.  Add Account (Card verification)
    2.  Petro Transaction (Payment transaction is Authorization)


    ## Dependencies

1.  Availability of IPG (3DS) Set-up
2.  Modirum Simulator and SDK set-up by the front end


    
## Error Message

The following error codes are introduced as part of 3DS integration

| Code |Message  |
|--|--|
| 269702 | Failed to complete ThreeDSecure authentication. |
|269701| ThreeDSecure authentication declined.


