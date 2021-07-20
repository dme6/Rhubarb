# Rhubarb

![GitHub](https://img.shields.io/github/license/dme6/rhubarb?style=plastic)

Create desktop programs with web technologies.

## Requirements

- A chromium-based web browser.
- Npm.
- Node.js 14 or later.

## Installation

```
npm install @dme6/rhubarb
```

## Examples
Server side:
```js

const { Server, Window } = require("@dme6/rhubarb/dist/server/Rhubarb");

const server = new Server({});

server.on("ready", () => {

    const win1 = new Window({
        htmlPath: "path/to/page.html",
        mainWindow: true,
        chromePath: "path/to/browser.exe",
        server
    });

    win1.start();

});

server.on("wsConnection", msgr => {
    msgr.send("msg1", "Hello.");
    msgr.on("msg2", data => {
        console.log(data);
    });
});

server.start();

```

Client side (executed in browser):

```js

import { Client } from "./node_modules/@dme6/rhubarb/dist/client/Rhubarb.js";

const client = new Client();
const mse = client.messageEmitter;

client.on("wsConnection", () => {
    console.log("Connected.");
});

mse.on("msg1", data => {
    console.log(data);
    client.send("msg2", data);
});

client.start();

```