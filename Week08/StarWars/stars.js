let url = "https://swapi.dev/api/people/";

function convertToJSON(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
}

async function getStarWar(url) {
  const starWar = await fetch(url).then(convertToJSON);
  console.log(starWar.results);
  displayWarriors(starWar.results);
}

function displayWarriors(list) {
  const ListElement = document.getElementById("tbody");
  const Warriors = list
    .map((item) => {
      return `<tr>
              <td data-url="${item.url}">${item.name}</td>
              <td>${item.birth_year}</td>
              <td>${item.gender}</td>
              <td>$${item.created}</td>
              </tr>
      `;
    })
    .join("");
  ListElement.innerHTML = Warriors;
}

async function Pagination(url1, isNext) {
  let war = await fetch(url1).then(convertToJSON);

  if (isNext) {
    url = war.next;
    war = await fetch(war.next).then(convertToJSON);
  }

  if (!isNext && war.previous) {
    url = war.previous;
    war = await fetch(war.previous).then(convertToJSON);
  }

  displayWarriors(war.results);
}

document.getElementById("next").addEventListener("click", () => {
  Pagination(url, true);
});

document.getElementById("prev").addEventListener("click", () => {
  Pagination(url, false);
});

async function peopleClicked(event) {
  console.log(event.target.dataset.url);
  const details = await fetch(event.target.dataset.url).then(convertToJSON);
  console.log(details);
  displayDetails(details);
}
document.getElementById("tbody").addEventListener("click", peopleClicked);

function displayDetails(details) {
  const modalContent = document.getElementById("modal-content");

  const Detail = `
  <ul>
  <li>Name: ${details.name}</li>
  <li>Height: ${details.height}</li>
  <li>Mass: ${details.mass}</li>
  <li>Hair_color: ${details.hair_color}</li>
  <li>Created: ${details.created}</li>
  <li>Edited: ${details.edited}</li>
  <li>Eye_color: ${details.eye_color}</li>
  <li>Skin_color: ${details.skin_color}</li>
  </ul>
  `;
  modalContent.innerHTML = Detail;
}
let modal = document.getElementById("modal");
let body = document.getElementById("tbody");
body.onclick = function () {
  modal.style.display = "block";
};

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close");

// When the user clicks on <span> (x), close the modal

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

Pagination(url);
