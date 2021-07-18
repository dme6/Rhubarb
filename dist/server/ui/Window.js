"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Window = void 0;
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
class Window {
    constructor(config) {
        this.config = Object.assign({
            windowSize: "800,600",
            windowPosition: "0,0"
        }, config);
    }
    start() {
        const loc = path_1.default.join(__dirname, "../../../browser/ungoogled-chromium-windows/chrome");
        const locWArgs = `${loc} --window-size=${this.config.windowSize} --window-position=${this.config.windowPosition} --app=http://localhost:${this.config.server.getPort()}/${this.config.htmlPath}`;
        switch (os_1.default.type()) {
            case "Windows_NT": {
                child_process_1.exec(`start ${locWArgs}`, () => {
                    this.config.server.stop();
                });
            }
        }
    }
}
exports.Window = Window;
