// Configura os botões
document.getElementById('btnLogin').addEventListener('click', login);
document.getElementById('btnSignIn').addEventListener('click', includeUser);

//Busca se há dados ja cadastrados no local storage, se não retorna falso
function readLocalStorage() {
  let stringData = localStorage.getItem('db');
  let newLocalStorage = {
    session: {
      loged: false,
      email: null,
    },
    users: [],
  };

  if (stringData) {
    return JSON.parse(stringData);
  } else {
    saveOnLocalStorage(newLocalStorage);
    return JSON.parse(localStorage.getItem('db'));
  }
}

//Salva dados no local storage
function saveOnLocalStorage(data) {
  localStorage.setItem('db', JSON.stringify(data));
}

// Incluir um novo usuário
function includeUser() {
  //Valor dos inputs no form de cadastro
  let strNameSignIn = document.getElementById('name_cad').value;
  let strEmailSignIn = document.getElementById('email_cad').value;
  let strPasswordSignIn = document.getElementById('password_cad').value;

  if (strNameSignIn === '' || strEmailSignIn === '' || strPasswordSignIn === '')
    return alert('Preencha todos os campos!');

  // Recupera dados do Local Storage
  let db = readLocalStorage();

  // Verifica se email existe, caso sim retorna seu index, se não retorna -1
  let user = db.users.findIndex(user => user.email === strEmailSignIn);

  console.log(user);

  if (user !== -1) return alert('Email já cadastrado!');

  // Cria novo usuário
  let newUser = {
    name: strNameSignIn,
    email: strEmailSignIn,
    password: strPasswordSignIn,
  };

  // Adiciona novo usuário a base de usuários
  db.users.push(newUser);

  // Define usuário logado
  db.session.loged = true;
  db.session.email = newUser.email;

  // Salva os dados no Local Storage
  saveOnLocalStorage(db);

  window.location.href = 'perfis.html';
}

function login() {
  //Valor dos inputs no form de login
  let strEmailLogin = document.getElementById('email').value;
  let strPasswordLogin = document.getElementById('password').value;

  if (strEmailLogin === '' || strPasswordLogin === '')
    return alert('Preencha os campos!');

  // Recupera dados do Local Storage
  let db = readLocalStorage();

  // Verifica se email existe, caso sim retorna objeto do usuário, se não retorna undefined
  let user = db.users.find(user => user.email === strEmailLogin);

  if (user) {
    // Verifica se a senha está correta
    if (user.password !== strPasswordLogin) {
      alert('Senha incorreta');
    } else {
      // Define usuário logado e redireciona para página inicial
      db.session.loged = true;
      db.session.email = user.email;

      saveOnLocalStorage(db);

      window.location.href = 'adapt.html';
    }
  } else {
    alert('E-mail não cadastrado, cadastre primeiro');
  }
}
