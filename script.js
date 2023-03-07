// JSON.parse() -> convert text into JS object
window.addEventListener('load', () => {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  const nameInput = document.querySelector('#name');
  const newTodoForm = document.querySelector('#new-todo-form');

  const username = localStorage.getItem('username') || '';

  nameInput.value = username;

  nameInput.addEventListener('change', (e) => {
    localStorage.setItem('username', e.target.value);
  });

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

    todos.push(todo);

    // localStorage only allows to store primitive values like string, int etc.
    localStorage.setItem('todos', JSON.stringify(todos));
    // JSON.stringfy() -> convert object to string

    // reset the form after adding an entry
    e.target.reset();

    DisplayTodos();
  });

  DisplayTodos();

});

function DisplayTodos () {
  const todoList = document.querySelector('#todo-list');

  todoList.innerHTML = '';
  
  todos.forEach(todo => {
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

    todoList.appendChild(todoItem);

    if (todo.done)
      todoItem.classList.add('done');

    input.addEventListener('click', (e) => {
      todo.done = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));

      if (todo.done == false)
        todoItem.classList.add('done');

      DisplayTodos();

    });

    edit.addEventListener('click', (e) => {
      const input = content.querySelector('input');
      // input.readOnly = false;
      input.removeAttribute('readonly');
      input.focus();

      input.addEventListener('blur', (e) => {
        input.setAttribute('readonly', true);
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));

        DisplayTodos();
      })
    });
    
    Delete.addEventListener('click', (e) => {
      todos = todos.filter(t => t != todo);

      localStorage.setItem('todos', JSON.stringify(todos));

      DisplayTodos();
    });

  });
}

