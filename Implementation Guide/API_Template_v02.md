<html>
<head>
<title>API_Template_v02.md</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style type="text/css">
.s0 { color: #8c8c8c; font-style: italic;}
.s1 { color: #080808;}
.s2 { color: #080808;}
.s3 { color: #0033b3;}
.ln { color: #adadad; font-weight: normal; font-style: normal; }
</style>
</head>
<body bgcolor="#ffffff">
<table CELLSPACING=0 CELLPADDING=5 COLS=1 WIDTH="100%" BGCOLOR="#c0c0c0" >
<tr><td><center>
<font face="Arial, Helvetica" color="#000000">
Implementation Guide - Sample Spec Document</font>
</center></td></tr></table>
<pre><a name="l1"><span class="ln">1    </span></a><span class="s0">---</span>
<a name="l2"><span class="ln">2    </span></a><span class="s2">tags</span><span class="s1">: [</span><span class="s2">Universal Commerce, Carat, Enterprise, customer-authorized, merchant-stored, tokens-request, payment-token,</span>
<a name="l3"><span class="ln">3    </span></a><span class="s2">api-reference, customer service, </span><span class="s1">[</span><span class="s2">Endpoint</span><span class="s1">]])]</span>
<a name="l4"><span class="ln">4    </span></a><span class="s0">---</span>
<a name="l5"><span class="ln">5    </span></a><span class="s3"># </span><span class="s2">First Data Universal Commerce Services - Client Name </span>
<a name="l5"><span class="ln">5    </span></a><span class="s3"># </span><span class="s2">API Version - Version # </span>
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
<a name="l100"><span class="ln">100  </span></a><span class="s0">|--------------|--------|----------------|----------------------------------|-----------------------|</span>
<a name="l101"><span class="ln">101  </span></a><span class="s0">| </span><span class="s1">`externalId` </span><span class="s0">| </span><span class="s1">*type* </span><span class="s0">| </span><span class="s1">number         </span><span class="s0">| </span><span class="s1">Key param merch controls.        </span><span class="s0">| </span><span class="s1">Required or Optional. </span><span class="s0">|</span>
<a name="l102"><span class="ln">102  </span></a><span class="s0">| </span><span class="s1">`emails`     </span><span class="s0">| </span><span class="s1">*type* </span><span class="s0">| </span><span class="s1">number         </span><span class="s0">| </span><span class="s1">Description with path to guides. </span><span class="s0">| </span><span class="s1">Required or Optional. </span><span class="s0">|</span>
<a name="l103"><span class="ln">103  </span></a><span class="s0">| </span><span class="s1">`deviceInfo` </span><span class="s0">| </span><span class="s1">*type* </span><span class="s0">| </span><span class="s1">number         </span><span class="s0">| </span><span class="s1">Description with path to guides. </span><span class="s0">| </span><span class="s1">Required or Optional. </span><span class="s0">|</span>
<a name="l104"><span class="ln">104  </span></a><span class="s0">| </span><span class="s1">`text here`  </span><span class="s0">| </span><span class="s1">*type* </span><span class="s0">| </span><span class="s1">number         </span><span class="s0">| </span><span class="s1">Description with path to guides. </span><span class="s0">| </span><span class="s1">Required or Optional. </span><span class="s0">|</span>
<a name="l105"><span class="ln">105  </span></a>
<a name="l106"><span class="ln">106  </span></a><span class="s3">### </span><span class="s2">Subtitle </span><span class="s1">(</span><span class="s2">e.g. ApplePay JSON Example</span><span class="s1">)</span>
<a name="l107"><span class="ln">107  </span></a>
<a name="l108"><span class="ln">108  </span></a><span class="s2">Description for each json example.</span>
<a name="l109"><span class="ln">109  </span></a>
<a name="l110"><span class="ln">110  </span></a><span class="s3">### </span><span class="s2">Subtitle </span><span class="s1">(</span><span class="s2">e.g. ApplePay JSON Example</span><span class="s1">)</span>
<a name="l111"><span class="ln">111  </span></a><span class="s2">Repeat as necessary.</span>
<a name="l112"><span class="ln">112  </span></a>
<a name="l113"><span class="ln">113  </span></a><span class="s2">Add a collapsible header</span><span class="s1">!</span>
<a name="l114"><span class="ln">114  </span></a>
<a name="l115"><span class="ln">115  </span></a><span class="s0">```json</span>
<a name="l116"><span class="ln">116  </span></a>
<a name="l117"><span class="ln">117  </span></a><span class="s0">{</span>
<a name="l118"><span class="ln">118  </span></a>  <span class="s0">&quot;customer&quot;: {</span>
<a name="l119"><span class="ln">119  </span></a>    <span class="s0">&quot;externalId&quot;: &quot;dwkockyq&quot;,</span>
<a name="l120"><span class="ln">120  </span></a>
<a name="l121"><span class="ln">121  </span></a>    <span class="s0">&quot;emails&quot;: [</span>
<a name="l122"><span class="ln">122  </span></a>      <span class="s0">{</span>
<a name="l123"><span class="ln">123  </span></a>        <span class="s0">&quot;value&quot;: &quot;dwkockyq@example.com&quot;,</span>
<a name="l124"><span class="ln">124  </span></a>        <span class="s0">&quot;type&quot;: &quot;work&quot;,</span>
<a name="l125"><span class="ln">125  </span></a>        <span class="s0">&quot;primary&quot;: true</span>
<a name="l126"><span class="ln">126  </span></a>      <span class="s0">}</span>
<a name="l127"><span class="ln">127  </span></a>    <span class="s0">],</span>
<a name="l128"><span class="ln">128  </span></a>    <span class="s0">&quot;addresses&quot;: [</span>
<a name="l129"><span class="ln">129  </span></a>      <span class="s0">{</span>
<a name="l130"><span class="ln">130  </span></a>        <span class="s0">&quot;type&quot;: &quot;work&quot;,</span>
<a name="l131"><span class="ln">131  </span></a>        <span class="s0">&quot;streetAddress&quot;: &quot;100 Universal City Plaza&quot;,</span>
<a name="l132"><span class="ln">132  </span></a>        <span class="s0">&quot;locality&quot;: &quot;Hollywood&quot;,</span>
<a name="l133"><span class="ln">133  </span></a>        <span class="s0">&quot;region&quot;: &quot;CA&quot;,</span>
<a name="l134"><span class="ln">134  </span></a>        <span class="s0">&quot;postalCode&quot;: &quot;20220&quot;,</span>
<a name="l135"><span class="ln">135  </span></a>        <span class="s0">&quot;country&quot;: &quot;US&quot;,</span>
<a name="l136"><span class="ln">136  </span></a>        <span class="s0">&quot;formatted&quot;: &quot;100 Universal City Plaza\nHollywood, CA 91608 USA&quot;,</span>
<a name="l137"><span class="ln">137  </span></a>        <span class="s0">&quot;primary&quot;: true</span>
<a name="l138"><span class="ln">138  </span></a>      <span class="s0">}</span>
<a name="l139"><span class="ln">139  </span></a>    <span class="s0">],</span>
<a name="l140"><span class="ln">140  </span></a>    <span class="s0">&quot;deviceInfo&quot;: {</span>
<a name="l141"><span class="ln">141  </span></a>      <span class="s0">&quot;id&quot;: &quot;537edec8-d33e-4ee8-93a7-b9f61876950c&quot;,</span>
<a name="l142"><span class="ln">142  </span></a>      <span class="s0">&quot;kind&quot;: &quot;mobile&quot;,</span>
<a name="l143"><span class="ln">143  </span></a>      <span class="s0">&quot;details&quot;: [</span>
<a name="l144"><span class="ln">144  </span></a>        <span class="s0">{</span>
<a name="l145"><span class="ln">145  </span></a>          <span class="s0">&quot;provider&quot;: &quot;InAuth&quot;,</span>
<a name="l146"><span class="ln">146  </span></a>          <span class="s0">&quot;dataCapture&quot;: {</span>
<a name="l147"><span class="ln">147  </span></a>            <span class="s0">&quot;rawData&quot;: &quot;aaaaaXREUVZGRlFY...aMV&quot;,</span>
<a name="l148"><span class="ln">148  </span></a>            <span class="s0">&quot;dataEventId&quot;: &quot;BB8E4E92...Fz1E063113&quot;,</span>
<a name="l149"><span class="ln">149  </span></a>            <span class="s0">&quot;captureTime&quot;: &quot;2016-04-16T16:06:05Z&quot;</span>
<a name="l150"><span class="ln">150  </span></a>          <span class="s0">},</span>
<a name="l151"><span class="ln">151  </span></a>          <span class="s0">&quot;dataStatic&quot;: {</span>
<a name="l152"><span class="ln">152  </span></a>            <span class="s0">&quot;os&quot;: &quot;Android 5.1.1 Lollipop&quot;,</span>
<a name="l153"><span class="ln">153  </span></a>            <span class="s0">&quot;osVersion&quot;: &quot;5.1.1 Lollipop&quot;,</span>
<a name="l154"><span class="ln">154  </span></a>            <span class="s0">&quot;model&quot;: &quot;XT1540&quot;,</span>
<a name="l155"><span class="ln">155  </span></a>            <span class="s0">&quot;type&quot;: &quot;Moto G&quot;</span>
<a name="l156"><span class="ln">156  </span></a>          <span class="s0">},</span>
<a name="l157"><span class="ln">157  </span></a>          <span class="s0">&quot;dataDynamic&quot;: {</span>
<a name="l158"><span class="ln">158  </span></a>            <span class="s0">&quot;latitude&quot;: &quot;13.0827 N&quot;,</span>
<a name="l159"><span class="ln">159  </span></a>            <span class="s0">&quot;longitude&quot;: &quot;80.2707 E&quot;,</span>
<a name="l160"><span class="ln">160  </span></a>            <span class="s0">&quot;ipAddress&quot;: &quot;172.27.37.221&quot;,</span>
<a name="l161"><span class="ln">161  </span></a>            <span class="s0">&quot;captureTime&quot;: &quot;2016-04-16T16:06:05Z&quot;</span>
<a name="l162"><span class="ln">162  </span></a>          <span class="s0">}</span>
<a name="l163"><span class="ln">163  </span></a>        <span class="s0">}</span>
<a name="l164"><span class="ln">164  </span></a>      <span class="s0">]</span>
<a name="l165"><span class="ln">165  </span></a>    <span class="s0">}</span>
<a name="l166"><span class="ln">166  </span></a>  <span class="s0">}</span>
<a name="l167"><span class="ln">167  </span></a><span class="s0">}  </span>
<a name="l168"><span class="ln">168  </span></a><span class="s0">```</span>
<a name="l169"><span class="ln">169  </span></a>
<a name="l170"><span class="ln">170  </span></a><span class="s3">## </span><span class="s2">Response Headers</span>
<a name="l171"><span class="ln">171  </span></a>
<a name="l172"><span class="ln">172  </span></a>    <span class="s0">HTTP/1.1 201 Created</span>
<a name="l173"><span class="ln">173  </span></a>    <span class="s0">Cache-Control: no-cache, no-store, max-age=0, must-revalidate</span>
<a name="l174"><span class="ln">174  </span></a>    <span class="s0">Content-Security-Policy: default-src 'self';  'strict-dynamic'; frame-ancestors 'none','self'</span>
<a name="l175"><span class="ln">175  </span></a>    <span class="s0">Content-Type: application/json</span>
<a name="l176"><span class="ln">176  </span></a>    <span class="s0">Date: Fri, 17 Jun 2022 16:40:04 GMT</span>
<a name="l177"><span class="ln">177  </span></a>    <span class="s0">Expires: 0</span>
<a name="l178"><span class="ln">178  </span></a>    <span class="s0">Pragma: no-cache</span>
<a name="l179"><span class="ln">179  </span></a>    <span class="s0">Strict-Transport-Security: max-age=31536000 ; includeSubDomains</span>
<a name="l180"><span class="ln">180  </span></a>    <span class="s0">X-Content-Type-Options: nosniff</span>
<a name="l181"><span class="ln">181  </span></a>    <span class="s0">X-Frame-Options: SAMEORIGIN</span>
<a name="l182"><span class="ln">182  </span></a>    <span class="s0">X-Response-Id: a1592898-613e-4b4e-8d51-c5b92b9ed550</span>
<a name="l183"><span class="ln">183  </span></a>    <span class="s0">X-Vcap-Request-Id: 7c296d49-223a-4d06-4bcc-7cccc03716e3</span>
<a name="l184"><span class="ln">184  </span></a>    <span class="s0">X-Xss-Protection: 1; mode=block</span>
<a name="l185"><span class="ln">185  </span></a>    <span class="s0">Transfer-Encoding: chunked</span>
<a name="l186"><span class="ln">186  </span></a>    <span class="s0">Set-Cookie: NSC_VT-PNB1-OQ2-1ED-DPN-443-WJQ=ffffffff09bd36e445525d5f4f58455e445a4a42378b;path=/;secure;httponly                          </span>
<a name="l187"><span class="ln">187  </span></a>
<a name="l188"><span class="ln">188  </span></a><span class="s3">## </span><span class="s2">Response Body </span><span class="s1">(</span><span class="s2">Mandatory, if used</span><span class="s1">)</span>
<a name="l189"><span class="ln">189  </span></a>
<a name="l190"><span class="ln">190  </span></a><span class="s0">| </span><span class="s1">Variable        </span><span class="s0">| </span><span class="s1">Type      </span><span class="s0">| </span><span class="s1">Maximum Length </span><span class="s0">| </span><span class="s1">Description                        </span><span class="s0">| </span>
<a name="l191"><span class="ln">191  </span></a><span class="s0">|-----------------|-----------|----------------|------------------------------------|</span>
<a name="l192"><span class="ln">192  </span></a><span class="s0">| </span><span class="s1">`id`            </span><span class="s0">| </span><span class="s1">*type*    </span><span class="s0">| </span><span class="s1">number         </span><span class="s0">| </span><span class="s1">Customer ID (cuid).                </span><span class="s0">|</span>
<a name="l193"><span class="ln">193  </span></a><span class="s0">| </span><span class="s1">`externalId`    </span><span class="s0">| </span><span class="s1">*type*    </span><span class="s0">| </span><span class="s1">number         </span><span class="s0">| </span><span class="s1">External ID (extid).               </span><span class="s0">|</span>
<a name="l194"><span class="ln">194  </span></a>
<a name="l195"><span class="ln">195  </span></a><span class="s3">### </span><span class="s2">Subtitle </span><span class="s1">(</span><span class="s2">e.g. ApplePay JSON Example</span><span class="s1">)</span>
<a name="l196"><span class="ln">196  </span></a>
<a name="l197"><span class="ln">197  </span></a><span class="s2">Description for each json example.</span>
<a name="l198"><span class="ln">198  </span></a>
<a name="l199"><span class="ln">199  </span></a><span class="s3">### </span><span class="s2">Subtitle </span><span class="s1">(</span><span class="s2">e.g. ApplePay JSON Example</span><span class="s1">)</span>
<a name="l200"><span class="ln">200  </span></a><span class="s2">Repeat as necessary.</span>
<a name="l201"><span class="ln">201  </span></a>
<a name="l202"><span class="ln">202  </span></a><span class="s2">Add a collapsible header</span><span class="s1">!</span>
<a name="l203"><span class="ln">203  </span></a>
<a name="l204"><span class="ln">204  </span></a><span class="s0">```json</span>
<a name="l205"><span class="ln">205  </span></a>
<a name="l206"><span class="ln">206  </span></a><span class="s0">{&quot;id&quot;:&quot;5cab4ea317ec4877ab419ae3844a970a&quot;, </span>
<a name="l207"><span class="ln">207  </span></a><span class="s0">&quot;externalId&quot;:&quot;dwkockyq&quot;}  </span>
<a name="l208"><span class="ln">208  </span></a><span class="s0">```</span>
<a name="l209"><span class="ln">209  </span></a>
<a name="l210"><span class="ln">210  </span></a><span class="s3">## </span><span class="s2">HTTP Status Code and Reason Phrase</span>
<a name="l211"><span class="ln">211  </span></a>
<a name="l212"><span class="ln">212  </span></a><span class="s3">* </span><span class="s1">[</span><span class="s2">3 digit code</span><span class="s1">] </span><span class="s2">- description; sample message.</span>
<a name="l213"><span class="ln">213  </span></a><span class="s3">* </span><span class="s1">[</span><span class="s2">3 digit code</span><span class="s1">] </span><span class="s2">- description; sample message.</span>
<a name="l214"><span class="ln">214  </span></a><span class="s3">* </span><span class="s1">[</span><span class="s2">3 digit code</span><span class="s1">] </span><span class="s2">- description; sample message.</span>
<a name="l215"><span class="ln">215  </span></a><span class="s3">* </span><span class="s1">[</span><span class="s2">3 digit code</span><span class="s1">] </span><span class="s2">- description; sample message.</span>
<a name="l216"><span class="ln">216  </span></a><span class="s3">* </span><span class="s1">[</span><span class="s2">3 digit code</span><span class="s1">] </span><span class="s2">- description; sample message.</span>
<a name="l217"><span class="ln">217  </span></a><span class="s2">repeat</span>
<a name="l218"><span class="ln">218  </span></a><span class="s3">* </span><span class="s2">.</span>
<a name="l219"><span class="ln">219  </span></a><span class="s3">* </span><span class="s2">.</span>
<a name="l220"><span class="ln">220  </span></a><span class="s3">* </span><span class="s2">.</span>
<a name="l221"><span class="ln">221  </span></a><span class="s3">* </span>
<a name="l222"><span class="ln">222  </span></a>
<a name="l223"><span class="ln">223  </span></a><span class="s1">&lt;!-- reference: https://datatracker.ietf.org/doc/html/rfc2616#page-39</span>
<a name="l224"><span class="ln">224  </span></a>
<a name="l225"><span class="ln">225  </span></a><span class="s1">The Status Code element is a 3-digit integer result code of the attempt to understand and satisfy the request.</span>
<a name="l226"><span class="ln">226  </span></a><span class="s1">These codes are fully defined in [TBD]. The Reason-Phrase is intended to give a short textual description</span>
<a name="l227"><span class="ln">227  </span></a><span class="s1">of the status code. The Status Code is intended for use by automata and the Reason-Phrase is intended for the human user.</span>
<a name="l228"><span class="ln">228  </span></a><span class="s1">The client is not required to examine or show the Reason Phrase.</span>
<a name="l229"><span class="ln">229  </span></a>
<a name="l230"><span class="ln">230  </span></a><span class="s1">The first digit of the Status-Code defines the class of response. The</span>
<a name="l231"><span class="ln">231  </span></a>   <span class="s1">last two digits do not have any categorization role. There are 5</span>
<a name="l232"><span class="ln">232  </span></a>   <span class="s1">values for the first digit:</span>
<a name="l233"><span class="ln">233  </span></a>
<a name="l234"><span class="ln">234  </span></a>      <span class="s1">- 1xx: Informational - Request received, continuing process</span>
<a name="l235"><span class="ln">235  </span></a>
<a name="l236"><span class="ln">236  </span></a>      <span class="s1">- 2xx: Success - The action was successfully received,</span>
<a name="l237"><span class="ln">237  </span></a>        <span class="s1">understood, and accepted</span>
<a name="l238"><span class="ln">238  </span></a>
<a name="l239"><span class="ln">239  </span></a>      <span class="s1">- 3xx: Redirection - Further action must be taken in order to</span>
<a name="l240"><span class="ln">240  </span></a>        <span class="s1">complete the request</span>
<a name="l241"><span class="ln">241  </span></a>
<a name="l242"><span class="ln">242  </span></a>      <span class="s1">- 4xx: Client Error - The request contains bad syntax or cannot</span>
<a name="l243"><span class="ln">243  </span></a>        <span class="s1">be fulfilled</span>
<a name="l244"><span class="ln">244  </span></a>
<a name="l245"><span class="ln">245  </span></a>      <span class="s1">- 5xx: Server Error - The server failed to fulfill an apparently</span>
<a name="l246"><span class="ln">246  </span></a>        <span class="s1">valid request</span>
<a name="l247"><span class="ln">247  </span></a>
<a name="l248"><span class="ln">248  </span></a>   <span class="s1">The individual values of the numeric status codes defined for</span>
<a name="l249"><span class="ln">249  </span></a>   <span class="s1">HTTP/1.1, and an example set of corresponding Reason-Phrase's, are</span>
<a name="l250"><span class="ln">250  </span></a>   <span class="s1">presented below. The reason phrases listed here are only</span>
<a name="l251"><span class="ln">251  </span></a>   <span class="s1">recommendations -- they MAY be replaced by local equivalents without</span>
<a name="l252"><span class="ln">252  </span></a>   <span class="s1">affecting the protocol.</span>
<a name="l253"><span class="ln">253  </span></a>
<a name="l254"><span class="ln">254  </span></a>      <span class="s1">Status-Code    =</span>
<a name="l255"><span class="ln">255  </span></a>            <span class="s1">&quot;100&quot;  ; Section 10.1.1: Continue</span>
<a name="l256"><span class="ln">256  </span></a>          <span class="s1">| &quot;101&quot;  ; Section 10.1.2: Switching Protocols</span>
<a name="l257"><span class="ln">257  </span></a>          <span class="s1">| &quot;200&quot;  ; Section 10.2.1: OK</span>
<a name="l258"><span class="ln">258  </span></a>          <span class="s1">| &quot;201&quot;  ; Section 10.2.2: Created</span>
<a name="l259"><span class="ln">259  </span></a>          <span class="s1">| &quot;202&quot;  ; Section 10.2.3: Accepted</span>
<a name="l260"><span class="ln">260  </span></a>          <span class="s1">| &quot;203&quot;  ; Section 10.2.4: Non-Authoritative Information</span>
<a name="l261"><span class="ln">261  </span></a>          <span class="s1">| &quot;204&quot;  ; Section 10.2.5: No Content</span>
<a name="l262"><span class="ln">262  </span></a>          <span class="s1">| &quot;205&quot;  ; Section 10.2.6: Reset Content</span>
<a name="l263"><span class="ln">263  </span></a>          <span class="s1">| &quot;206&quot;  ; Section 10.2.7: Partial Content</span>
<a name="l264"><span class="ln">264  </span></a>          <span class="s1">| &quot;300&quot;  ; Section 10.3.1: Multiple Choices</span>
<a name="l265"><span class="ln">265  </span></a>          <span class="s1">| &quot;301&quot;  ; Section 10.3.2: Moved Permanently</span>
<a name="l266"><span class="ln">266  </span></a>          <span class="s1">| &quot;302&quot;  ; Section 10.3.3: Found</span>
<a name="l267"><span class="ln">267  </span></a>          <span class="s1">| &quot;303&quot;  ; Section 10.3.4: See Other</span>
<a name="l268"><span class="ln">268  </span></a>          <span class="s1">| &quot;304&quot;  ; Section 10.3.5: Not Modified</span>
<a name="l269"><span class="ln">269  </span></a>          <span class="s1">| &quot;305&quot;  ; Section 10.3.6: Use Proxy</span>
<a name="l270"><span class="ln">270  </span></a>          <span class="s1">| &quot;307&quot;  ; Section 10.3.8: Temporary Redirect</span>
<a name="l271"><span class="ln">271  </span></a>          <span class="s1">| &quot;400&quot;  ; Section 10.4.1: Bad Request</span>
<a name="l272"><span class="ln">272  </span></a>          <span class="s1">| &quot;401&quot;  ; Section 10.4.2: Unauthorized</span>
<a name="l273"><span class="ln">273  </span></a>          <span class="s1">| &quot;402&quot;  ; Section 10.4.3: Payment Required</span>
<a name="l274"><span class="ln">274  </span></a>          <span class="s1">| &quot;403&quot;  ; Section 10.4.4: Forbidden</span>
<a name="l275"><span class="ln">275  </span></a>          <span class="s1">| &quot;404&quot;  ; Section 10.4.5: Not Found</span>
<a name="l276"><span class="ln">276  </span></a>          <span class="s1">| &quot;405&quot;  ; Section 10.4.6: Method Not Allowed</span>
<a name="l277"><span class="ln">277  </span></a>          <span class="s1">| &quot;406&quot;  ; Section 10.4.7: Not Acceptable</span>
<a name="l278"><span class="ln">278  </span></a>          <span class="s1">| &quot;407&quot;  ; Section 10.4.8: Proxy Authentication Required</span>
<a name="l279"><span class="ln">279  </span></a>          <span class="s1">| &quot;408&quot;  ; Section 10.4.9: Request Time-out</span>
<a name="l280"><span class="ln">280  </span></a>          <span class="s1">| &quot;409&quot;  ; Section 10.4.10: Conflict</span>
<a name="l281"><span class="ln">281  </span></a>          <span class="s1">| &quot;410&quot;  ; Section 10.4.11: Gone</span>
<a name="l282"><span class="ln">282  </span></a>          <span class="s1">| &quot;411&quot;  ; Section 10.4.12: Length Required</span>
<a name="l283"><span class="ln">283  </span></a>          <span class="s1">| &quot;412&quot;  ; Section 10.4.13: Precondition Failed</span>
<a name="l284"><span class="ln">284  </span></a>          <span class="s1">| &quot;413&quot;  ; Section 10.4.14: Request Entity Too Large</span>
<a name="l285"><span class="ln">285  </span></a>          <span class="s1">| &quot;414&quot;  ; Section 10.4.15: Request-URI Too Large</span>
<a name="l286"><span class="ln">286  </span></a>          <span class="s1">| &quot;415&quot;  ; Section 10.4.16: Unsupported Media Type</span>
<a name="l287"><span class="ln">287  </span></a>          <span class="s1">| &quot;416&quot;  ; Section 10.4.17: Requested range not satisfiable</span>
<a name="l288"><span class="ln">288  </span></a>          <span class="s1">| &quot;417&quot;  ; Section 10.4.18: Expectation Failed</span>
<a name="l289"><span class="ln">289  </span></a>          <span class="s1">| &quot;500&quot;  ; Section 10.5.1: Internal Server Error</span>
<a name="l290"><span class="ln">290  </span></a>          <span class="s1">| &quot;501&quot;  ; Section 10.5.2: Not Implemented</span>
<a name="l291"><span class="ln">291  </span></a>          <span class="s1">| &quot;502&quot;  ; Section 10.5.3: Bad Gateway</span>
<a name="l292"><span class="ln">292  </span></a>          <span class="s1">| &quot;503&quot;  ; Section 10.5.4: Service Unavailable</span>
<a name="l293"><span class="ln">293  </span></a>          <span class="s1">| &quot;504&quot;  ; Section 10.5.5: Gateway Time-out</span>
<a name="l294"><span class="ln">294  </span></a>          <span class="s1">| &quot;505&quot;  ; Section 10.5.6: HTTP Version not supported</span>
<a name="l295"><span class="ln">295  </span></a>          <span class="s1">| extension-code</span>
<a name="l296"><span class="ln">296  </span></a>
<a name="l297"><span class="ln">297  </span></a>      <span class="s1">extension-code = 3DIGIT</span>
<a name="l298"><span class="ln">298  </span></a>      <span class="s1">Reason-Phrase  = *&lt;TEXT, excluding CR, LF&gt;</span>
<a name="l299"><span class="ln">299  </span></a>
<a name="l300"><span class="ln">300  </span></a><span class="s1">--&gt;</span>
<a name="l301"><span class="ln">301  </span></a>
<a name="l302"><span class="ln">302  </span></a><span class="s1">&lt;/details&gt;</span>
<a name="l303"><span class="ln">303  </span></a>
<a name="l304"><span class="ln">304  </span></a><span class="s1">[![</span><span class="s2">Try it out</span><span class="s1">](</span><span class="s2">../../../../assets/images/button.png</span><span class="s1">)](</span><span class="s2">../api/?type=post&amp;path=/payments-vas/v1/tokens</span><span class="s1">)</span>
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
</body>
</html>