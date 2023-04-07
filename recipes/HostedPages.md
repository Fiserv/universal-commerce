1. **Roles** 

There are 4 roles 

![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.002.png)

1. **Mobile Application (App)** - This could be a native mobile application running on IOS or Android devices. This could also be a web application running on a 

browser. 

2. **Mobile Application Server (MAS)** - This is a server which is a communication bridge between the App and uCom. It also stores uCom developer 

account information like app id, app secret, and encryption key securely.

3. **Hosted Page (HP)** - This is a web page rendered on native webview or browser which will display the UI to let user enter their account information like Credit card, 

debit card, gift card etc. This page securely captures the account information from user and passes it to uCom server. When finished, the page sends the result to redirectUrl.

4. **uCom Server (uCom)** - This is the Fiserv solution server which provides all 

the apis. This server sits behind Apigee.

2. **Setup** 

We need following parameters to use HP

1. **Api-Key** - This will be generated for you when you create an Apigee account. This should be saved securely on MAS and shared with App. Api-key is fixed for a merchant. 
1. **Api-Secret** - This will be generated for you when you create an Apigee account. This should be saved securely on the application server. This should NOT be shared with app. Api-key is fixed for a merchant.
1. **Redirect Url/MAS Url (Asynchronous)** - All the Hosted pages responses(error/success) will be responded back to JavaScript main return callback only. Responses should be parsed and handled from JavaScript callback. Additionally same responses will be delivered to your MAS URL by Hosted pages via HTTP POST (Ajax Call) asynchronously. This API should be provided by MAS. MAS has to enable CORS for Fiserv origin “int.api.firstdata.com/cat.api.firstdata.com /prod.api.firstdata.com””. This can be used for auditing purposes when web browser or app got crashed accidently. 
1. **FDCustomerId** - This must be obtained using other uCom apis. This is optional when you initate SDK with guest checkout option.
1. **PageLink (url and relation)** - This is the unique page which is going to display the use case. Url is the address where page is hosted, and Relation is the name of 

the use case. PageLink can be retrieved run time via the api (ucom/v1/hosted - pages/pages) and can be cached. We prefer that PageLink should be freshly fetched. The page contents are configured offline.

3. **Flow** 

![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.003.png)

1. **Start a New Session** 

App calls MAS to get tokenId, encryptionKey and pageLink. tokenId and encryptionKey should not be cached or stored on the app and should be fetched from MAS. The tokenId and encryptionKey expires frequently and therefore this step should be done every time user starts the flow. 

![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.004.png)

1. **App calls MAS** The api between app and MAS is not part of this document. It’s up 

to the merchant to decide this part of the transaction.

2. **MAS calls uCom to getToken** MAS has to call uCom to get a tokenId. MAS should not cache the tokenId. getToken call will provide the one time session token and public key which needs to be passed to SDK to launch HP.



|||**CAT:   https://int.api.firstdata.com/ucom/v1/tokens**|
| :- | :- | - |
|Api (HTTP POST) ||**PREPROD:   https://cat.api.firstdata.com/ucom/v1/tokens**|
|||**PROD:**   **https://prod.api.firstdata.com/ucom/v1/tokens**|
|Document |||
|||Content-Type = application/json|
|Headers ||Api-Key = {api-key} Authorization = HMAC {signature}|
|||Timestamp = {time UTC in milliseconds}|
|||{ |
|||"token" : {|
|Body ||"fdCustomerId" : "123456789" } |
|||<p>}, </p><p>publicKeyRequired: true</p>|
|||{ |
|||"tokenId": "cZq0YBzOZuhS90Udzl8Nlp35uq4w",|
|||"fdCustomerId": "1234",|
|||"issuedOn": 1507684425488,|
|||"expiresInSeconds": 599,|
|||"publicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBC|
|||gKCAQEAwoEfMkE6Ly12XoucbmT1f7Hvn |
|||BLSXZvOowzMKg57EqpWeB1F4JmeZTsqiC8X2t0xnhaY6|
|||SjD1xBEPfsFXN07smIsntWfzENPxyPhbtwqXtDau|
|Sample Response HTTP 201||hfr1yqTxHRCzO393KwotFio6tkwLUsR76|
|||zsqJ4tIm49zp4JAzE8gHK4S3|
|||71k/X6YOIFOefuzc9mLcg+L+fakRcVOM |
|||hF/HldKyw+tda4TBPE+S/RMdksoF+IYFaD668hzUrwMK|
|||oBYg1ZCc6YmnthWTIM1mWr5wGK |
|||YoQnMDWPsWAcG6N5r28vk4YHBfA9gnu |
|||xC7EehDkDk4CR3TjrIhg+W2yTkew8YJYRbKwUeEhZqQIDAQAB",|
|||"algorithm": "RSA/NONE/PKCS1Padding",|
|||"status": "ACTIVE"|
|||}|

