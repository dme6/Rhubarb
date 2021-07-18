import path from "path";
import { Server, Window } from "../../dist/server/Rhubarb";

const server = new Server({});

server.on("ready", () => {
    const win1 = new Window({
        htmlPath: path.join(__dirname, "./assets/index.html"),
        server
    });
    win1.start();
});

server.on("wsConnection", msgr => {
    msgr.send("test", "Hello.");
});

server.start();
