import { UDES_ContentScript } from "@udes-lib/web-ext"
import { defaults } from "../defaults";

console.log("Content Script");

(async () => {
    var storage = await browser.storage.local.get("UDES_serverUrl")
    if (!storage["UDES_serverUrl"]) {
        await browser.storage.local.set({
            "UDES_serverUrl": defaults.UDES_serverUrl
        })
        storage = await browser.storage.local.get("UDES_serverUrl")
    }
    
    var UDES = new UDES_ContentScript(storage["UDES_serverUrl"], true)

    UDES.injectScript("script.js", "body")
})()