**How to generate HMAC signature**

```json

var key = “”;//the 'Api-Key' ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.005.png)

var secret = “”;//the 'Api-Secret';

var time = new Date().getTime(); // use this time in header var method = request.method;

var rawSignature = key + ":" + time; var requestBody = request.data;

if(method != 'GET' && method != 'DELETE'){

var payload\_digest = CryptoJS.SHA256(requestBody);

var b64BodyContent = CryptoJS.enc.Base64.stringify(payload\_digest); rawSignature = rawSignature + ":" + b64BodyContent;

} 

var signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(rawSignature, secret))); // use this in header

```

**3. MAS calls uCom to get page link** MAS can cache the page link for future reference though we do not recommend that. Merchant may have configured multiple pages and therefore this api will return all of them. Each page can be identified by the relation.



|Api (HTTP GET) |**https://int.api.firstdata.com/ucom/v1/hosted-pages/pages**|
| :- | - |
|Document ||
|Headers |<p>Content-Type = application/json Authorization = HMAC {signature} Api-Key = {api-key} </p><p>Timestamp = {time UTC in milliseconds}</p>|
|Sample Response |<p>{ ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.006.png)</p><p>"\_links": [</p><p>` `{ </p><p>"href": "https://int.api.firstdata.com/ucom/v1/hosted - pages/pages/f74237ec-112a-4204-a37b-2cfe9daa904f", </p><p>"rel": " account.add",</p><p>"method": "GET",</p><p>"version": "v2"![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.007.png)</p><p>` `} </p>|

] }![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.008.png)

2. **Load Hosted Page** 

To start the hosted page, app needs api-key, pageLink, tokenId, fdCustomerId, encryptionKey and redirectUrl. Mobile apps must make sure that they have disabled webview caching and enabled loading javascript in webview.

**3.2.1 Mobile Webview Integration Steps** 

**Step1:**  

Load the below URL in WebView 



|**Environment** |**WebView URL** |
| - | - |
|CAT |https://int.api.firstdata.com/ucom/v2/static/v2/mobile/int/ucom-sdk.html |
|||
|PRE-PROD |https://cat.api.firstdata.com/ucom/v2/static/v2/mobile/cat/ucom -|
||sdk.html |
|PROD |https://prod.api.firstdata.com/ucom/v2/static/v2/mobile/prod/ucom -|
||sdk.html |
**Step2:**  

Call **uComClient.init()** javascript method with configuration objects after WebView is loaded ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.009.png)

uComClient.init({ 

"accessToken": "<token-id>>", 

"apiKey": "<API-key>", 

//If guest checkout then do not pass fdCustomerId  "fdCustomerId": "<fdCustomerId>", 

//Get it from pageLink  

"pageId": "<page-id>>", 


"encryptionKey": "<Encryption-Key>", ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.010.png)"redirectUrl": "<MAS-URL>" 

});Note: Please refer additional params section 3.2.3

**Step3:**  

Set local redirection listener

A redirection listener should be set on the webview to catch the event that HP has finished its work. HP will call this redirection in case of permanent failures and final success(nonce). A permanent failure is if js fails to load or Ajax call fails or tokenId has expired or encryptionKey invalid. 

Once HP get response from uCom then it will do URL redirect with encoded URI. **Redirection Listener URL:** 

ucom://finish?response=response-payload-object-string

**Note:** Webview redirection listener URL should be decoded before handle it.

