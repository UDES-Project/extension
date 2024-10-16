import { UDES_ContentScript } from "@udes-lib/web-ext"

console.log("Content Script");

(async () => {
    var UDES = new UDES_ContentScript("http://127.0.0.1:5000/api", true)

    // UDES.setMessageContainer("#messages", ".message-container .content", (message) => {
    //     if (!message) { return } // SHOULD BE DONE IN THE LIB
        
    //     console.log(message)
    //     var content = message.textContent
        
    //     if (UDES.isUDESMessage(content)) {
    //         UDES.decryptMessage(content, null, (decrypted) => {
    //             message.textContent = decrypted
    //         })
    //     }
    // })

    UDES.injectScript("script.js", "body")
})()