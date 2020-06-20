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

  // Elemento para Entrar ou Inscrever-se
  let divLogin = document.getElementById('userLogin');

  // Elemento para entrar em organize-se
  let divOrg = document.getElementById('org');

  let response = '';
  let org = '';

  let userEmail = db.session.email;
  let user = db.users.find(user => user.email === userEmail);

  if (!db.session.loged) {
    response += `<a class="nav-link" href="login.html" data-toggle="form" data-target="#logreg-forms">Entrar | Inscreva-se</a>`;
  } else {
    response += `<button onclick="desconnectUser()" >${user.name.toUpperCase()} - Sair</button>`;
    org += `<a class="nav-link" href="rotina${user.profile}.html">Organize-se</a>`;
  }

  divLogin.innerHTML = response;
  divOrg.innerHTML = org;
}

function desconnectUser() {
  let db = readLocalStorage();

  db.session.loged = false;
  db.session.email = null;

  saveOnLocalStorage(db);

  window.location.href = 'login.html';
}