1. **IOS Sample Code Snippets** 
1. #Load HP static URL in webview   ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.011.png)
1. - (**void**) successfulMASRequestWithResponseDictionary:(NSDictionary \*)response {   
1. // Step 2 - Load Hosted Pages   
1. NSString \*tokenId = response[@"tokenId"];   
1. NSString \*apiKey = response[@"apiKey"];   
1. NSString \*fdCustomerId = response[@"fdCustomerId"];   
1. NSString \*url = response[@"href"];   
1. NSString \*requestURL = [NSString stringWithFormat:@"https://%@.api.firstdata.com/u com/v2/static/v2/ucom-sdk.html", MAS.masSharedManager.environment];   
1. hostedPageRequest = [[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString: requestURL]];   
1. // Load   
1. dispatch\_async(dispatch\_get\_main\_queue(), ^{   
1. [self->\_webView loadRequest:hostedPageRequest];   
1. [self->\_webView reloadFromOrigin];   
1. });   
1. }   
 
1. #Once webview loaded then pass configuration object and call HP javascript method   
1. - (**void**) webView:(WKWebView \*)webView didFinishNavigation:(WKNavigation \*)navigatio n {   
1. MAS \*sharedInstance = [MAS masSharedManager];   
1. NSString \*execTemplate =    
1. @"uComClient.init({   
1. \"apiKey\":\"%@\",   

23. \"redirectUrl\":\"%@\",   ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.012.png)
23. \"fdCustomerId\":\"%@\",   
23. \"pageId\":\"%@\",   
23. \"accessToken\":\"%@\",   
23. \"encryptionKey\":\"%@\",   
23. \"env\":\"%@\"});";   
23. NSString \*exec = [NSString stringWithFormat:execTemplate,sharedInstance.apiKey,  \_redirectUrl,    
23. sharedInstance.fdCustomerId, sharedInstance.pageId, sharedInstance.bearer,   
23. sharedInstance.encryptionKey, sharedInstance.environment];   
23. [\_webView evaluateJavaScript:exec completionHandler:nil];   
23. **if** ([\_activityIndicatorView isAnimating]) {   
23. [\_activityIndicatorView stopAnimating];   
23. }   
23. }   
 
