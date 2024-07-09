// contains funcitons will we use it more than once
import { TIMEOUST_SEC } from './config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s + 1000);
  });
};

export const getJson = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUST_SEC)]);
    const data = await res.json();
    if (!res.ok) throw Error(data.message);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJson = async function (url, data) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
      timeout(TIMEOUST_SEC),
    ]);
    const parsingdata = await res.json();
    if (!res.ok) throw Error(parsingdata.message);
    return parsingdata;
  } catch (err) {
    throw err;
  }
};
