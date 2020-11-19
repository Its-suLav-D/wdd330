export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const prettyPrintTable = (stat) =>
  stat ? `+${numeral(stat).format("0,0")}` : "+0";

export function convertToJSON(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
}
