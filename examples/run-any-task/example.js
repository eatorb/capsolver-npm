const CapSolver = require('../../src/CapSolver');
const handler = new CapSolver('CAI-XXX ...');

(async function () {
    await handler.runAnyTask({
            type : "HCaptchaTaskProxyLess",
            websiteURL : "https://discord.com/",
            websiteKey : "4c672d35-0701-42b2-88c3-78380b0db560",
            // proxyInfo: {
                // "proxy": "proxy.provider.io:23331:user1:password1",
            //     "proxyType": "http",
            //     "proxyAddress": "ip_address",
            //     "proxyPort": 3221,
            //     "proxyLogin": "username",       // not required
            //     "proxyPassword": "password"     // not required
            // },
        })
        .then(response => {
            if (response.error === 0) {
                console.log(response.solution)
            } else {
                console.log('error ' + JSON.stringify(response.apiResponse))
            }
        })
})();