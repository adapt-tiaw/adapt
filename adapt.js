window.onload = setUserStatus;

function readLocalStorage() {
  let stringData = localStorage.getItem('db');

  if (stringData) {
    return JSON.parse(stringData);
  }
}

function saveOnLocalStorage(data) {
  localStorage.setItem('db', JSON.stringify(data));
}

function setUserStatus() {
  let db = readLocalStorage();

  let divLogin = document.getElementById('userLogin');
  let response = '';

  let userEmail = db.session.email;
  let user = db.users.find(user => user.email === userEmail);

  if (!db.session.loged) {
    response += `<a class="nav-link" href="login.html" data-toggle="form" data-target="#logreg-forms">Entrar | Inscreva-se</a>`;
  } else {
    // response += `<a class="nav-link" href="desconnectUser()" data-toggle="form" data-target="#logreg-forms">${user.name} - Sair</a>`;
    response += `<button onclick="desconnectUser()" >${user.name.toUpperCase()} - Sair</button>`;
  }

  divLogin.innerHTML = response;
}

function desconnectUser() {
  let db = readLocalStorage();

  db.session.loged = false;
  db.session.email = null;

  saveOnLocalStorage(db);

  window.location.href = 'login.html';
}
