import { Client } from "../../../dist/client/Rhubarb.js";

const btn = document.getElementById("cpu-info-btn");
const cpuInfoDiv = document.getElementById("cpu-info-div");

const client = new Client();
const mse = client.messageEmitter;

client.on("wsConnection", () => {

    btn.addEventListener("click", () => {
        client.send("get-cpu-info");
    });

});

mse.on("cpu-info", data => {
    cpuInfoDiv.innerHTML = `
    
    <strong>Model: </strong> ${data[0].model} <br>
    <strong>Speed: </strong> ${data[0].speed}

    `
});

client.start();