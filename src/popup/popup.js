const app = document.querySelector("div#app");

chrome.runtime.sendMessage({ payload: "getData" }, (response) => {
  const { data } = response;
  const keys = Object.keys(data);
  keys.forEach((key) => {
    app.appendChild(createElement(key, 0));
    data[key].forEach((d) => {
      app.appendChild(createElement(d, 1));
    });
    app.appendChild(createElement("   ", 0));
  });
});

function createElement(id, depth = 0) {
  const div = document.createElement("div");
  div.classList = "line";
  div.innerText = "-".repeat(depth * 4) + id;
  return div;
}