23. #pragma mark WKNavigationDelegate methods (Redirection Listener Methods)   
23. - (**void**) webView:(WKWebView \*)webView decidePolicyForNavigationAction:(WKNavigation Action \*)navigationAction decisionHandler:(**void** (^)(WKNavigationActionPolicy))decisionH andler {   
23. //Step 4 - Handle finish redirection   
23. NSString \*requestURL = navigationAction.request.URL.absoluteString;   
23. NSLog(@"Redirect has occurred ...");   
23. NSLog(@"Request Url: %@", requestURL);   
23. **if** ([requestURL hasPrefix:@"ucom://finish"]) {   
23. // This is the clue that Hosted Posted is finished   
23. NSLog(@" --------------------------------------------------------------

");   

47. NSLog(@"| REQUEST URL: %@", requestURL);   
47. NSLog(@" --------------------------------------------------------------

");   

49. decisionHandler(WKNavigationActionPolicyCancel);   
49. NSString \*resultStr = [[requestURL componentsSeparatedByString:@"ucom://fin ish?response="].lastObject stringByRemovingPercentEncoding];   
49. UIAlertController \*alertController = [UIAlertController alertControllerWith Title:@"Result" message:resultStr preferredStyle:UIAlertControllerStyleAlert];   
49. UIAlertAction \*okButton = [UIAlertAction actionWithTitle:@"OK" style:UIAler tActionStyleDefault handler:^(UIAlertAction \* \_Nonnull action) {   
49. [self.navigationController popViewControllerAnimated:YES];   
49. }];   
49. [alertController addAction:okButton];   
49. [self presentViewController:alertController animated:YES completion:nil];   
49. } **else** {   
49. // Otherwise don't intercept   
49. decisionHandler(WKNavigationActionPolicyAllow);   
49. } }   
2. **Android Sample Code Snippets** 

@Override![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.013.png)

protected void onCreate(Bundle savedInstanceState) {

super.onCreate(savedInstanceState); setContentView(R.layout.activity\_web); 

// Load Hosted Pages

String url = ""; 

url = 

String.format("https://%s.api.firstdata.com/ucom/v2/static/v2/mobile/%s/ucom - sdk.html"![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.014.png), getEnvironmentString(env), getEnvironmentString(env));

FDLogger.INSTANCE.d(TAG,url);

HashMap<String, String> headers = new HashMap<>(); 

headers.put(Constants.Header.API\_KEY, apiKey);

headers.put(Constants.Header.AUTHORIZATION, Constants.Header.BEARER + tokenId);

headers.put(Constants.Header.TIMESTAMP, String.valueOf(new Date().getTime())); FDLogger.INSTANCE.map(TAG,headers);

webView.loadUrl(url, headers);

webView.setWebViewClient(new WebViewClient(){ 

@Override

public void onPageFinished(WebView view, String url) { 

super.onPageFinished(view, url); progressBar.setVisibility(View.GONE); 

String javascript = ""; 

//Initialize the SDK with SDK configuration params by calling this ucomSDK.init() method and pass required parameters

javascript = String.format( 

"uComClient.init({" + 

"\"%s\":\"%s\"," + 

"\"%s\":\"%s\"," + 

"\"%s\":\"%s\"," + 

"\"%s\":\"%s\"," + 

"\"%s\":\"%s\"," + 

"\"%s\":\"%s\"," + 

"\"%s\":\"%s\"" + 

"});", 

Constants.BundleKey.API\_KEY, apiKey, Constants.BundleKey.REDIRECT\_URL, redirectUrl, Constants.BundleKey.FD\_CUSTOMER\_ID, fdCustomerId, Constants.BundleKey.PAGE\_ID, pageId, Constants.BundleKey.ACCESS\_TOKEN, tokenId, ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.015.png)Constants.BundleKey.ENCRYPTION\_KEY, encryptionKey, Constants.BundleKey.ENV, getEnvironmentString(env));

FDLogger.INSTANCE.d(TAG, javascript); webView.evaluateJavascript(javascript, null); 

} 

@RequiresApi(api = Build.VERSION\_CODES.LOLLIPOP) 

@Override

public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) { 

Uri uri = request.getUrl(); FDLogger.INSTANCE.d(TAG,uri.getScheme()); FDLogger.INSTANCE.d(TAG,uri.getPath());

// Handle finish redirection

String resultString = request.getUrl().toString(); 

String decodedstr = null; 

if (resultString.startsWith("ucom://finish")) {

// This is the clue that Hosted Posted is finished

Log.i(TAG, "REQUEST URL: " + resultString);

try { 

decodedstr = URLDecoder.decode(resultString, "UTF-8"); 

} catch (UnsupportedEncodingException e) { e.printStackTrace(); 

} 

Log.i(TAG, "Decoded String: " + decodedstr);

if (!resultString.startsWith("ucom://finish?result=failure")) { finish(); 

return true; 

} 

} 

else { 

// Otherwise don't intercept

Log.i(TAG, "REQUEST URL: " + resultString);

} 

return super.shouldOverrideUrlLoading(view, request);

} 

}); 

} 

2. **Website Integration Steps** 
1. Include the uCom SDK library on head tag on your html page 

**URL:**  **https://<env>.api.firstdata.com/ucom/v2/static/v2/js/ucom-sdk.js** **Environment Variable:** <**int/cat/prod>** 



|**Variable** |**Environment** |
| - | - |
|INT |CAT/CERT |
|CAT |PRE-PROD |
|PROD |PRODUCTION |
2. Initialize the SDK with SDK configuration params by call this **ucomSDK.init()** method 
1. Pass access toekn
1. Pass API Key 
1. Pass fdCustomerId

d: Pass pageURL 

e: Pass Mount Id where SDK needs to be mounted on the screen

6. Pass EncryptionKey 
6. Pass RedirectUrl 
3. Call **uComSDK.start()** method to render SDK on mounted element on your page
3. Call **uComSDK.stop()** whenever you want to kill the SDK from the page.

**Note: The javascript method should be called after the web content is loaded. Refer the sample code below**

**3.2.2.1 Web Sample Code** 

<html> ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.016.png)<head> 

