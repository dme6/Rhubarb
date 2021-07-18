import os from "os";
import path from "path";
import { WindowConfiguration } from "../config/WindowConfiguration";
import { exec } from "child_process";

export class Window {

    private config: WindowConfiguration;

    constructor(config: WindowConfiguration) {

        this.config = Object.assign({
            windowSize: "800,600",
            windowPosition: "0,0",
            mainWindow: false
        }, config);

    }

    start() {

        const locWArgs = `${this.config.chromePath} --window-size=${this.config.windowSize} --window-position=${this.config.windowPosition} --app=http://localhost:${this.config.server.getPort()}/${this.config.htmlPath}`;

        this.execute(locWArgs, () => {
            if(this.config.mainWindow) {
                this.config.server.stop();
            }
        });

    }

    private execute(locWArgs: string, onStop: () => void) {

        switch(os.type()) {
            case "Windows_NT": {
                exec(`start ${locWArgs}`, onStop);
            }
        }

    }

}