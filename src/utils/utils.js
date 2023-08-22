import fetch from "node-fetch";
const summary = { rapid: {}, blitz: {} };

export default async function getTopTenHelper(usernames) {
  const response = await fetch("https://lichess.org/api/users", {
    method: "post",
    body: usernames,
    headers: { "Content-Type": "text/plain" },
  });
  const userObj = await response.json();
  for (let user of userObj) {
    if (user.hasOwnProperty("disabled")) {
      if (user["disabled"]) {
        continue;
      }
    }
    summary["rapid"][user["id"]] = user["perfs"]["rapid"]["rating"];
    summary["blitz"][user["id"]] = user["perfs"]["blitz"]["rating"];
  }

  const sortedSlicedRapid = sliceDict(sortDictByValue(summary["rapid"]), 0, 20);
  const sortedSlicedBlitz = sliceDict(sortDictByValue(summary["blitz"]), 0, 20);

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
