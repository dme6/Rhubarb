const os = require("os");
const path = require("path");
const { Server, Window } = require("../../dist/server/Rhubarb");

const chromePath = path.join
    (__dirname, "../../browser/ungoogled-chromium-windows/chrome");

const server = new Server();

server.on("ready", () => {
    const win1 = new Window({
        htmlPath: path.join(__dirname, "./assets/index.html"),
        mainWindow: true,
        chromePath,
        server
    });

    win1.start();
});

server.on("wsConnection", msgr => {
    msgr.on("get-cpu-info", () => {
        msgr.send("cpu-info", os.cpus());
    });
});

server.start();
