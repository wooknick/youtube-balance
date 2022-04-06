import qs from "query-string";
import axios from "axios";
import * as cheerio from "cheerio";
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

  await updateData();

  function getCurrent() {
    let current = undefined;
    const url = window.location.href;
    const parsedUrl = qs.parseUrl(url);
    if (Object.keys(parsedUrl.query).includes("v")) {
      current = parsedUrl.query.v;
    }
    return current;
  }

  async function getCategory(id) {
    let category = undefined;

    const url = `https://www.youtube.com/watch?v=${id}`;
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    $("script").each((idx, item) => {
      if (!category && item.children.length > 0) {
        const targetScript = item.children[0].data;
        const categoryMatchResult = targetScript.match(
          /(?<="category":")[^\"]*/g
        );
        if (categoryMatchResult) {
          category = categoryMatchResult[0].replace("\\u0026", "&");
          category = category.replace("\\u002F", "/");
          category = category.replace("\\u002f", "/");
        }
      }
    });

    return category;
  }

  async function updateData() {
    const current = getCurrent();
    if (current) {
      const category = await getCategory(current);
      storageData["yl-data"][category].add(current);
      const newData = { "yl-data": {} };
      categoryList.forEach((category) => {
        newData["yl-data"][category] = [...storageData["yl-data"][category]];
      });
      chrome.storage.local.set(newData);
      console.log("updated");
    }
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
