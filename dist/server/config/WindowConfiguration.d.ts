import { Server } from "../net/Server";
export interface WindowConfiguration {
    windowSize?: string;
    windowPosition?: string;
    mainWindow?: boolean;
    htmlPath: string;
    chromePath: string;
    server: Server;
}
