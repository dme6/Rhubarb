import http from "http";
import mime from "mime";
import path from "path";
import { promises as fs } from "fs";

export class RequestHandler {

    constructor(
        private res: http.ServerResponse,
        private url: string
    ) {}

    start() {
        this.handleFile();
    }

    private async handleFile() {

        try {

            const file = await fs.readFile(this.url.substring(1), "utf-8");

            const typeSplit = this.url.split(".");
            const type = mime.getType(typeSplit[typeSplit.length - 1]);

            this.res.writeHead(200, {
                "Content-Type": type ?? "application/octet-stream"
            });
            
            this.res.end(file);

        } catch(e) {
            this.res.writeHead(404);
            this.res.end();
        }

    }

}
 