<!-- uCom SDK  --> 

<script src="https://int.api.firstdata.com/ucom/v2/static/v2/js/ucom - sdk.js"![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.017.png)></script> 

</head> 

<body> 

<!-- uCom SDK container --> 

<div id="ucom-container"></div> 

<script> 

/\*  

// return Callback method

// Hosted Pages Response (Error/Success) will be returned to this callback once the hosted page actions get completed.![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.018.png)

\*/ 

function returnCallBack(response) { 

console.log('UCOM response:', response); 

/\* Kill the uCom UI \*/

ucomSDK.stop(); 

/\* Do rest of the flow here \*/

} 

//Configuration object

var configs = { 

"accessToken": "<access-token>", 

"apiKey": "<API-KEY>", 

"fdCustomerId": "<transaction-id>", 

"pageUrl": "https://int.api.firstdata.com/ucom/v1/hosted - pages/pages/<your-page-id>", 

"mountId": "ucom-container", 

"encryptionKey": "<encryption-key>", 

"redirectUrl": "<redirect-url>", 

/\*Below attribute should be enabled when you integrate and test it on http://localhist in lower (CAT) environment. This attribute should be removed in higher environment\*/![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.019.png)

/\* "debug": true \*/

} /\* 

ucomSDK.init(<configs>, <callbackMethod>, <isLoggingEnabled>);![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.020.png)

@params  

configs          - configurations object,

callbackMethod   - callback method,

isLoggingEnabled - pass true to enable console debug logging(true/false) \*/ 

//Initialize the uCom SDK with configurations

ucomSDK.init(configs, returnCallBack); 

//Event Subscribe

ucomSDK.on('ready', function() {

//Handle ready event

}); 

ucomSDK.on('change', function(event) { 

if (event.formValid) { 

//Enable pay button

} else { 

//Disable pay button

} 

}); 

ucomSDK.on('error', function(response) { 

//Handle Error Response

}); 

ucomSDK.on('success', function(response) { 

//Handle nonce

}); 

//Start the uCom UI

ucomSDK.start(); </script> 

</body> 

</html> 

Please refer below table for additional sdk configurations properties 

3. **SDK Configuration property Value** 



|SDK Params |Required/Optional |Description |
| - | - | - |
|accessToken |R |Session Token Id |
|apiKey |R |API Key |
|fdCustomerId |R |First data Customer Id |
|PageURL |R |Page link url of the page |
|mountId |R |Mount Id where HP should be rendered |
|encryptionKey |R |Public key from session token response to encrypt the data |
|redirectUrl |O |MAS URL to capture all the hosted pages response for auditing purpose. |
|orgId |O |Org id should be passed if Threatmetrix should be enabled on HP |
|sessionId |O |Session id should be passed if Threatmetrix should be enabled on HP |
|extraObject |O |<p>Additional details can be passed to HP to generate nonce as part of card detail. Eg:  ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.021.png)</p><p>"billingAddress":  </p><p>{ </p><p>`        `"type": "work", </p><p>`        `"streetAddress": "100 universal city plaza", ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.022.png)</p><p>`        `"locality": "Hollywood",         "region": "CA", ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.023.png)</p><p>`        `"postalCode": "98290", ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.024.png)</p><p>`        `"country": "US", </p><p>`        `"formatted": "100 universal city plaza, Hollywood, CA 98290 USA",         "primary": true ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.025.png)</p><p>} </p>|
|debug  |O |<p>Eg:  ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.026.png)</p><p>debug: true </p><p>This attribute should be passed if you develop and integrate it on localhost (**http://localhost)** and bypass </p>|


|||<p>the https error on CAT environment. ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.027.png)</p><p>Note: This attribute should be ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.028.png)removed in higher environment. </p>|
| :- | :- | :- |
3. **Handle POST from Hosted Pages** 

Once HP is finished, it will send the result app callback URL and redirectUrl(POST URL). MAS must implement this api to receive the result body. MAS will have to enable CORS on their end to allow access from javascript originating from “int.api.firstdata.com / prod.api.firstdata.com”. 

![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.029.png)

**3.3.1 Hosted Pages Response Payload** 

1. **New Card**  
1. **Failure**  

