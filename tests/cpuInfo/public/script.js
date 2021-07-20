import { Client, Window } from "../../../dist/client/Rhubarb.js";

const btn = document.getElementById("cpu-info-btn");
const cpuInfoDiv = document.getElementById("cpu-info-div");
const body = document.querySelector("body");

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

    `;

    body.innerHTML += `
    
    <br>
    <button id="more-info-btn">More Info</button>
    
    `;

    document.getElementById("more-info-btn")
        .addEventListener("click", () => {

            const size = 400;

            const moreInfoWin = new Window({
                name: "More Info",
                url: "./moreInfo.html",
                width: size,
                height: size,
                left: (screen.width / 2) - (size / 2),
                top: (screen.height / 2) - (size / 2)
            });

            moreInfoWin.open();

        });

});

client.start();