import { convertToJSON } from "./utility.js";

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
  const chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data["cases"][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data["cases"][date];
  }
  // console.log(chartData);
  return chartData;
};

function createChart() {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates, // x- axis
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
