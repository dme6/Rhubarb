import http from "http";
import mime from "mime";
import fs from "fs";

export class RequestHandler {

    constructor(
        private req: http.IncomingMessage,
        private res: http.ServerResponse,
        private url: string
    ) {}

    start() {
        switch(this.req.method) {
            case "GET": {
                this.handleFile();
                break;
            }
        }
    }

    private handleFile() {

        const stream = fs.createReadStream(this.url.substring(1));

        stream.on("open", () => {

            const typeSplit = this.url.split(".");
            const type = mime.getType(typeSplit[typeSplit.length - 1]);

            this.res.writeHead(200, {
                "Content-Type": type ?? "application/octet-stream"
            });

            stream.pipe(this.res);

        });

        stream.on("error", () => {

            this.res.writeHead(404);
            this.res.end();

        });

    }

}
 