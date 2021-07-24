import { EventEmitter } from "../util/EventEmitter.js";
import { Messenger } from "./Messenger.js";

export class Client extends EventEmitter {

    start() {

        const sock = new WebSocket(`ws://${location.host}/messages`);

        sock.onopen = () => {
            this.emit("wsConnection", new Messenger(sock));
        }

    }

}