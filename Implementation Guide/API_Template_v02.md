<html>
<head>
<title>API_Template_v02.md</title>
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

<!-->
<pre><a name="l1"><span class="ln">1    </span></a><span class="s0">---</span>
<a name="l2"><span class="ln">2    </span></a><span class="s2">tags</span><span class="s1">: [</span><span class="s2">Universal Commerce, Carat, Enterprise, customer-authorized, merchant-stored, tokens-request, payment-token,</span>
<a name="l3"><span class="ln">3    </span></a><span class="s2">api-reference, customer service, </span><span class="s1">[</span><span class="s2">Endpoint</span><span class="s1">]])]</span>
<a name="l4"><span class="ln">4    </span></a><span class="s0">---</span>
<a name="l5"><span class="ln">5    </span></a><span class="s3"># </span><span class="s2">First Data Universal Commerce Services - Client Name </span>
<a name="l5"><span class="ln">5    </span></a><span class="s3"># </span><span class="s2">REST API Specification</span>
<a name="l5"><span class="ln">5    </span></a><span class="s3"># </span><span class="s2">Document Version #  </span>
<a name="l5"><span class="ln">5    </span></a><span class="s3"># </span><span class="s2">Date</span>
<a name="l21"><span class="ln">21   </span></a>
<a name="l22"><span class="ln">22   </span></a><span class="s1">&lt;!-- comment --&gt;</span>
<a name="l23"><span class="ln">23   </span></a><span class="s1">&lt;!-- theme: success --&gt;</span>
<a name="l24"><span class="ln">24   </span></a><span class="s1">**</span><span class="s2">GET | HEAD | POST | PUT | DELETE | TRACE | CONNECT</span><span class="s1">** </span><span class="s0">`</span><span class="s2">path, e.g., /v1/customers</span><span class="s0">`</span>
<a name="l25"><span class="ln">25   </span></a>
<a name="l26"><span class="ln">26   </span></a><span class="s2">Example</span><span class="s1">: **</span><span class="s2">POST</span><span class="s1">** </span><span class="s2">/v1/partners/</span><span class="s1">[</span><span class="s2">company name</span><span class="s1">]</span><span class="s2">/customers </span><span class="s1">(</span><span class="s2">link</span><span class="s1">)</span>
<a name="l27"><span class="ln">27   </span></a>
<a name="l30"><span class="ln">30   </span></a><span class="s1">&lt;Table of Contents&gt;</span>
<a name="l32"><span class="ln">32   </span></a>
<a name="l33"><span class="ln">33   </span></a><span class="s1"></span><span class="s2">Contents Overview </span>
<a name="l35"><span class="ln">35   </span></a>
<a name="l36"><span class="ln">36   </span></a><span class="s3">* </span><span class="s2">Document Change Log</span>
<a name="l37"><span class="ln">37   </span></a><span class="s3">* </span><span class="s2">Purpose</span>
<a name="l38"><span class="ln">38   </span></a><span class="s3">* </span><span class="s2">System Overview</span>
<a name="l39"><span class="ln">39   </span></a><span class="s3">* </span><span class="s2">Connectivity</span>
<a name="l40"><span class="ln">40   </span></a><span class="s3">* </span><span class="s2">Custom Headers</span>
<a name="l41"><span class="ln">41   </span></a><span class="s3">* </span><span class="s2">Digest Auth</span>
<a name="l42"><span class="ln">42   </span></a><span class="s3">* </span><span class="s2">OAuth 1.0</span>
<a name="l43"><span class="ln">43   </span></a><span class="s3">* </span><span class="s2">OAuth 2.0</span>
<a name="l44"><span class="ln">44   </span></a><span class="s3">* </span><span class="s2">Hawk Authentication</span>
<a name="l45"><span class="ln">45   </span></a><span class="s3">* </span><span class="s2">AWS Signature</span>
<a name="l46"><span class="ln">46   </span></a><span class="s3">* </span><span class="s2">NTLM Authentication</span>
<a name="l47"><span class="ln">47   </span></a><span class="s3">* </span><span class="s2">Akamai EdgeGrid</span>
<a name="l36"><span class="ln">36   </span></a><span class="s3">* </span><span class="s2">Document Change Log</span>
<a name="l37"><span class="ln">37   </span></a><span class="s3">* </span><span class="s2">Purpose</span>
<a name="l38"><span class="ln">38   </span></a><span class="s3">* </span><span class="s2">System Overview</span>
<a name="l39"><span class="ln">39   </span></a><span class="s3">* </span><span class="s2">Connectivity</span>
<a name="l40"><span class="ln">40   </span></a><span class="s3">* </span><span class="s2">Custom Headers</span>
<a name="l41"><span class="ln">41   </span></a><span class="s3">* </span><span class="s2">Digest Auth</span>
<a name="l42"><span class="ln">42   </span></a><span class="s3">* </span><span class="s2">OAuth 1.0</span>
<a name="l43"><span class="ln">43   </span></a><span class="s3">* </span><span class="s2">OAuth 2.0</span>
<a name="l44"><span class="ln">44   </span></a><span class="s3">* </span><span class="s2">Hawk Authentication</span>
<a name="l45"><span class="ln">45   </span></a><span class="s3">* </span><span class="s2">AWS Signature</span>
<a name="l46"><span class="ln">46   </span></a><span class="s3">* </span><span class="s2">NTLM Authentication</span>
<a name="l47"><span class="ln">47   </span></a><span class="s3">* </span><span class="s2">Akamai EdgeGrid</span>
<a name="l36"><span class="ln">36   </span></a><span class="s3">* </span><span class="s2">Document Change Log</span>
<a name="l37"><span class="ln">37   </span></a><span class="s3">* </span><span class="s2">Purpose</span>
<a name="l38"><span class="ln">38   </span></a><span class="s3">* </span><span class="s2">System Overview</span>
<a name="l39"><span class="ln">39   </span></a><span class="s3">* </span><span class="s2">Connectivity</span>
<a name="l40"><span class="ln">40   </span></a><span class="s3">* </span><span class="s2">Custom Headers</span>
<a name="l41"><span class="ln">41   </span></a><span class="s3">* </span><span class="s2">Digest Auth</span>
<a name="l42"><span class="ln">42   </span></a><span class="s3">* </span><span class="s2">OAuth 1.0</span>
<a name="l43"><span class="ln">43   </span></a><span class="s3">* </span><span class="s2">OAuth 2.0</span>
<a name="l44"><span class="ln">44   </span></a><span class="s3">* </span><span class="s2">Hawk Authentication</span>
<a name="l45"><span class="ln">45   </span></a><span class="s3">* </span><span class="s2">AWS Signature</span>
<a name="l46"><span class="ln">46   </span></a><span class="s3">* </span><span class="s2">NTLM Authentication</span>
<a name="l47"><span class="ln">47   </span></a><span class="s3">* </span><span class="s2">Akamai EdgeGrid</span>
<a name="l48"><span class="ln">48   </span></a>
<a name="l49"><span class="ln">49   </span></a><span class="s1">&lt;/Table of Contents&gt;</span>
<a name="l50"><span class="ln">50   </span></a>
<a name="l51"><span class="ln">51   </span></a><span class="s1">&lt;Document Change Log&gt;</span>
<a name="l52"><span class="ln">52   </span></a>  <span class="s1">&lt;summary&gt;Request Headers&lt;/summary&gt;</span>
<a name="l53"><span class="ln">53   </span></a>
<a name="l54"><span class="ln">54   </span></a><span class="s0">| </span><span class="s1">HEADER                  </span><span class="s0">| </span><span class="s1">VALUE                                                      </span><span class="s0">| </span><span class="s1">DESCRIPTION                        </span><span class="s0">|</span>
<a name="l55"><span class="ln">55   </span></a><span class="s0">|-------------------------|------------------------------------------------------------|------------------------------------|</span>
<a name="l56"><span class="ln">56   </span></a><span class="s0">| </span><span class="s1">e.g., Connection        </span><span class="s0">| </span><span class="s1">keep-alive                                                 </span><span class="s0">| </span><span class="s1">text                               </span><span class="s0">|</span>
<a name="l57"><span class="ln">57   </span></a><span class="s0">| </span><span class="s1">e.g., Content-Type      </span><span class="s0">| </span><span class="s1">application/json                                           </span><span class="s0">| </span><span class="s1">text                               </span><span class="s0">|</span>
<a name="l58"><span class="ln">58   </span></a><span class="s0">| </span><span class="s1">e.g., Client-Request-Id </span><span class="s0">| </span><span class="s1">e.g., m2qpjzcx                                             </span><span class="s0">| </span><span class="s1">text                               </span><span class="s0">|</span>
<a name="l59"><span class="ln">59   </span></a><span class="s0">| </span><span class="s1">e.g., X-Wallet-Id       </span><span class="s0">| </span><span class="s1">e.g., [Company name_WALLET]                                </span><span class="s0">| </span><span class="s1">text                               </span><span class="s0">|</span>
<a name="l60"><span class="ln">60   </span></a><span class="s0">| </span><span class="s1">e.g., X-B3-TraceId      </span><span class="s0">| </span><span class="s1">e.g., 7a317b88b71f56ba                                     </span><span class="s0">| </span><span class="s1">text                               </span><span class="s0">|</span>
<a name="l61"><span class="ln">61   </span></a><span class="s0">| </span><span class="s1">e.g., X-B3-SpanId       </span><span class="s0">| </span><span class="s1">e.g., 84261b82bd7f74d9                                     </span><span class="s0">| </span><span class="s1">text                               </span><span class="s0">|</span>
<a name="l62"><span class="ln">62   </span></a><span class="s0">| </span><span class="s1">e.g., Content-Length    </span><span class="s0">| </span><span class="s1">e.g., 1274                                                 </span><span class="s0">| </span><span class="s1">text                               </span><span class="s0">|</span>
<a name="l63"><span class="ln">63   </span></a><span class="s0">| </span><span class="s1">e.g., Host              </span><span class="s0">| </span><span class="s1">e.g., ucom-customer-services-prd.apps.us-[server name].com </span><span class="s0">| </span><span class="s1">text                               </span><span class="s0">|</span>
<a name="l64"><span class="ln">64   </span></a><span class="s0">| </span><span class="s1">e.g., User-Agent        </span><span class="s0">| </span><span class="s1">e.g., Apache-HttpClient/4.5.12 (Java/17.0.2)               </span><span class="s0">| </span><span class="s1">text                               </span><span class="s0">|</span>
<a name="l65"><span class="ln">65   </span></a><span class="s0">| </span><span class="s1">e.g., Authorization     </span><span class="s0">| </span><span class="s1">e.g., Basic dWNvbS1hcGlnZWU6dWNvbS1hcGlnZWU=               </span><span class="s0">| </span><span class="s1">text                               </span><span class="s0">|</span>
<a name="l66"><span class="ln">66   </span></a>
<a name="l67"><span class="ln">67   </span></a><span class="s1">&lt;/details&gt;</span>
<a name="l68"><span class="ln">68   </span></a>
<a name="l69"><span class="ln">69   </span></a><span class="s1">&lt;details&gt;</span>
<a name="l70"><span class="ln">70   </span></a>  <span class="s1">&lt;summary&gt;Parameters (if used)&lt;/summary&gt;</span>
<a name="l71"><span class="ln">71   </span></a>
<a name="l72"><span class="ln">72   </span></a><span class="s1">&lt;!-- Query and Path Parameters. For example in /items?id=###, the query parameters is ID. --&gt;</span>
<a name="l73"><span class="ln">73   </span></a>
<a name="l74"><span class="ln">74   </span></a><span class="s0">| </span><span class="s1">Parameter    </span><span class="s0">| </span><span class="s1">Type (Query or Path)   </span><span class="s0">| </span><span class="s1">VALUE  </span><span class="s0">| </span><span class="s1">DESCRIPTION    </span><span class="s0">|</span>
<a name="l75"><span class="ln">75   </span></a><span class="s0">|--------------|------------------------|--------|----------------|</span>
<a name="l76"><span class="ln">76   </span></a><span class="s0">| </span><span class="s1">text         </span><span class="s0">| </span><span class="s1">Query or Path          </span><span class="s0">| </span><span class="s1">text   </span><span class="s0">| </span><span class="s1">text           </span><span class="s0">|</span>
<a name="l77"><span class="ln">77   </span></a><span class="s0">| </span><span class="s1">text         </span><span class="s0">| </span><span class="s1">Query or Path          </span><span class="s0">| </span><span class="s1">text   </span><span class="s0">| </span><span class="s1">text           </span><span class="s0">|</span>
<a name="l78"><span class="ln">78   </span></a><span class="s0">| </span><span class="s1">text         </span><span class="s0">| </span><span class="s1">Query or Path          </span><span class="s0">| </span><span class="s1">text   </span><span class="s0">| </span><span class="s1">text           </span><span class="s0">|</span>
<a name="l79"><span class="ln">79   </span></a><span class="s0">| </span><span class="s1">text         </span><span class="s0">| </span><span class="s1">Query or Path          </span><span class="s0">| </span><span class="s1">text   </span><span class="s0">| </span><span class="s1">text           </span><span class="s0">|</span>
<a name="l80"><span class="ln">80   </span></a><span class="s0">| </span><span class="s1">text         </span><span class="s0">| </span><span class="s1">Query or Path          </span><span class="s0">| </span><span class="s1">text   </span><span class="s0">| </span><span class="s1">text           </span><span class="s0">|</span>
<a name="l81"><span class="ln">81   </span></a>
<a name="l82"><span class="ln">82   </span></a><span class="s1">&lt;/details&gt;</span>
<a name="l83"><span class="ln">83   </span></a>
<a name="l84"><span class="ln">84   </span></a><span class="s1">&lt;details&gt;</span>
<a name="l85"><span class="ln">85   </span></a>  <span class="s1">&lt;summary&gt;[Scenario title, e.g., ApplePay, GooglePay, Venmo]&lt;/summary&gt;</span>
<a name="l86"><span class="ln">86   </span></a>
<a name="l87"><span class="ln">87   </span></a><span class="s2">Text, e.g. ApplePay request and response.</span>
<a name="l88"><span class="ln">88   </span></a><span class="s2">Sample message.</span>
<a name="l89"><span class="ln">89   </span></a>
<a name="l90"><span class="ln">90   </span></a><span class="s3">## </span><span class="s2">Request Body </span><span class="s1">(</span><span class="s2">Mandatory, if used</span><span class="s1">)</span>
<a name="l91"><span class="ln">91   </span></a>
<a name="l92"><span class="ln">92   </span></a><span class="s1">&lt;!-- The Request body is defined in the YAML API specification file.</span>
<a name="l93"><span class="ln">93   </span></a>
<a name="l94"><span class="ln">94   </span></a><span class="s1">The payload that is appended to the HTTP request. Because there can only be one payload,</span>
<a name="l95"><span class="ln">95   </span></a><span class="s1">they can only be one body parameter. The name of the body parameter has no effect on the</span>
<a name="l96"><span class="ln">96   </span></a><span class="s1">parameter itself and is used for documentation purposes only. Because Form parameters are also in the</span>
<a name="l97"><span class="ln">97   </span></a><span class="s1">payload, body and form parameters cannot exist together for the same operation.--&gt;</span>
<a name="l98"><span class="ln">98   </span></a>
<a name="l99"><span class="ln">99   </span></a><span class="s0">| </span><span class="s1">Variable     </span><span class="s0">| </span><span class="s1">Type   </span><span class="s0">| </span><span class="s1">Maximum Length </span><span class="s0">| </span><span class="s1">Description                      </span><span class="s0">| </span><span class="s1">Required or Optional  </span><span class="s0">|</span>
<a name="l100"><span class="ln">100  </span></a><span class="s0">|--------------|--------|
<a name="l305"><span class="ln">305  </span></a>
<a name="l306"><span class="ln">306  </span></a><span class="s1">&lt;!--</span>
<a name="l307"><span class="ln">307  </span></a><span class="s1">type: tab</span>
<a name="l308"><span class="ln">308  </span></a><span class="s1">--&gt;</span>
<a name="l309"><span class="ln">309  </span></a>
<a name="l310"><span class="ln">310  </span></a><span class="s3"># </span><span class="s2">See Also</span>
<a name="l311"><span class="ln">311  </span></a>
<a name="l312"><span class="ln">312  </span></a><span class="s3">- </span><span class="s1">[</span><span class="s2">API Explorer</span><span class="s1">](</span><span class="s2">../api/?type=post&amp;path=/payments-vas/v1/tokens</span><span class="s1">)</span>
<a name="l313"><span class="ln">313  </span></a><span class="s3">- </span><span class="s1">[</span><span class="s2">Charge Request</span><span class="s1">](</span><span class="s2">?path=docs/Resources/API-Documents/Payments/Charges.md</span><span class="s1">)</span>
<a name="l314"><span class="ln">314  </span></a><span class="s3">- </span><span class="s1">[</span><span class="s2">Payment Source</span><span class="s1">](</span><span class="s2">?path=docs/Resources/Guides/Payment-Sources/Source-Type.md</span><span class="s1">)</span></pre>
-->

