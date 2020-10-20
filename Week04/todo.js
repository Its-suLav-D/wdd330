class Todo {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todo")) || [];

    this.$trash = document.querySelector("#trash");
    this.$placeholder = document.querySelector("#placeholder");
    this.$add_button = document.querySelector("#add");
    this.$todo_list = document.querySelector("#todo-list"); // Li Item
    this.$form = document.querySelector("#form"); // Forma Tag
    this.$text = document.querySelector("#text-input"); // Input Field
    this.$incomplete = document.querySelector(".far fa-circle");
    this.$unCheck = document.querySelector("#trash");
    this.$filter_list = document.querySelector("#filter-todo");
    this.$filter_button = document.querySelectorAll(".btn");
    this.$remaning = document.querySelector("#remaning");

    this.addEventListeners();
    this.render();
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

    document.body.addEventListener("click", (event) => {
      this.deleteTodo(event);
      this.completeTodo(event);
      this.filterTodo(event);
      this.changeActive(event);
    });
  }
  displayCount() {
    let counter = 0;
    this.todos.forEach((todo) => {
      if (todo.completed == false) {
        counter += 1;
        this.$remaning.innerHTML = `${counter} Task Left`;
      }
    });
  }

  changeActive(event) {
    this.$filter_button.forEach((item) => {
      item.addEventListener("click", () => {
        this.$filter_list.querySelector(".active").classList.remove("active");
        item.classList.add("active");
      });
    });
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
    this.render();
    this.resetinput();
  }
  render() {
    this.saveTodos();
    this.displayTodo(this.todos);
    this.displayCount();
  }
  saveTodos() {
    localStorage.setItem("todo", JSON.stringify(this.todos));
  }
  completeTodo(event) {
    if (!event.target.matches(".fa-circle")) return;
    const id = event.target.dataset.id;
    this.todos.forEach((todo) => {
      if (todo.id === Number(id)) {
        if (todo.completed == true) {
          todo.completed = false;
        } else {
          todo.completed = true;
        }
      }
    });
    this.render();
  }

  deleteTodo(event) {
    if (!event.target.matches(".fa-trash")) return;
    const id = event.target.dataset.id;
    this.todos = this.todos.filter((todo) => todo.id !== Number(id));
    this.render();
  }

  filterTodo(event) {
    if (!event.target.value) return;
    let displayFilter = [];
    this.todos.forEach((todo) => {
      switch (event.target.value) {
        case "all":
          displayFilter = this.todos;
          break;
        case "completed":
          if (todo.completed == true) {
            displayFilter.push(todo);
          }
          break;
        case "uncompleted":
          if (todo.completed == false) {
            displayFilter.push(todo);
          }
      }
    });
    this.displayTodo(displayFilter);
  }

  displayTodo(todolist) {
    const hasTodos = todolist.length > 0;
    this.$placeholder.style.display = hasTodos ? "none" : "block";

    this.$todo_list.innerHTML = todolist
      .map(
        (todo) => ` 
      <li class="item ${todo.completed ? "lineThrough" : ""}" data-id=${
          todo.id
        }> 
        <i class="far fa-circle co" data-id=${todo.id}  ></i>
          <p class="text">${todo.text}</p>
        <i class="fas fa-trash de" id="trash" data-id=${todo.id}></i>
      </li>
    `
      )
      .join(""); // remove the coma
  }
}
new Todo();