This is the failure response payload from uCom API 

"response":{  ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.030.png)

"code":"279912", 

"message":"Decryption failed.", 

"category":"common", 

"developerInfo":{   

"developerMessage":"Decryption failed due to invalid/expired keyId.", "fieldError":[   

{   

"field":"KeyId/Algorithm error.", 

"message":"crypto-service: Single use key has already been used (CR008): Key#9bff66d610b48efb829a409c8d619f1dc8306da8fb10d997abbed44fc353fa21" } 

] 

} 

} 

} 

2. **Success**  

This is the success response payload from uCom API 

{   ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.031.png)

"type":"CREDIT", 

"token":{  

"tokenType":"CLAIM\_CHECK\_NONCE", 

"tokenProvider":"UCOM", 

"tokenId":"4f0dd98e-bf56-499c-b562-7936ca20964c" }, 

"isSaveCard":true, 

"credit":{ 

"nameOnCard":"Michael John", "cardType":"VISA", 

"alias":"2345" 

} 

} 

3. **Success Response with SDK Error** 

This is the success response with sdk errors payload. Sometimes card will be enrolled 

successfully but SDK will fail to post the response into redirect URL due to some reason. In this case SDK will send back with success response with SDK errors. 

{   ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.032.png)

"type":"CREDIT", 

"token":{  

"tokenType":"CLAIM\_CHECK\_NONCE", 

"tokenProvider":"UCOM", 

"tokenId":"4f0dd98e-bf56-499c-b562-7936ca20964c" }, 

"isSaveCard":true, 

"credit":{ 

"nameOnCard":"Michael John", "cardType":"VISA", 

"alias":"2345" 

}, 

"developerInfo":{ 

"developerMessage":"Redirect URl is failure", "fieldError":[{ 

"code": 1013, 

"field":"Redirect URL", "message":"Redirect URL is failure"

} 

] 

} 

} 

4. **Success with Threatmetrix Details** 

This is the enrollment response with TM(Threatmetrix) payload from uCom API 

{   ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.033.png)

"type":"CREDIT", 

"token":{  

"tokenType":"CLAIM\_CHECK\_NONCE", 

"tokenProvider":"UCOM", 

"tokenId":"4f0dd98e-bf56-499c-b562-7936ca20964c" }, 

"isSaveCard":true, 

"credit":{ 

"nameOnCard":"Michael John", 

"cardType":"VISA", 

"alias":"2345" 

}, 

"userSysDetails":{ 


"orgId":"8cz43sdv", ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.034.png)"sessionId":"2fb1a98a-7182-497f-bc2a-79c37e556cb2"

} 

} 

5. **Success with Extra Params Details** 

Merchant has the ability to pass the billing address into SDK. If they inject the billing address into SDK then that information will be part of the response. 

{   ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.035.png)

"type":"CREDIT", 

"token":{  

"tokenType":"CLAIM\_CHECK\_NONCE", 

"tokenProvider":"UCOM", "tokenId":"4f0dd98e-bf56-499c-b562-7936ca20964c"

}, 

"isSaveCard":true, 

"credit":{ 

"nameOnCard":"Michael John", 

"cardType":"VISA", 

"alias":"2345", 

"billingAddress": { 

"type": "work", 

"streetAddress": "100 universal city plaza", 

"locality": "Hollywood", 

"region": "CA", 

"postalCode": "98290", 

"country": "US", 

"formatted": "100 universal city plaza, Hollywood, CA 98290 USA", "primary": true 

} 

} 

} 

2. **Vaulted Card**  
1. **Failure**  

This is the failure response payload from uCom API 

{ ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.036.png)

"response":{  

"code":"279912", 

"message":"Decryption failed.", 

"category":"common", 

"developerInfo":{   

"developerMessage":"Decryption failed due to invalid/expired keyId.", "fieldError":[   

{   

"field":"KeyId/Algorithm error.", 

"message":"crypto-service: Single use key has already been used (CR008): Key#9bff66d610b48efb829a409c8d619f1dc8306da8fb10d997abbed44fc353fa21" } 

] 

} 

} 

} 

2. **Success**  

This is the success response payload from uCom API 

{   ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.037.png)

