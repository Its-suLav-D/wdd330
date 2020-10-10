import { qs } from "./utilities";

class Todo {
  constructor(parentId, key) {
    this.listElement = qs(parentId);
    this.key = key;
  }
  addTodo(text) {
    const newTodo = [
      {
        id: new Date(),
        text: text,
        completed: false,
      },
    ];
  }
  complete;
}

const todo = new Todo("#todoList");
