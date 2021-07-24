import { WindowConfiguration } from "../config/WindowConfiguration";

export class Window {

    private config: WindowConfiguration;
    private window: globalThis.Window | null = null;

    constructor(config: WindowConfiguration) {

        this.config = Object.assign({
            name: "_blank",
            width: 800,
            height: 600,
            left: 0,
            top: 0
        }, config);

    }

    open() {
        
        this.window = open(this.config.url, this.config.name, `width=${this.config.width}, height=${this.config.height}, top=${this.config.top}, left=${this.config.left}`);
        
    }

    close() {

        if(this.window) {
            this.window.close();
        }

    }

}