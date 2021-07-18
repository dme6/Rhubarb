import { EventEmitter } from "../util/EventEmitter.js";
export declare class Client extends EventEmitter {
    private sock?;
    readonly messageEmitter: EventEmitter;
    start(): void;
    send(name: string, data?: any): void;
}
