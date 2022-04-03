const app = document.querySelector("div#app");

const clearButton = document.createElement("div");
clearButton.id = "clear";
clearButton.innerText = "Clear";
document.body.appendChild(clearButton);
clearButton.onclick = () => {
  chrome.storage.local.clear(() => {
    console.log("storage clear");
    drawElement();
  });
};

drawElement();

function drawElement() {
  chrome.storage.local.get("yl-data", (items) => {
    const data = items["yl-data"];
    console.log(data);
    Object.keys(data).forEach((key) => {
      app.appendChild(createElement(key));
      data[key].forEach((d) => app.appendChild(createElement(d, 1)));
    });
  });
}

function createElement(id, depth = 0) {
  const div = document.createElement("div");
  div.classList = "line";
  div.innerText = "-".repeat(depth * 4) + id;
  return div;
}
