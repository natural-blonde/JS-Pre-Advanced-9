let login1 = document.getElementById('login');
let password1 = document.getElementById('password');
let email1 = document.getElementById('email');
let passLogin = /^[a-zA-Z]{4,16}$/;
document.getElementById('login').oninput = function () {
    if (passLogin.test(login1.value)) {
        ableButton();
        login1.classList.add('green');
        login1.classList.remove('red');
    }
    else {
        login1.classList.add('red');
        login1.classList.remove('green');
    }
};
let passPassword = /^[a-z0-9\-._]{4,16}$/;
document.getElementById('password').oninput = function () {
    if (passPassword.test(password1.value)) {
        ableButton();
        password1.classList.add('green');
        password1.classList.remove('red');
    }
    else {
        password1.classList.add('red');
        password1.classList.remove('green');
    }
};
let passEmail = /^[a-z0-9\-.]+@[a-z]+\.[a-z]+$/;
document.getElementById('email').oninput = function () {
    if (passEmail.test(email1.value)) {
        ableButton();
        email1.classList.add('green');
        email1.classList.remove('red');
    }
    else {
        email1.classList.add('red');
        email1.classList.remove('green');
    }
};
let user;
let userMassive = [];
document.getElementById('add-user').onclick = function addUser() {
    if ((passLogin.test(login1.value) && (passPassword.test(password1.value)) && (passEmail.test(email1.value)))) {
        ableButton();
        user = {
            login: login1.value,
            password: password1.value,
            email: email1.value
        };
        userMassive.push(user);
        login1.value = '';
        password1.value = '';
        email1.value = '';
        document.getElementById('login').classList.remove('green');
        document.getElementById('password').classList.remove('green');
        document.getElementById('email').classList.remove('green');
        render();
    }
};
function render() {
    document.querySelector('tbody').innerHTML = '';
    for (let i = 0; i < userMassive.length; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${i + 1}</td>
        <td>${userMassive[i].login}</td>
        <td>${userMassive[i].password}</td>
        <td>${userMassive[i].email}</td>
        <td><input type='button' class = 'editBtn btn edit' id = 'editBtn' name = 'edit' value = 'Edit'></td>
        <td><input type='button' class = 'deleteBtn btn delete' id = 'deleteBtn' name = 'delete' value = 'Delete'></td>`;
        document.getElementById('users-list').append(row);
    }
}
document.querySelector('tbody').onclick = (event) => event.target.classList.contains('edit') ? editUser(event) :
    event.target.classList.contains('delete') ? deleteUser(event) :
        0;
function deleteUser(event) {
    let index = event.target.parentElement.parentElement.firstElementChild.textContent - 1;
    userMassive.splice(index, 1);
    render();
}
let userIndex;
let edit;
function editUser(event) {
    userIndex = event.target.parentElement.parentElement.firstElementChild.textContent - 1;
    edit = userMassive[userIndex];
    login1.value = edit.login;
    password1.value = edit.password;
    email1.value = edit.email;
    document.getElementById('add-user').setAttribute("hidden", "true");
    document.getElementById('edit-user').removeAttribute("hidden");
}
document.getElementById('edit-user').onclick = function saveEditUser() {
    if (passLogin.test(login1.value) && passPassword.test(password1.value) && passEmail.test(email1.value)) {
        ableButton();
        edit.login = login1.value;
        edit.password = password1.value;
        edit.email = email1.value;
        document.getElementById('add-user').removeAttribute("hidden");
        document.getElementById('edit-user').setAttribute("hidden", "true");
        login1.value = "";
        password1.value = "";
        email1.value = "";
        document.getElementById('login').classList.remove('green');
        document.getElementById('password').classList.remove('green');
        document.getElementById('email').classList.remove('green');
        render();
    }
};
function ableButton() {
    let testAdd = document.getElementById("add-user");
    let testEdit = document.getElementById("edit-user");
    if (passLogin.test(login1.value) && passPassword.test(password1.value) && passEmail.test(email1.value)) {
        testAdd.removeAttribute("disabled");
        testEdit.removeAttribute("disabled");
    }
    else {
        testAdd.setAttribute("disabled", "true");
        testEdit.setAttribute("disabled", "true");
    }
}
