import qs from "query-string";
(async function () {
  const data = new Map();
  await relatedVideoLoaded();
  getRelatedVideos();

  let scrollT = undefined;
  let mousemoveT = undefined;
  window.addEventListener("scroll", () => {
    if (scrollT) {
      clearTimeout(scrollT);
    }
    scrollT = setTimeout(getRelatedVideos, 1000);
  });
  window.addEventListener("mousemove", () => {
    if (mousemoveT) {
      clearTimeout(mousemoveT);
    }
    mousemoveT = setTimeout(getRelatedVideos, 10000);
  });

  function getCurrent() {
    let ret = undefined;
    const url = window.location.href;
    const parsedUrl = qs.parseUrl(url);
    if (Object.keys(parsedUrl.query).includes("v")) {
      ret = parsedUrl.query.v;
    }
    return ret;
  }

  async function getRelatedVideos() {
    const current = getCurrent();
    if (!data.has(current)) {
      data.set(current, new Set());
    }

    const relatedVideos = data.get(current);

    const beforeSize = relatedVideos.size;
    const relativeList = document.querySelectorAll(
      "div#contents.style-scope.ytd-item-section-renderer > ytd-compact-video-renderer"
    );
    for (const item of relativeList) {
      const url = item.querySelector("a").href;
      const parsedUrl = qs.parseUrl(url);
      if (Object.keys(parsedUrl.query).includes("v")) {
        const id = parsedUrl.query.v;
        relatedVideos.add(id);
      }
    }
    const afterSize = relatedVideos.size;
    if (beforeSize !== afterSize) {
      console.log(`${afterSize - beforeSize} videos updated`);
      const stoargeData = await getAllStorageData();
      console.log(stoargeData);
      stoargeData["yl-data"] = stoargeData["yl-data"] || {};
      stoargeData["yl-data"][current] = [...relatedVideos];
      chrome.storage.local.set(stoargeData);
    }
  }

  function relatedVideoLoaded() {
    return new Promise((resolve) => {
      observe();
      function observe() {
        const relatedList = document.querySelectorAll(
          "div#contents.style-scope.ytd-item-section-renderer > ytd-compact-video-renderer"
        );
        if (relatedList.length > 5) {
          console.log(">>> Relative Video Loaded");
          resolve();
        } else {
          setTimeout(observe, 1000 / 30);
        }
      }
    });
  }

  function getAllStorageData() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(null, (items) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve(items);
      });
    });
  }
})();
