import { UMES_ContentScript } from "@umes/web-ext-library"

(async () => {
    var UMES = new UMES_ContentScript("http://umes.ddns.net/api", true)

    UMES.setMessageContainer(".mb-2", ".text-gray-800", (message) => {
        var content = message.textContent
        
        if (UMES.isUMESMessage(content)) {
            UMES.decryptMessage(content, (decrypted) => {
                message.textContent = decrypted
            })
        }
    })

    UMES.injectScript("script.js", "body")
})()