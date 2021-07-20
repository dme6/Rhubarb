import http from "http";
import ws from "ws";
import { ServerConfiguration } from "../config/ServerConfiguration";
import { RequestHandler } from "./RequestHandler";
import { Messenger } from "./Messenger";
import { EventEmitter } from "events";
import { AddressInfo } from "net";

export class Server extends EventEmitter {

    private httpServer: http.Server;
    private config: ServerConfiguration;

    constructor(
        config: ServerConfiguration
    ) {
        super();

        this.config = Object.assign({
            port: 0
        }, config);

        this.httpServer = http.createServer((req, res) => {
            if(req.url) {
                new RequestHandler(req, res, req.url)
                    .start();
            } else {
                res.writeHead(400);
                res.end();
            }
        });
    }

    start() {

        this.httpServer.on("listening", () => {
            this.emit("ready");
        });

        const wss = new ws.Server({
            server: this.httpServer,
            path: "/messages"
        });

        wss.on("connection", sock => {
            this.emit("wsConnection", new Messenger(sock));
        });

        this.httpServer.listen(this.config.port);

    }

    stop() {
        this.httpServer.close();
    }

    getPort() {
        const addr = this.httpServer.address();
        if(addr) {
            return (addr as AddressInfo).port;
        }
    }

}
