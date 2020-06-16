// Busca dados cadastrados no local storage
function readLocalStorage() {
  let stringData = localStorage.getItem('db');

  if (stringData) {
    return JSON.parse(stringData);
  } else {
    alert('Usuario não autenticado!');
    window.location.href = 'adapt.html';
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

  window.location.href = `adapt.html`;
}
