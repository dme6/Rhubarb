/// <reference types="node" />
import { ServerConfiguration } from "../config/ServerConfiguration";
import { EventEmitter } from "events";
export declare class Server extends EventEmitter {
    private httpServer;
    private config;
    constructor(config: ServerConfiguration);
    start(): void;
    stop(): void;
    getPort(): number | undefined;
}
