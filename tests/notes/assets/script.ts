import { Client } from "../../../dist/client/Rhubarb.js";

const client = new Client();
const msgEmitter = client.messageEmitter;

client.on("wsConnection", () => {

    msgEmitter.on("test", (str: string) => {
        console.log("Revieved message. " + str);
    });

});

client.start();