import { convertToJSON, prettyPrintTable } from "./utility.js";

let cases = "";
let recoveries = "";
let deaths = "";

let worldUrl = `https://disease.sh/v3/covid-19/all`;

async function getWorld(worldUrl) {
  const response = await fetch(worldUrl).then(convertToJSON);
  console.log("This is WorldData");
  console.log(response);
  const fetchedData = [response];
  console.log(fetchedData);
  fetchedData.forEach((item) => {
    cases = item.cases;
    recoveries = item.recovered;
    deaths = item.deaths;
  });
  createChart();
}

document.getElementById("countries").addEventListener("change", onBarChange);

async function onBarChange(event) {
  const code = event.target.value;

  const countryLink = `https://disease.sh/v3/covid-19/countries/${code}`;

  const result = await fetch(countryLink).then(convertToJSON);

  const output = [result];
  cases = "";
  deaths = "";
  recoveries = "";

  output.forEach((item) => {
    cases = item.cases;
    recoveries = item.recovered;
    deaths = item.deaths;
  });
  createChart();
}

function createChart() {
  var ctx = document.getElementById("barChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Cases", "Recoveries", "Deaths"],
      datasets: [
        {
          label: "COVID Real Time Data",
          data: [cases, recoveries, deaths],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 0.5,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              display: true,
            },
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return numeral(value).format("0a");
              },
            },
          },
        ],
      },
    },
  });
  return myChart;
}

getWorld(worldUrl);
