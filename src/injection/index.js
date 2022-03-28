import qs from "query-string";
(async function () {
  await relatedVideoLoaded();
  getRelatedVideos();

  let scrollT = undefined;
  window.addEventListener("scroll", () => {
    if (scrollT) {
      clearTimeout(scrollT);
    }
    scrollT = setTimeout(getRelatedVideos, 700);
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

  function getRelatedVideos() {
    const relatedVideos = new Set();
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

    console.log(JSON.stringify([...relatedVideos]));
    chrome.runtime.sendMessage({
      payload: "youtubeLink",
      data: {
        current: getCurrent(),
        relatedVideos: [...relatedVideos],
      },
    });
    return relatedVideos;
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
})();
