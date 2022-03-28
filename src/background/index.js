import qs from "query-string";

const data = new Map();

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.url) {
    const { url } = tab;
    const parsedUrl = qs.parseUrl(url);
    if (Object.keys(parsedUrl.query).includes("v")) {
      const id = parsedUrl.query.v;
      if (!data.has(id)) {
        data.set(id, new Set());
      }
    }
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["injection/index.js"],
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.payload === "youtubeLink") {
    const {
      data: { current, relatedVideos },
    } = request;
    if (data.has(current)) {
      relatedVideos.forEach((v) => data.get(current).add(v));
    }
  } else if (request.payload === "getData") {
    const retData = Object.fromEntries(data);
    for (const key of data.keys()) {
      retData[key] = Array.from(data.get(key));
    }
    sendResponse({ data: retData });
  }
});
