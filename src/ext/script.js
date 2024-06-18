import { UMES_Script } from "@umes/web-ext-library"

// var deleteSecurityMessage = setInterval(() => {
//     var element = document.querySelector(".absolute")
//     if (element) { 
//         element.remove()
//         clearInterval(deleteSecurityMessage)
//     }
// })

var UMES = new UMES_Script()

WebSocket.prototype._send = WebSocket.prototype.send

WebSocket.prototype.send = function(payload) {
    payload = JSON.parse(payload)

    if (payload.event == "message" && payload.data.content) {

        UMES.encryptMessage(payload.data.content, (public_id, key) => {
            payload.data.content = `[UMES]${public_id}:${key}`
            this._send(JSON.stringify(payload))
        })

    } else {
        this._send(JSON.stringify(payload))
    }
}