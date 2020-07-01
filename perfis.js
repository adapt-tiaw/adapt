window.onload = validateUserLogged;

function validateUserLogged() {
  let divBotao = document.getElementsByClassName('mt');

  let db = readLocalStorage();

  if (!db.session.loged) {
    Array.from(divBotao).forEach(button => {
      button.innerHTML = '';
    });
  }
}

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

function profile(prop) {
  let db = readLocalStorage();

  let userEmail = db.session.email;

  let userIndex = db.users.findIndex(user => user.email === userEmail);
  let user = db.users.find(user => user.email === userEmail);

  if (user.todos) {
    let existTodos = confirm(
      'Deseja excluir todas as tarefas previamente cadastradas?',
    );
    existTodos ? delete user.todos : null;
  }

  user.profile = prop;

  db.users[userIndex] = user;

  saveOnLocalStorage(db);

  window.location.href = `rotina${prop}.html`;
}
