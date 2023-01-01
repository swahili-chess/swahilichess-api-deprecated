import fetch from "node-fetch";

const summary = { rapid: {}, blitz: {} };

const text =
  "Kafiti,dinokapon26,musir6363,GN02,BiGFiVeWin05,onesmo,Hopertz,arnie_N,Kazremy,alphazzz3r0,k_daxh,Farajahchallo,Andre_Beatz,Briodee,ClusteredFib3r,MABESSA,somrandomguy,Diya255,basiiccsss";

export default async function getTopTenHelper() {
  const response = await fetch("https://lichess.org/api/users", {
    method: "post",
    body: text,
    headers: { "Content-Type": "text/plain" },
  });
  const userObj = await response.json();
  for (let user of userObj) {
    summary["rapid"][user["id"]] = user["perfs"]["rapid"]["rating"];
    summary["blitz"][user["id"]] = user["perfs"]["blitz"]["rating"];
  }
  //return summary;
  const sortedSlicedRapid = sliceDict(sortDictByValue(summary["rapid"]), 0, 10);
  const sortedSlicedBlitz = sliceDict(sortDictByValue(summary["blitz"]), 0, 10);

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