"type":"VAULTED\_ACCOUNT", 

"token":{  

"tokenType":"CLAIM\_CHECK\_NONCE", "tokenProvider":"UCOM", "tokenId":"4f0dd98e-bf56-499c-b562-7936ca20964c"

}, 

"credit":{ 

"cardType":"VISA", "alias":"2345" 

} 

} 

3. **Success Response with SDK Error** 

This is the success response with sdk errors payload. Sometimes card will be enrolled 

successfully but SDK will fail to post the response into redirect URL due to some reason. In this case SDK will send back with success response with SDK errors. 

{   ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.038.png)

"type":"VAULTED\_ACCOUNT", 

"token":{  

"tokenType":"CLAIM\_CHECK\_NONCE", 

"tokenProvider":"UCOM", 

"tokenId":"4f0dd98e-bf56-499c-b562-7936ca20964c" }, 

"credit":{ 

"cardType":"VISA", 

"alias":"2345" 

}, 

"developerInfo":{ 

"developerMessage":"Redirect URl is failure", "fieldError":[{ 

"code": 1013, 

"field":"Redirect URL", "message":"Redirect URL is failure"

} 

] 

} 

} 

4. **Success with Threatmetrix Details** 

This is the enrollment response with TM(Threatmetrix) payload from uCom API 

{ ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.039.png)

"type":"VAULTED\_ACCOUNT", 

"token":{  

"tokenType":"CLAIM\_CHECK\_NONCE", "tokenProvider":"UCOM", "tokenId":"4f0dd98e-bf56-499c-b562-7936ca20964c"

}, 

"credit":{ 

"cardType":"VISA", "alias":"2345" 

}, 

"userSysDetails":{ 

"orgId":"8cz43sdv", 


"sessionId":"2fb1a98a-7182-497f-bc2a-79c37e556cb2"![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.040.png)

} 

} 

5. **Success with Extra Params Details** 

Merchant has the ability to pass the billing address into SDK. If they inject the billing address into SDK then that information will be part of the response. 

{   ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.041.png)

"type":"VAULTED\_ACCOUNT", 

"token":{  

"tokenType":"CLAIM\_CHECK\_NONCE", "tokenProvider":"UCOM", "tokenId":"4f0dd98e-bf56-499c-b562-7936ca20964c"

}, 

"credit":{ 

"cardType":"VISA", 

"alias":"2345", 

"billingAddress": { 

"type": "work", 

"streetAddress": "100 universal city plaza", 

"locality": "Hollywood", 

"region": "CA", 

"postalCode": "98290", 

"country": "US", 

"formatted": "100 universal city plaza, Hollywood, CA 98290 USA", "primary": true 

} 

} 

} 

4. **Events** 

The only way to communicate with HP is by listening to an event. HP will emit and communicate back if you are subscribed with those events. 

ucomSDK.on(event, handler); ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.042.png)

1. **onReady** 

Triggered when iFrame is fully rendered and can accept user’s inputs 

ucomSDK.on('ready', function() {  ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.043.png)//Handle ready event

}); 

2. **onChange** 

Triggered when form value changed. The event payload always contains object with form valid status. 

ucomSDK.on('change', function() {  ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.044.png)if (event.formValid) { 

`  `//Enable pay button

` `} else { 

`  `//Disable pay button

` `} 

}); 

Handler Event Object 

{ ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.045.png)

` `"elementType": "payment", 

` `"formValid": false ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.040.png)} 

3. **onError** 

Triggered when HP’s API errors. The event payload object contains API error which needs to be handled on app. Please refer the **section 3** for error payload structure. 

ucomSDK.on('error', function(response) { ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.046.png) //Handle Error Response

}); 

4. **onSuccess** 

Triggered when HP’s nonce generated. The event payload object contains nonce which needs to be handled on app. Please refer the **section 3** for error payload structure. 

ucomSDK.on('success', function(response) {  ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.047.png)//Handle Nonce 

}); 

5. **API Error Status Codes** 

Below error status code needs to be handled from client side. These API error responses will be communicated back to App JavaScript main callback to handle the errors and show the appropriate error dialog. 

**51 Error Responses Before Screen Render** 

