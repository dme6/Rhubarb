"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const RequestHandler_1 = require("./RequestHandler");
const Messenger_1 = require("./Messenger");
const events_1 = require("events");
class Server extends events_1.EventEmitter {
    constructor(config) {
        super();
        this.config = Object.assign({
            port: 0
        }, config);
        this.httpServer = http_1.default.createServer((req, res) => {
            if (req.url) {
                new RequestHandler_1.RequestHandler(res, req.url)
                    .start();
            }
            else {
                res.writeHead(400);
                res.end();
            }
        });
    }
    start() {
        this.httpServer.on("listening", () => {
            this.emit("ready");
        });
        const wss = new ws_1.default.Server({
            server: this.httpServer,
            path: "/message"
        });
        wss.on("connection", sock => {
            this.emit("wsConnection", new Messenger_1.Messenger(sock));
        });
        this.httpServer.listen(this.config.port);
    }
    stop() {
        this.httpServer.close();
    }
    getPort() {
        const addr = this.httpServer.address();
        if (addr) {
            return addr.port;
        }
    }
}
exports.Server = Server;
