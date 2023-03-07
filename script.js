// JSON.parse() -> convert text into JS object

window.addEventListener('load', () => {
  Cache = JSON.parse(localStorage.getItem('Cache')) || [];

  // select name and fetch its value from local-storage and set it to username
  const nameInput = document.querySelector('#name');
  nameInput.value = localStorage.getItem('username') || '';

  // if username is changed, then store it
  nameInput.addEventListener('change', (e) => {
    localStorage.setItem('username', e.target.value);
  });

  DisplayList();
});

const newTodoForm = document.querySelector('#new-todo-form');

newTodoForm.addEventListener('submit', (e) => {
  e.preventDefault();  

  // console.log(e.target) => the whole form itself
  // e.target.elements.(name="content").value
  // e.target.elements.(name="category").value
  const todo = {
    content: e.target.elements.content.value, 
    category: e.target.elements.category.value,
    done: false,
    createdAt: new Date().getTime()
  }

  Cache.push(todo);

  // localStorage only allows to store primitive values like string, int etc.
  localStorage.setItem('Cache', JSON.stringify(Cache));
  // JSON.stringfy() -> convert object to string

  // reset the form after adding an entry
  e.target.reset();

  DisplayList();
});

function DisplayList () {
  const todoList = document.querySelector('#todo-list');

  todoList.innerHTML = '';
  
  Cache.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = todo.done;

    const span = document.createElement('span');
    span.classList.add('bubble');

    if (todo.category == 'personal')
      span.classList.add('personal');
    else span.classList.add('business');

    const content = document.createElement('div');
    content.classList.add('todo-content');

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    
    const actions = document.createElement('div');
    actions.classList.add('actions');

    const edit = document.createElement('button');
    edit.classList.add('edit');
    edit.innerHTML = 'Edit';

    const Delete = document.createElement('button');
    Delete.classList.add('delete');
    Delete.innerHTML = 'Delete';

    label.appendChild(input);
    label.appendChild(span);

    actions.appendChild(edit);
    actions.appendChild(Delete);

    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.prepend(todoItem);

    if (todo.done)
      todoItem.classList.add('done');

    input.addEventListener('click', (e) => {
      todo.done = e.target.checked;
      localStorage.setItem('Cache', JSON.stringify(Cache));

      if (todo.done == false)
        todoItem.classList.add('done');

      DisplayList();

    });

    edit.addEventListener('click', (e) => {
      edit.innerHTML = "Done";
      const input = content.querySelector('input');
      // input.readOnly = false;
      input.removeAttribute('readonly');
      input.focus();

      input.addEventListener('blur', (e) => {
        edit.innerHTML = "Edit";
        input.setAttribute('readonly', true);
        todo.content = e.target.value;
        localStorage.setItem('Cache', JSON.stringify(Cache));

        DisplayList();
      })
    });
    
    Delete.addEventListener('click', (e) => {
      Cache = Cache.filter(t => t != todo);

      localStorage.setItem('Cache', JSON.stringify(Cache));

      DisplayList();
    });

  });
}

