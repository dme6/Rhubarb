/// <reference types="node" />
import WebSocket from "ws";
import { EventEmitter } from "events";
export declare class Messenger extends EventEmitter {
    private sock;
    constructor(sock: WebSocket);
    send(name: string, data?: any): void;
}
