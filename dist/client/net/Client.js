import { EventEmitter } from "../util/EventEmitter.js";
export class Client extends EventEmitter {
    constructor() {
        super(...arguments);
        this.messageEmitter = new EventEmitter();
    }
    start() {
        this.sock = new WebSocket(`ws://${location.host}/message`);
        this.sock.onopen = () => {
            this.emit("wsConnection");
        };
        this.sock.onmessage = msg => {
            const pMsg = JSON.parse(msg.data);
            this.messageEmitter.emit(pMsg.name, pMsg.data);
        };
    }
    send(name, data = "") {
        if (this.sock) {
            this.sock.send(JSON.stringify({
                name,
                data
            }));
        }
    }
}
