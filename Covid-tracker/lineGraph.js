import { convertToJSON } from "./utility.js";

const caseTypeColor = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
  },
};

let lineUrl = `https://disease.sh/v3/covid-19/historical/all?lastdays=120`;

let dates = [];
let cases = [];

function dataChart(chartDatas) {
  const data = [chartDatas];
  // console.log(data);
  console.log("this is chart data");
  chartDatas.forEach((item) => {
    dates.push(item.x);
    cases.push(item.y);
  });

  return data;
}
document
  .getElementById("countries")
  .addEventListener("change", onLineCountryChange);
// document.getElementById("content").addEventListener("click", (e) => {
//   console.log(e.target);
// });

// document
//   .getElementById("card--recovered")
//   .addEventListener("click", onCardChange);
// document.getElementById("card--deaths").addEventListener("click", onCardChange);

async function onLineCountryChange(event) {
  const code = event.target.value;
  // lineUrl =
  //   code !== "worldwide"
  //     ? `https://disease.sh/v3/covid-19/historical/all?lastdays=120`
  //     : `https://disease.sh/v3/covid-19/historical/${code}?lastdays=120`;

  if (code === "worldwide") {
    lineUrl = `https://disease.sh/v3/covid-19/historical/all?lastdays=120`;
  } else {
    lineUrl = ` https://disease.sh/v3/covid-19/historical/${code}?lastdays=120`;
  }
  cases = [];
  dates = [];
  const info = await fetch(lineUrl).then(convertToJSON);
  console.log(info.timeline);

  const chartData = buildChartData(info.timeline);
  dataChart(chartData);
  createChart();
}

async function getHistory(lineUrl) {
  const response = await fetch(lineUrl).then(convertToJSON);
  console.log("This is response");
  console.log(response);
  const chartData = buildChartData(response);
  dataChart(chartData);
  createChart();
}

const buildChartData = (data) => {
  console.log("This is chat Data");
  console.log(data);
  const chartData = [];
  let lastDataPoint;
  for (let date in data.deaths) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data["deaths"][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data["deaths"][date];
  }
  // console.log(chartData);
  return chartData;
};

function createChart() {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates, // Label for the x-axis of the chart
      datasets: [
        {
          label: "Cases for Last 120 Days ",
          data: cases, // y -axis
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
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
getHistory(lineUrl);
console.log(cases);
