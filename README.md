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

const { Server, BrowserInstance } = require("@dme6/rhubarb/dist/server/Rhubarb");

const server = new Server({});

server.on("ready", () => {

    const inst = new BrowserInstance({
        htmlPath: "path/to/page.html",
        chromePath: "path/to/browser.exe",
        server
    });

    inst.start();

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

client.on("wsConnection", msgr => {

    msgr.on("msg1", data => {
        console.log(data);
        msgr.send("msg2");
    });
    
});

client.start();

```