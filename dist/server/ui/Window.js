"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Window = void 0;
const os_1 = __importDefault(require("os"));
const child_process_1 = require("child_process");
class Window {
    constructor(config) {
        this.config = Object.assign({
            windowSize: "800,600",
            windowPosition: "0,0",
            mainWindow: false
        }, config);
    }
    start() {
        const locWArgs = `${this.config.chromePath} --window-size=${this.config.windowSize} --window-position=${this.config.windowPosition} --app=http://localhost:${this.config.server.getPort()}/${this.config.htmlPath}`;
        this.execute(locWArgs, () => {
            if (this.config.mainWindow) {
                this.config.server.stop();
            }
        });
    }
    execute(locWArgs, onStop) {
        switch (os_1.default.type()) {
            case "Windows_NT": {
                child_process_1.exec(`start ${locWArgs}`, onStop);
            }
        }
    }
}
exports.Window = Window;
