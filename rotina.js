window.onload = setInitialValue;

// Busca dados cadastrados no local storage
function readLocalStorage() {
  let stringData = localStorage.getItem('db');

  if (stringData) {
    return JSON.parse(stringData);
  } else {
    alert('Usuario não autenticado!');
    window.location.href = 'index.html';
  }
}

function saveOnLocalStorage(data) {
  localStorage.setItem('db', JSON.stringify(data));
}

function toDo() {
  let nameTask = document.getElementById('nameTask').value;
  let descriptionTask = document.getElementById('descriptionTask').value;

  let todo = {
    title: nameTask,
    description: descriptionTask,
  };

  let db = readLocalStorage();

  let userEmail = db.session.email;

  let userIndex = db.users.findIndex(user => user.email === userEmail);
  let user = db.users.find(user => user.email === userEmail);

  if (user.todos) {
    user.todos.push(todo);
  } else {
    user.todos = [];
    user.todos.push(todo);
  }

  db.users[userIndex] = user;

  saveOnLocalStorage(db);

  setInitialValue();
}

function setInitialValue() {
  let db = readLocalStorage();

  // Elemento que renderiza todos ja cadastrados
  let divTodos = document.getElementById('todos');

  let response = '';

  let userEmail = db.session.email;
  let user = db.users.find(user => user.email === userEmail);

  let todos = user.todos;

  if (db.session.loged) {
    response += `<a class="list-group-item list-group-item-action active titleex">Tarefas</a>`;

    todos.forEach((todo, index) => {
      response += `
        <a href="#" 
        class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${todo.title}</h5>
            </div>
            <p class="mb-1">${todo.description}</p>
        </a>
        <button type="button" onclick="deleteToDo(${index})"
        class="btn-excluir">Excluir</button>
      `;
    });
  }

  divTodos.innerHTML = response;
}

function deleteToDo(index) {
  let db = readLocalStorage();

  let userEmail = db.session.email;

  let userIndex = db.users.findIndex(user => user.email === userEmail);
  let user = db.users.find(user => user.email === userEmail);

  if (user.todos[index]) user.todos.splice(index, 1);

  db.users[userIndex] = user;

  saveOnLocalStorage(db);

  setInitialValue();
}
