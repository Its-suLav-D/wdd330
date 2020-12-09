import { makeRequest } from "./authHelper.js";
import Auth from "./Auth.js";

const myAuth = new Auth();

const loginForm = document.getElementById("login");
loginForm.querySelector("button").addEventListener("click", (event) => {
  myAuth.login(getPosts);
  event.preventDefault();
});

async function getPosts() {
  try {
    const data = await makeRequest("posts", "GET", null, myAuth.token);
    console.log(data);
    var ul = document.getElementById("list");
    // ul.innerHTML = "";
    // for (var i = 0; i < data.length; i++) {
    //   var li = document.createElement("li");
    //   li.appendChild(document.createTextNode(data[i].title));
    //   ul.appendChild(li);
    // }
    ul.innerHTML = data
      .map((data) => {
        return `<li>${data.title}</li>`;
      })
      .join("");
  } catch (error) {
    console.log(error);
  }
}

async function createPost() {
  const form = document.forms.postForm;
  console.log(form);
  if (form.title.validity.valid && form.content.validity.valid) {
    const data = {
      title: form.title.value,
      content: form.content.value,
    };
    try {
      const res = await makeRequest("posts", "POST", data, myAuth.token);
      console.log("Post create:", data);
      form.title.value = "";
      form.content.value = "";
      getPosts();
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("This is error");
  }
}

document.getElementById("createSubmit").addEventListener("click", (event) => {
  createPost();
  event.preventDefault();
});