# Customer Setup
## Create a Customer Profile
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
<a name="Customer Profile3"><span class="ln"></span></a><span class="s1"></span><span class="s2">Customer Creation Full AVS(Optional)</span>
<!--
var copy = function(target) {
    var textArea = document.createElement('textarea')
    textArea.setAttribute('style','width:1px;border:0;opacity:0;')
    document.body.appendChild(textArea)
    textArea.value = target.innerHTML
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
}

var pres = document.querySelectorAll(".comment-body > pre")
pres.forEach(function(pre){
  var button = document.createElement("button")
  button.className = "btn btn-sm"
  button.innerHTML = "copy"
  pre.parentNode.insertBefore(button, pre)
  button.addEventListener('click', function(e){
    e.preventDefault()
    copy(pre.childNodes[0])
  })
})
-->
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

### Do Something Else

#### Sample Format and Values (No nonce in payload)
```json
Content-Type: application/json
Api-Key: pAhDVh6ALjje4zja5W24PlhvL3A3mJSA
Authorization: HMAC yMHQiDA2qHVy1t/WX3AdvQawoIWH5m/o3/dIit40rY= Timestamp: 1501621439636
Client-Request-Id: 123445241
```
#### Sample Format and Values Sample Format and Values (Nonce in payload)
```json
Content-Type:application/json Api-Key:{{key}} Authorization:HMAC {{signature}} Timestamp:{{time}} Client-Request-Id:{{$guid}} Client-Token: {{tokenId}}
Content-Type: application/json
Api-Key: pAhDVh6ALjje4zja5W24PlhvL3A3mJSA
Authorization: HMAC yMHQiDA2qHVy1t/WX3AdvQawoIWH5m/o3/dIit40rY= Timestamp: 1501621439636
Client-Request-Id: 123445241
Client-Token: e3W0jHqpuutK6vwtlOt80GWvwBI0
```
##### Security
##### API Security
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

###### Idempotency
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


</body>
</html>