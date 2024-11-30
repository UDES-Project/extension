import { UDES_ContentScript } from "@udes-lib/web-ext"

console.log("Content Script");

(async () => {
    var storage = await browser.storage.local.get("UDES_serverUrl")
    if (!storage["UDES_serverUrl"]) {
        await browser.storage.local.set({
            "UDES_serverUrl": "https://udes.app/api"
        })
        storage = await browser.storage.local.get("UDES_serverUrl")
    }
    
    var UDES = new UDES_ContentScript(storage["UDES_serverUrl"], true)

    UDES.injectScript("script.js", "body")
})()