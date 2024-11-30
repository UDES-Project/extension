import { UDES_Background } from "@udes-lib/web-ext"

console.log("Background")

var UDES = new UDES_Background("Extension", "icons/iconfull.png")

browser.runtime.onMessageExternal.addListener(onMessage)

function onMessage(request, sender, sendResponse) {
    console.log(request)
    if (request.action == "UDES_getSettings") {
        getStorage(sendResponse)
    } else {
        return false
    }
    return true
}

async function getStorage(sendResponse) {
    var storage = await browser.storage.local.get("UDES_serverUrl")
    if (!storage["UDES_serverUrl"]) {
        await browser.storage.local.set({
            "UDES_serverUrl": "https://udes.app/api"
        })
        storage = await browser.storage.local.get("UDES_serverUrl")
    }

    console.log(storage)
    
    sendResponse({
        "UDES_serverUrl": storage["UDES_serverUrl"]
    })
}