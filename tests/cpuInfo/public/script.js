import { Client } from "../../../dist/client/Rhubarb.js";

const btn = document.getElementById("cpu-info-btn");
const cpuInfoDiv = document.getElementById("cpu-info-div");

const client = new Client();

client.on("wsConnection", msgr => {

    btn.addEventListener("click", () => {
        msgr.send("get-cpu-info");
    });

    msgr.on("cpu-info", displayCPUInfo);

});

function displayCPUInfo(data) {

    cpuInfoDiv.innerHTML = `
    
    <strong>Model: </strong> ${data[0].model} <br>
    <strong>Speed: </strong> ${data[0].speed}

    `;

}

client.start();