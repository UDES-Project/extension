import { UDES_ContentScript } from "@udes-lib/web-ext"

console.log("Content Script");

(async () => {
    var UDES = new UDES_ContentScript((await browser.storage.local.get("UDES_serverUrl"))["UDES_serverUrl"], true)

    UDES.injectScript("script.js", "body")
})()