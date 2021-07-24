import os from "os";
import { InstanceConfiguration } from "../config/InstanceConfiguration";
import { exec } from "child_process";

export class BrowserInstance {

    constructor(
        private config: InstanceConfiguration
    ) {}

    start() {

        const locWArgs = `${this.config.chromePath} --app=http://localhost:${this.config.server.getPort()}/${this.config.htmlPath}`;

        this.execute(locWArgs, () => {
            this.config.server.stop();
        });

    }

    private execute(locWArgs: string, stopServer: () => void) {

        switch(os.type()) {
            case "Windows_NT": {
                exec(`start ${locWArgs}`, stopServer);
                break;
            }
            case "Linux":
            case "Darwin": {
                exec(`${locWArgs}`, stopServer);
                break;
            }
            default: {
                console.log("Operating system not supported.");
                stopServer();
                break;
            }
        }

    }

}