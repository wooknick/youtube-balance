import React from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/app";

const container = document.querySelector("div#app");
const root = createRoot(container);
root.render(<App />);

// const clearButton = document.createElement("div");
// clearButton.id = "clear";
// clearButton.innerText = "Clear";
// document.body.appendChild(clearButton);
// clearButton.onclick = () => {
//   chrome.storage.local.clear(() => {
//     console.log("storage clear");
//     clearElement();
//     drawElement();
//   });
// };

// drawElement();

// function clearElement() {
//   app.innerHTML = "";
// }

// function drawElement() {
//   chrome.storage.local.get("yl-data", (items) => {
//     const data = items["yl-data"];
//     console.log("data", data);

//     Object.keys(data).forEach((key) => {
//       app.appendChild(createElement(key, data[key].length));
//     });
//   });
// }

// function createElement(category, value) {
//   const div = document.createElement("div");
//   div.classList = "line";

//   div.innerText = `${category} : ${value}`;

//   return div;
// }

// function thumbnailBox(id, width = 200, lazy = true) {
//   const imgWrapper = document.createElement("div");
//   imgWrapper.classList = "thumbnail";
//   imgWrapper.style = `--width: ${width}px;`;
//   const img = document.createElement("img");
//   img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; // https://i.ytimg.com/vi/bDbS6CItIsA/maxresdefault.jpg
//   img.loading = lazy ? "lazy" : "eager";
//   imgWrapper.appendChild(img);
//   return imgWrapper;
// }
