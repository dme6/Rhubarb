"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messenger = void 0;
const events_1 = require("events");
class Messenger extends events_1.EventEmitter {
    constructor(sock) {
        super();
        this.sock = sock;
        this.sock.on("message", msg => {
            const pMsg = JSON.parse(msg.toString());
            this.emit(pMsg.name, pMsg.data);
        });
    }
    send(name, data = "") {
        this.sock.send(JSON.stringify({
            name,
            data
        }));
    }
}
exports.Messenger = Messenger;
