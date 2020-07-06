// window.onload = showProfile;

// function showProfile() {
//   let db = readLocalStorage();

//   let spanProfile = document.getElementById('perfil-escolhido');
//   let response = '';

//   let userEmail = db.session.email;
//   let user = db.users.find(user => user.email === userEmail);

//   response += `Perfil escolhido: ${user.profile}`;

//   spanProfile.innerHTML = response;
// }

// Busca dados cadastrados no local storage
function readLocalStorage() {
  let stringData = localStorage.getItem('db');

  if (stringData) {
    return JSON.parse(stringData);
  } else {
    alert('Usuário não autenticado!');
    window.location.href = 'index.html';
  }
}

function saveOnLocalStorage(data) {
  localStorage.setItem('db', JSON.stringify(data));
}

function toDo() {
  let day = document.getElementById('seletedDay').value;
  let beginAt = document.getElementById('beginAt').value;
  let endAt = document.getElementById('endAt').value;
  let nameTask = document.getElementById('nameTask').value;
  let descriptionTask = document.getElementById('descriptionTask').value;

  if (day === '0' || descriptionTask === '' || nameTask === '')
    return alert('Escolha o dia e preencha todos os campos!');

  let todo = {
    beginAt,
    endAt,
    title: nameTask,
    description: descriptionTask,
  };

  let db = readLocalStorage();

  let userEmail = db.session.email;

  let userIndex = db.users.findIndex(user => user.email === userEmail);
  let user = db.users.find(user => user.email === userEmail);

  if (user.todos) {
    if (user.todos[day]) {
      user.todos[day].push(todo);
    } else {
      user.todos[day] = [];
      user.todos[day].push(todo);
    }
  } else {
    user.todos = {};
    user.todos[day] = [];
    user.todos[day].push(todo);
  }

  db.users[userIndex] = user;

  saveOnLocalStorage(db);

  setInitialValue(day);

  document.getElementById('nameTask').value = '';
  document.getElementById('descriptionTask').value = '';

  event.preventDefault();
}

function setInitialValue(day) {
  let db = readLocalStorage();

  // Elemento que renderiza to-dos ja cadastrados
  let divTodos = document.getElementById('todos');

  let response = '';

  let userEmail = db.session.email;
  let user = db.users.find(user => user.email === userEmail);

  let todos = user.todos;

  if (db.session.loged && user.todos[day] && user.todos[day].length > 0) {
    response += `<a class="list-group-item list-group-item-action active titleex">Tarefas de ${day}</a>`;

    todos[day].forEach((todo, index) => {
      response += `
        <a href="#" 
        class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${todo.title}</h5>
                <small>De ${todo.beginAt} até ${todo.endAt}</small>
            </div>
            <p class="mb-1">${todo.description}</p>
        </a>
        <button type="button" onclick="deleteToDo(${index},'${day}')"
        class="btn-excluir">Excluir</button>
      `;
    });
  }

  divTodos.innerHTML = response;
}

function deleteToDo(index, day) {
  let db = readLocalStorage();

  let userEmail = db.session.email;

  let userIndex = db.users.findIndex(user => user.email === userEmail);
  let user = db.users.find(user => user.email === userEmail);

  if (user.todos[day][index]) user.todos[day].splice(index, 1);

  db.users[userIndex] = user;

  saveOnLocalStorage(db);

  setInitialValue(day);
}

function selectedDay() {
  var day = document.getElementById('seletedDay').value;

  setInitialValue(day);
}
