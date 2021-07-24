const os = require("os");
const path = require("path");
const { Server, BrowserInstance } = require("../../dist/server/Rhubarb");

const chromePath = path.join
    (__dirname, "../../browser/ungoogled-chromium-windows/chrome");

const server = new Server({});

server.on("ready", () => {
    const inst = new BrowserInstance({
        htmlPath: path.join(__dirname, "./public/index.html"),
        chromePath,
        server
    });

    inst.start();
});

server.on("wsConnection", msgr => {
    msgr.on("get-cpu-info", () => {
        msgr.send("cpu-info", os.cpus());
    });
});

server.start();
