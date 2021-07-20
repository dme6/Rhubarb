import { Server } from "../net/Server";

export interface InstanceConfiguration {
    htmlPath: string;
    chromePath: string;
    server: Server;
}