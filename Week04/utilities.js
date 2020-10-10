// get list element
export function qs(selector) {
  return document.querySelector(selector);
}

// save todos to local storage

function setToLS(key,data) {

    localStorage.setItem(key,JSON.stringify(data)
    
}


// Retrieve todos from local storage

// set a listener
