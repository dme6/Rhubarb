const os = require("os");
const path = require("path");
const { Server, Window } = require("../../dist/server/Rhubarb");

const server = new Server();

server.on("ready", () => {
    const window1 = new Window({
        htmlPath: path.join(__dirname, "./assets/index.html"),
        server
    });

    window1.start();
});

server.on("wsConnection", msgr => {
    msgr.on("get-cpu-info", () => {
        msgr.send("cpu-info", os.cpus());
    });
});

server.start();
