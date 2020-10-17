// import { qs, setToLS } from "./utilities";

// const todos = [];

// function saveTodos(key) {
//   setToLS(key, todos);
// }
// class Todo {
//   constructor(parentId, key) {
//     this.listElement = qs(parentId);
//     this.key = key;
//   }
//   addTodo(text) {
//     const newTodo = {
//       id: new Date(),
//       text: text,
//       completed: false,
//     };
//     todos.push(newTodo);
//     saveTodos(this.key);
//   }
// }

// const todo = new Todo("#todoList");

class Todo {
  constructor() {
    this.todos = [];

    this.$trash = document.querySelector("#trash");
    this.$placeholder = document.querySelector("#placeholder");
    this.$add_button = document.querySelector("#add");
    this.$todo_list = document.querySelector("#todo-list"); // Li Item
    this.$form = document.querySelector("#form"); // Forma Tag
    this.$text = document.querySelector("#text-input"); // Input Field
    this.$incomplete = document.querySelector(".far fa-circle");
    this.$unCheck = document.querySelector("#trash");
    // this.$check = "fas fa-check-circle";
    // this.$lineThrough = "lineThrough";

    this.addEventListeners();
  }
  addEventListeners() {
    this.$form.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = this.$text.value;
      const hasTodo = text;

      if (hasTodo) {
        this.addTodo(text);
      }
    });

    this.$todo_list.addEventListener("click", this.completeTodo);
    this.$todo_list.addEventListener("click", this.deleteNote);
  }

  resetinput() {
    this.$text.value = "";
  }
  addTodo(text) {
    const newTodo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: text,
      completed: false,
    };
    this.todos = [...this.todos, newTodo];
    console.log(this.todos);
    this.displayTodo();
    this.resetinput();
  }
  render() {
    this.saveTodos();
    this.displayTodo();
  }
  saveTodos() {
    localStorage.setItem("todo", JSON.stringify(this.todos));
  }
  completeTodo(event) {
    const item = event.target;
    if (item.classList[1] === "fa-circle") {
      console.log("Yes I am circle");
      const todo = item.parentElement;
      todo.classList.toggle("lineThrough");
    }
    console.log(item);
  }
  deleteNote(event) {
    // const item = event.target;
    // const id = event.target.dataset.id;
    // console.log(id);
    // if (item.classList[1] === "fa-trash") {
    //   this.todos.forEach((item) => {
    //     console.log(`${item.text} deleted`);
    //   });
    // }
  }

  displayTodo() {
    const hasTodos = this.todos.length > 0;
    this.$placeholder.style.display = hasTodos ? "none" : "block";

    this.$todo_list.innerHTML = this.todos
      .map(
        (todo) => ` 
      <li class="item"> 
        <i class="far fa-circle co" complete></i>
          <p class="text">${todo.text}</p>
        <i class="fas fa-trash de" id="trash" data-id=${todo.id}></i>
      </li>
    `
      )
      .join(""); // remove the coma
  }
}
new Todo();

// fas fa-check-circle
