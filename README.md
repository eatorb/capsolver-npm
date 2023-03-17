# capsolver.com api wrapper🧠
- **Manage to solve captcha challenges with AI in a NodeJS app (captcha service based).**
- ❗ An API key it's **required**. [**Get here.**](https://dashboard.capsolver.com/passport/register?inviteCode=CHhA_5os)
- 👀 **Puppeteer integration at**  [**puppeteer-extra-plugin-capsolver**](https://github.com/0qwertyy/puppeteer-extra-plugin-capsolver).

*🔥 [HCaptchaTurboTask (highest pass/valid rate).](https://github.com/0qwertyy/capsolver-npm/blob/master/examples/hcaptcha_turbo.js) 🔥 AntiCloudflare.*

[![](https://img.shields.io/badge/1.0.5-capsolver--npm-darkgreen?logo=npm&logoColor=white)](https://www.npmjs.com/package/capsolver-npm)
[![](https://img.shields.io/badge/documentation-docs.capsolver.com-darkgreen)](https://docs.capsolver.com/guide/getting-started.html)

⬇️ Install
-
    npm i capsolver-npm

✋ Usage
-

1. Import module.

   ```javascript 
    const CapSolver = require("capsolver-npm");
    ```
2. Define tasks handler (singleton).

   ```javascript 
    const handler = new CapSolver(apikey); // captcha task handler
    ```



**❗ 2 version for handle captcha tasks results are the followind:**

**1️⃣ task methods** (handle task results in one step)

*example: check capsolver.com balance + run for one hcaptcha token (`.hcaptchaproxyless()`):*

```javascript
const CapSolver = require("capsolver-npm");
const handler = new CapSolver("CAI-XXXX ...", 1); // verbose level 1
let b = await handler.balance();
if(b > 0){  // usd balance
    await handler.hcaptchaproxyless("https://websiteurl.com/", "000000-000000000-0000000")
        .then(async response => {
            if(response.error === 0){ console.log(response.solution) }
            else{ console.log("error " + JSON.stringify(response.apiResponse)) }
        });
}
```

**2️⃣ Run any task and build `taskData` schema for a task type.**

**Check task parameters at [official docs](https://docs.capsolver.com/guide/recognition/ImageToTextTask.html) in order to bind manually captcha tasks.**

*example: run for one hcaptcha token w/ custom proxy (.runAnyTask()):*
```javascript
const CapSolver = require("capsolver-npm");
const handler = new CapSolver("CAI-XXXX ...");
const taskData =    // build a task
    { 
    type : "HCaptchaTask",
    websiteURL : "https://website.com/", 
    websiteKey : "000000-00000-000000-000000000",
    proxyInfo: {
        // string format also supported
        // "proxy": "proxy.provider.io:23331:user1:password1",
        "proxyType": "http",
        "proxyAddress": "ip_address",
        "proxyPort": 3221,
        "proxyLogin": "username",       // not required
        "proxyPassword": "password"     // not required
        },
    }
    
handler.runAnyTask(taskData)
    .then(async response => {
        if(response.error === 0){ console.log(response.solution) }
        else{ console.log("error " + JSON.stringify(response.apiResponse)) }
    });
```

↩️ Get solutions
-
**All methods returns the following schema:**

| Parameter     | Type     | Description                                                |
|:--------------| :------- |:-----------------------------------------------------------|
| `error`       | `number` | [*-1*] Request/Solving **error**. [*0*] **Success** solve. |
| `statusText`  | `string` | HTTP status string.                                        |
| `apiResponse` | `object` | **Results/solution** (capsolver.com API response).          |
| `solution`    | `object` | **Solution got from success solve**.                       |


```javascript
// ✅ success response
{   
  error: 0,  
  statusText: "200 OK",
  apiResponse: {
    errorId: 0,
    taskId: "4e6c33f5-bc14-44d0-979e-d5f37b072c59",
    status: "ready",
    solution: {
      gRecaptchaResponse: "03AIIukzgCys9brSNnrVbwXE9mTesvkxQ-ocK ..."
    }
  }
}
```

```javascript
// ❌ Error response (invalid API key)
{   
  error: -1,
  statusText: "400 Bad Request",
  apiResponse: {
        errorCode: "ERROR_INVALID_TASK_DATA",
        errorDescription: "clientKey error",
        errorId: 1
    }
}
```


# 📖 Supported captcha tasks

| Method                               | Returns                        |
|:-------------------------------------|:-------------------------------|
| `await handler.balance()` | get balance as float number    |
| `await handler.runAnyTask(taskData)` | not use a specific task method |

Custom proxy usage (proxyInfo schema):

```javascript
// version 1
const proxyInfo = {
    "proxyType": "http", 
    "proxyAddress": "ip_address",
    "proxyPort": 3221,
    "proxyLogin": "username", 
    "proxyPassword": "password"
    }

// version 2
const proxyInfo = {
    proxy: "proxyType:proxyAddress:proxyPort:proxyLogin:proxyPassword"
}

```

*(proxyLogin & proxyPassword are optionals)*

task-bind methods:
-

⚙️ **Cloudflare**

```javascript
// * check required parameters for a website with API docs.
await handler.anticloudflare(websiteURL, proxyInfo, metadata, html)
await handler.antiturnstile(websiteURL, websiteKey, proxyInfo, metadata)
```

⚙️ **HCaptcha**


Parameter `queries`: base64 images array

```javascript
await handler.hcaptcha(websiteURL, websiteKey, proxyInfo, userAgent, isInvisible, enterprisePayload)
await handler.hcaptchaproxyless(websiteURL, websiteKey, userAgent, isInvisible, enterprisePayload)
await handler.hcaptchaenterprise(websiteURL, websiteKey, proxyInfo, userAgent, isInvisible, enterprisePayload)
await handler.hcaptchaenterpriseproxyless(websiteURL, websiteKey, userAgent, isInvisible, enterprisePayload)
await handler.hcaptchaturbo(websiteURL, websiteKey, proxyInfo, userAgent, isInvisible, enterprisePayload) // proxy required

await handler.hcaptchaclassification(question, base64)
```

⚙️ **ReCaptcha**

    
```javascript
await handler.recaptchav2(websiteURL, websiteKey, proxyInfo, userAgent, isInvisible, recaptchaDataSValue, cookies)
await handler.recaptchav2proxyless(websiteURL, websiteKey, userAgent=null, isInvisible=null, recaptchaDataSValue=null, cookies=null)
await handler.recaptchav2enterprise(websiteURL, websiteKey, proxyInfo, userAgent=null, enterprisePayload=null, apiDomain=null, cookies=null)
await handler.recaptchav2enterpriseproxyless(websiteURL, websiteKey, userAgent=null, enterprisePayload=null, apiDomain=null, cookies=null)
await handler.recaptchav3(websiteURL, websiteKey, proxyInfo, pageAction, minScore=null)
await handler.recaptchav3proxyless(websiteURL, websiteKey, pageAction, minScore=null)
await handler.recaptchav3enterprise(websiteURL, websiteKey, proxyInfo, pageAction, minScore=null, enterprisePayload=null, apiDomain=null, userAgent=null, cookies=null)
await handler.recaptchav3enterpriseproxyless(websiteURL, websiteKey, pageAction, minScore=null, enterprisePayload=null, apiDomain=null, userAgent=null, cookies=null)
```

⚙️ **Datadome**


```javascript
await handler.datadome(websiteURL, userAgent, captchaUrl, proxyInfo)
```

⚙️ **FunCaptcha**

Parameter `image`: base64 screenshot image
```javascript
await handler.funcaptcha(websiteURL, websitePublicKey, proxyInfo, funcaptchaApiJSSubdomain, userAgent, data)
await handler.funcaptchaproxyless(websiteURL, websitePublicKey, funcaptchaApiJSSubdomain, userAgent, data)
await handler.funcaptchaclassification(image, question)
```

⚙️ **Geetest**

❗ Supports for Geetest V3 & Geetest V4: Manage through [GeetestTask documentation](https://docs.capsolver.com/guide/captcha/Geetest.html).

```javascript
await handler.geetest(websiteURL, gt, challenge, proxyInfo, geetestApiServerSubdomain, captchaId)
await handler.geetestproxyless(websiteURL, gt, challenge, geetestApiServerSubdomain, captchaId)
```

⚙️ **MTCaptcha**

```javascript
await handler.mtcaptcha(websiteURL, websiteKey, proxyInfo)
await handler.mtcaptchaproxyless(websiteURL, websiteKey)
```


⚙️ **ImageToText**

```javascript
await handler.image2text(body)
```

Verbose level
-


```javascript
// on CapSolver handler definition
const handler = new CapSolver(apikey, verbose); 
```

Verbose level `undefined` or `0`: Dont print logs, just handle for solution.

Verbose level `1`: Only log task status in console.

Verbose level `2`: Log API response in console.


📁 Working examples
-

**Figure out [here](https://github.com/0qwertyy/capsolver-npm/tree/master/examples) all supported captcha examples.**