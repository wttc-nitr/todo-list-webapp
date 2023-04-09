// JSON.parse() -> convert text into JS object

window.addEventListener("load", () => {
  Cache = JSON.parse(localStorage.getItem("Cache")) || [];

  // select name and fetch its value from local-storage and set it to username
  const nameInput = document.querySelector("#name");
  nameInput.value = localStorage.getItem("username") || "";

  // if username is changed, then store it
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  DisplayList();
});

const newTodoForm = document.querySelector("#new-todo-form");

newTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // console.log(e.target) => the whole form itself
  // e.target.elements.(name="content").value
  // e.target.elements.(name="category").value
  const todo = {
    content: e.target.elements.content.value,
    category: e.target.elements.category.value,
    done: false,
    createdAt: new Date().getTime(),
  };

  Cache.push(todo);

  // localStorage only allows to store primitive values like string, int etc.
  localStorage.setItem("Cache", JSON.stringify(Cache));
  // JSON.stringfy() -> convert object to string

  // reset the form after adding an entry
  e.target.reset();

  DisplayList();
});

function DisplayList() {
  const todoList = document.querySelector("#todo-list");

  todoList.innerHTML = "";

  Cache.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.checked = todo.done;

    const span = document.createElement("span");
    span.classList.add("bubble");

    if (todo.category == "personal") span.classList.add("personal");
    else span.classList.add("business");

    const content = document.createElement("div");
    content.classList.add("todo-content");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const edit = document.createElement("button");
    edit.classList.add("edit");
    edit.innerHTML = "Edit";

    const Delete = document.createElement("button");
    Delete.classList.add("delete");
    Delete.innerHTML = "Delete";

    label.appendChild(checkboxInput);
    label.appendChild(span);

    actions.appendChild(edit);
    actions.appendChild(Delete);

    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.prepend(todoItem);

    if (todo.done) todoItem.classList.add("done");

    checkboxInput.addEventListener("click", (e) => {
      todo.done = e.target.checked;

      if (todo.done) todoItem.classList.add("done");
      else todoItem.classList.remove("done");

      localStorage.setItem("Cache", JSON.stringify(Cache)); // whenever there is change, update it
    });

    const notesTxt = content.querySelector("input");

    edit.addEventListener("click", (e) => {
      if (edit.innerHTML == "Edit") {
        edit.innerHTML = "Done";
        notesTxt.focus();
        notesTxt.readOnly = false;
      } else {
        edit.innerHTML = "Edit";
        todo.content = notesTxt.value;
        localStorage.setItem("Cache", JSON.stringify(Cache));
      }
    });

    Delete.addEventListener("click", (e) => {
      todoItem.remove(); // remove the item and then update this in localStorage
      Cache = Cache.filter((t) => t != todo);

      localStorage.setItem("Cache", JSON.stringify(Cache));
    });
  });
}
