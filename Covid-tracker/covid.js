import {
  prettyPrintStat,
  prettyPrintTable,
  sortData,
  convertToJSON,
} from "./utility.js";

const url = "https://disease.sh/v3/covid-19/all";
const countries = "https://disease.sh/v3/covid-19/countries";

async function getWorldData(url) {
  const worldwide = await fetch(url).then(convertToJSON);
  console.log(worldwide);
  const worldData = [worldwide];
  const cases = document.getElementById("content");
  const recovered = document.getElementById("recovered");
  const deaths = document.getElementById("deaths");

  const data = worldData.map((item) => {
    return `<h4 class="fetchCases"> ${prettyPrintStat(
      item.todayCases
    )} Cases Today Worldwide</h4>
    <p>${prettyPrintStat(item.cases)} Total Cases</p>`;
  });
  cases.innerHTML = data;

  const recoveredData = worldData.map((item) => {
    return `<h4 class="fetchRecovered">${prettyPrintStat(
      item.todayRecovered
    )} Recovered Today Worldwide</h4>
    <p>${prettyPrintStat(item.recovered)} Total recovered</p>`;
  });
  recovered.innerHTML = recoveredData;

  const deathsData = worldData.map((item) => {
    return `<h4 class="fetchDeaths">${prettyPrintStat(
      item.todayDeaths
    )} Deaths today Worldwide</h4>
    <p>${prettyPrintStat(item.deaths)} Total deaths</p>`;
  });
  deaths.innerHTML = deathsData;
}

async function getCountries(countries) {
  const country = await fetch(countries).then(convertToJSON);
  console.log(country);
  // const info = country.map((country) => ({
  //   name: country.country,
  //   value: country.countryInfo.iso2,
  // }));
  displayCountry(country);
  const sortedData = sortData(country);
  displayTable(sortedData);
}

function displayTable(data) {
  const table = document.getElementById("tbody");
  const datatable = data
    .map((item) => {
      return `
              <tr>
              <td class="margin"><img class="countryLogo" src=${
                item.countryInfo.flag
              } alt=${item.country}> ${item.country}</td>
              <td>${prettyPrintTable(item.cases)}</td>
              <td>${prettyPrintTable(item.deaths)}</td>
              <td>${prettyPrintTable(item.recovered)}</td>
              <td>${prettyPrintTable(item.todayCases)}</td>
              <td>${prettyPrintTable(item.todayDeaths)}</td>
              <td>${prettyPrintTable(item.todayRecovered)}</td>
              </tr>
           `;
    })
    .join("");
  table.innerHTML = datatable;
}

function displayCountry(list) {
  const selectedCountry = document.getElementById("countries");
  const api = list.map((country) => {
    return `<option value=${country.countryInfo.iso3}>${country.country}</option>`;
  });
  selectedCountry.innerHTML = api;
}

document
  .getElementById("countries")
  .addEventListener("change", onCountryChange);

async function onCountryChange(event) {
  const countryCode = event.target.value;
  console.log(countryCode);
  const countryUrl = `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  const data = await fetch(countryUrl).then(convertToJSON);
  countryInfo(data);
}

function countryInfo(data) {
  const countryInfo = [data];
  console.log(countryInfo);
  displayCountryInfo(countryInfo);
}

function displayCountryInfo(info) {
  const cases = document.getElementById("content");
  const recovered = document.getElementById("recovered");
  const deaths = document.getElementById("deaths");

  const displayCase = info.map((list) => {
    return `<h4 class="fetchCases">${prettyPrintStat(
      list.todayCases
    )} Cases Today</h4>
            <p>${prettyPrintStat(list.cases)} Total Cases</p>`;
  });
  cases.innerHTML = displayCase;

  const recoveredData = info.map((item) => {
    return `<h4 class="fetchRecovered">${prettyPrintStat(
      item.todayRecovered
    )} Recoveries Today</h4>
    <p>${prettyPrintStat(item.recovered)} Total recovered</p>`;
  });
  recovered.innerHTML = recoveredData;

  const deathsData = info.map((item) => {
    return `<h4 class="fetchDeaths">${prettyPrintStat(
      item.todayDeaths
    )} Deaths today</h4>
    <p>${prettyPrintStat(item.deaths)} Total deaths</p>`;
  });
  deaths.innerHTML = deathsData;
}

getWorldData(url);
getCountries(countries);
