import { Server } from "../net/Server";
export interface WindowConfiguration {
    windowSize?: string;
    windowPosition?: string;
    htmlPath: string;
    server: Server;
}
