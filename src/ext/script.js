import { UDES_Script } from "@udes-lib/web-ext"

var deleteWarningMessage = setInterval(() => {
    var element = document.querySelector("#udes-warning")
    if (element) { 
        element.remove()
        clearInterval(deleteWarningMessage)
    }
})

console.log("Script")

var UDES = new UDES_Script()

function injectOnMessage() {

    if (this._onmessage || !this.onmessage) {
        return
    }

    this._onmessage = this.onmessage
    this.onmessage = (e) => {
        var data = JSON.parse(e.data)

        if (data.event == "joined") {
            this.userId = data.data.user.id
        }

        if (data.event != "new_message") {
            this._onmessage(e)
            return
        }

        console.log("[UDES] hook message", e.data)

        if (!UDES.isUDESMessage(data.data.content)) {
            this._onmessage(e)
            return
        }

        UDES.decryptMessage(data.data.content, data.data.user.id, (content) => {
            data.data.content = content

            let newEvent = new MessageEvent('message', {
                data: JSON.stringify(data),
                origin: e.origin,
                lastEventId: e.lastEventId,
                source: e.source,
                ports: e.ports
            });

            console.log("[UDES] newEvent", newEvent)

            this._onmessage(newEvent)
        })
    }
}

WebSocket.prototype._send = WebSocket.prototype.send

WebSocket.prototype.send = function(payload) {

    injectOnMessage.call(this)

    payload = JSON.parse(payload)

    if (payload.event == "message" && payload.data.content) {

        UDES.encryptMessage(payload.data.content, this.userId, async (public_id, key, counter, error) => {

            if (error) {
                alert("UDES error: " + error)
                return
            }

            payload.data.content = await UDES.messageForm(public_id, key, counter)
            this._send(JSON.stringify(payload))
        })

    } else {
        this._send(JSON.stringify(payload))
    }
}