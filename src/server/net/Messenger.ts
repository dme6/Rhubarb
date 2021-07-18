import WebSocket from "ws";
import { EventEmitter } from "events";
import { Message } from "../data/Message";

export class Messenger extends EventEmitter {

    constructor(
        private sock: WebSocket
    ) {
        super();
        this.sock.on("message", msg => {
            const pMsg = JSON.parse(msg.toString()) as Message;
            this.emit(pMsg.name, pMsg.data);
        });
    }

    send(name: string, data: any = "") {
        this.sock.send(JSON.stringify({
            name,
            data
        }));
    }

}