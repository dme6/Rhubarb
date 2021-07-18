import os from "os";
import path from "path";
import { WindowConfiguration } from "../config/WindowConfiguration";
import { exec } from "child_process";

export class Window {

    private config: WindowConfiguration;

    constructor(config: WindowConfiguration) {

        this.config = Object.assign({
            windowSize: "800,600",
            windowPosition: "0,0"
        }, config);

    }

    start() {

        const loc = path.join(__dirname, "../../../browser/ungoogled-chromium-windows/chrome");
        const locWArgs = `${loc} --window-size=${this.config.windowSize} --window-position=${this.config.windowPosition} --app=http://localhost:${this.config.server.getPort()}/${this.config.htmlPath}`;

        switch(os.type()) {
            case "Windows_NT": {
                exec(`start ${locWArgs}`, () => {
                    this.config.server.stop();
                });
            }
        }

    }

}