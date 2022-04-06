chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.url) {
    const { url } = tab;
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["injection/index.js"],
    });
  }
  return true;
});
