class commentModel {
  constructor(type) {
    this.type = type;
    // get the initial list of comments out of local storage if it exists
    this.comments = readFromLS(this.type) || [];
  }
  addComment(hikeName, comment) {
    const newComment = {
      name: hikeName,
      content: comment,
      date: new Date(),
    };
    this.comments.push(newComment);
  }
}

function writeToLS(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
}

function readFromLS(key) {
  return JSON.parse(window.localStorage.getItem(key));
}
