const app = document.querySelector("div#app");

const clearButton = document.createElement("div");
clearButton.id = "clear";
clearButton.innerText = "Clear";
document.body.appendChild(clearButton);
clearButton.onclick = () => {
  chrome.storage.local.clear(() => {
    console.log("storage clear");
    clearElement();
    drawElement();
  });
};

drawElement();

function clearElement() {
  app.innerHTML = "";
}

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
  const thumbnail = thumbnailBox(id, 300);
  div.appendChild(thumbnail);
  return div;
}

function thumbnailBox(id, width = 200) {
  const imgWrapper = document.createElement("div");
  imgWrapper.classList = "thumbnail";
  imgWrapper.style = `--width: ${width}px;`;
  const img = document.createElement("img");
  img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; // https://i.ytimg.com/vi/bDbS6CItIsA/maxresdefault.jpg
  imgWrapper.appendChild(img);
  return imgWrapper;
}
