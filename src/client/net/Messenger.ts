import { Message } from "../data/Message.js";
import { EventEmitter } from "../util/EventEmitter.js";

export class Messenger extends EventEmitter {

    constructor(
        private sock: WebSocket
    ) {
        super();

        this.sock.onmessage = msg => {
            const pMsg = JSON.parse(msg.data) as Message;
            this.emit(pMsg.name, pMsg.data);
        }
    }

    send(name: string, data: any = "") {
        if(this.sock) {

            this.sock.send(JSON.stringify({
                name,
                data
            }));

        }
    }

} 