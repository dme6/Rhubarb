import { EventEmitter } from "../util/EventEmitter.js";
import { Message } from "../data/Message.js";

export class Client extends EventEmitter {

    private sock?: WebSocket;
    readonly messageEmitter = new EventEmitter();

    start() {

        this.sock = new WebSocket(`ws://${location.host}/messages`);

        this.sock.onopen = () => {
            this.emit("wsConnection");
        }

        this.sock.onmessage = msg => {
            const pMsg = JSON.parse(msg.data) as Message;
            this.messageEmitter.emit(pMsg.name, pMsg.data);
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