Following errors will be thrown before hosted pages screen render 



|**Status Code** |**Transaction Status Desc** |**Comments** |
| - | - | - |
|**269904** |**Configuration record(s) not found.** |**When we pass the invalid page id then API will throw this error** |
|**401** |**Unauthorized** |**This error will occur when we pass invalid access token id.**  |
Example response payload 

{ ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.048.png)

"response": { 

"code": "269904", 

"message": "Configuration record(s) not found.", "category": "common", 

"developerInfo": { 

"developerMessage": "Configuration record(s) not found." } 

} 

} 

{ ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.049.png)

"response": { 

"code": 401, 

"message": "Unauthorized", "category": "common", "developerInfo": { 

"developerMessage": "Unauthorized"

} ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.040.png)

} 

} 

**5.2 Error Responses After Form Submission** 

Following errors will be thrown after hosted pages screen render 



|` `**Status Code** |**Transaction Status Desc** |**Comments** |
| - | - | - |
|**279912** |**Decryption failed.** |**When we pass the invalid or already used public key into SDK then API will throw this error.** |
|**269901** |**Unable to process your request, please try again later, if problem persist, contact sys admin.** |**This error will occur when our backend is down.** |
|**401** |**Access Token expired / Unauthorized** |**This error will occur when user idle and try to submit the rendered form with expired access token.** |


Example response payload:  

{ ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.050.png)

"response": { 

"code": "279912", 

"message": "Decryption failed.", 

"category": "common", 

"developerInfo": { 

"developerMessage": "Decryption failed due to invalid/expired 

keyId.", 

"fieldError": [{ 

"field": "KeyId/Algorithm error.", 

"message": "crypto-service: Single use key has already been used (CR008): Key#9bff66d610b48efb829a409c8d619f1dc8306da8fb10d997abbed44fc353fa21" ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.051.png)}] 

} 

} 

} 

{ ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.052.png)

"response": { 

"code": 401, 

"message": "Unauthorized", "category": "common", "developerInfo": { 

"developerMessage": "Unauthorized" } 

} 

} 

6. **Native/Web Button Submit** 

HP will allow to submit the form through mobile native button or website button from outside iFrame. Following command will trigger the save action![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.053.png)

//Trigger form save from outside iFrame or web view ucomSDK.triggerSaveAction(); 

7. **FAQ's** 
1. **How to enable CORS in server?** 

Browser/App will be sending the preflight request (OPTIONS method) instead of actual method(POST/GET) to server when access different domain in ajax call. In this case, we have to handle and enable CORS in server to handle this preflight request. OPTIONS method has to be handled and respond with following request:

access-control-allow-headers  ACCEPT, fdCustomerId, ORIGIN, AUTHORIZATION, CONTENT-TYPE ![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.054.png)

access-control-allow-methods  POST, GET, OPTIONS access-control-allow-origin  \*

allow  GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH connection  Keep-Alive 

content-language  en-US 

content-length  0

date  Tue, 19 Dec 2017 23:14:23 GMT

keep-alive  timeout=10, max=100

x-powered-by  Servlet/3.0

Once browser/app receives the above as a response header then, it will subsequently invoke actual methods.

2. **Multiple Languages Support** 

HP supports all texts in multiple languages. This process is manual and someone has to provide all texts displayed by HP in different languages. Please note that error messages from uCom server do not support multiple languages in current version.

3. **How to enable Threatmetrix feature on Hosted Pages** 

Threatmetrix feature can be enabled on HP when you pass the orgId and sessionId in SDK configuration parameters.

6. **How to control the look and feel?** 

HP customization is limited. But it provides option to change the following style properties

1. Background Color, Text color 
1. Label Changes 
1. Native Button (Form can be triggered from outside of iFrame)
1. Fields position changes 
1. Label position (Above or floating) Changes 
1. Hint text changes 

**Sample Form** 

**Default View** 

![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.055.jpeg)

**Error View** 

![](HP.a2aa8847-ce11-46ac-9d67-daa7836546bd.056.png)

7. **Local Validation by Hosted Page** 

HP will do its own local validation of fields and show error to user. Local validation is configurable. 

© 2023 Fiserv, Inc. 
