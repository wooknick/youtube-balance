import qs from "query-string";
import { categoryList } from "../categoryId";
(async function () {
  /**
   * 1. injection 내에서 사용하는 데이터 형태 :
   * {
   *   category : Set
   * }
   *
   * 2. storage에 저장되는 데이터 형태 :
   * {
   *   category : Array
   * }
   */
  const storageData = await getAllStorageData();
  if (Object.keys(storageData).includes("yl-data")) {
    categoryList.forEach((category) => {
      storageData["yl-data"][category] = new Set(
        storageData["yl-data"][category]
      );
    });
  } else {
    const defaultData = {};
    categoryList.forEach((category) => {
      defaultData[category] = new Set();
    });
    storageData["yl-data"] = defaultData;
  }

  updateData();

  let scrollT = undefined;
  let mousemoveT = undefined;
  window.addEventListener("scroll", () => {
    if (scrollT) {
      clearTimeout(scrollT);
    }
    scrollT = setTimeout(updateData, 1000);
  });
  window.addEventListener("mousemove", () => {
    if (mousemoveT) {
      clearTimeout(mousemoveT);
    }
    mousemoveT = setTimeout(updateData, 10000);
  });

  function getCurrent() {
    let current = undefined;
    const url = window.location.href;
    const parsedUrl = qs.parseUrl(url);
    if (Object.keys(parsedUrl.query).includes("v")) {
      current = parsedUrl.query.v;
    }
    return current;
  }

  function getCategory() {
    let category = undefined;
    const scripts = document.body.querySelectorAll("script");
    for (const script of scripts) {
      category = script.innerText.match(/(?<="category":")[^\"]*/g);
      if (category) {
        break;
      }
    }
    return category;
  }

  function updateData() {
    const current = getCurrent();
    const category = getCategory();
    storageData["yl-data"][category].add(current);
    const newData = { "yl-data": {} };
    categoryList.forEach((category) => {
      newData["yl-data"][category] = [...storageData["yl-data"][category]];
    });
    chrome.storage.local.set(newData);
    console.log("updated");
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
