import fetch from "node-fetch";
const summary = { rapid: {}, blitz: {} };

export default async function getTopTenHelper(lichess_ids) {
  const response = await fetch("https://lichess.org/api/users", {
    method: "post",
    body: lichess_ids,
    headers: { "Content-Type": "text/plain" },
  });
  const userObj = await response.json();
  for (let user of userObj) {
    if (user.hasOwnProperty("disabled")) {
      if (user["disabled"]) {
        continue;
      }
    }
    summary["rapid"][user["username"]] = user["perfs"]["rapid"]["rating"];
    summary["blitz"][user["username"]] = user["perfs"]["blitz"]["rating"];
  }

  const sortedSlicedRapid = sliceDict(sortDictByValue(summary["rapid"]), 0, 50);
  const sortedSlicedBlitz = sliceDict(sortDictByValue(summary["blitz"]), 0, 50);

  summary["rapid"] = sortedSlicedRapid;
  summary["blitz"] = sortedSlicedBlitz;

  return summary;
}

function sliceDict(dict, start, end) {
  const sliced = {};
  Object.keys(dict)
    .slice(start, end)
    .forEach(function (key) {
      sliced[key] = dict[key];
    });
  return sliced;
}

function sortDictByValue(dict) {
  const sorted = {};
  Object.keys(dict)
    .sort(function (a, b) {
      return dict[b] - dict[a];
    })
    .forEach(function (key) {
      sorted[key] = dict[key];
    });
  return sorted;
}
