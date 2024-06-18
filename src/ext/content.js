import { UMES_ContentScript } from "@umes/web-ext-library"

(async () => {
    var UMES = new UMES_ContentScript("http://udes.ddns.net/api", true)

    UMES.setMessageContainer("#messages", ".content", (message) => {
        console.log(message)
        var content = message.textContent
        
        if (UMES.isUMESMessage(content)) {
            UMES.decryptMessage(content, (decrypted) => {
                message.textContent = decrypted
            })
        }
    })

    UMES.injectScript("script.js", "body")
})()