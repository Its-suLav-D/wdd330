const links = [
  {
    label: "Week 1 Notes",
    url: "https://www.facebook.com/",
  },
  {
    label: "Week 2 Team Activity",
    url: "https://its-sulav-d.github.io/wdd330/Week02/index.html",
  },
  {
    label: "Week 3 Activities",
    url: "https://its-sulav-d.github.io/wdd330/Week03/dashboard.html",
  },
  {
    label: "Week 4 Activities",
    url: "https://its-sulav-d.github.io/wdd330/Week04/w04dashboard.html",
  },
  {
    label: "Week 5 Activities",
    url: "https://its-sulav-d.github.io/wdd330/Week05/wo5dashboard.html",
  },
];

links.forEach((link) => {
  let node = document.createElement("LI");
  let path = document.createElement("a");
  var linkText = document.createTextNode(link.label);
  path.setAttribute("class", "myUrl");
  path.appendChild(linkText);

  path.href = link.url;
  node.appendChild(path);
  document.getElementById("mylist").append(node);
});

document.addEventListener("DOMContentLoaded", function () {
  let currDate = document.getElementById("lastUpdated");
  currDate.textContent = checkDate();
});

function checkDate() {
  let daysName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date(document.lastModified);
  let dayName = daysName[date.getDay()];
  let monthName = months[date.getMonth()];
  let year = date.getFullYear();
  let fullDate = `${dayName}, ${date.getDate()} ${monthName} ${year}`;
  return fullDate;
}
