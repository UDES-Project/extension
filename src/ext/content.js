import { UDES_ContentScript } from "@udes-lib/web-ext"

console.log("Content Script");

(async () => {
    var UDES = new UDES_ContentScript("https://udes.app/api", true)

    UDES.injectScript("script.js", "body")
})()