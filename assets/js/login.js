import { usuarios } from "./users.js";
// variables
let div = document.querySelector('.alert-container');
let alert = document.createElement('div');

// listeners
document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault();
    let nombre = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;

    if (nombre.trim() === "" || password.trim() === "") {
        alert.classList.add('alert', 'alert-danger');
        alert.innerText = 'Todos los campos deben ser rellenados';
        div.appendChild(alert);
        setTimeout(() => {
            div.removeChild(alert); // Corregido: se usa removeChild
        }, 5000);

    } else {
        let encontrado = usuarios.find(usuario => usuario.nombre === nombre && usuario.password === password);

        if (encontrado) {
            alert.classList.add('alert', 'alert-success');
            alert.innerText = 'Usuario autenticado, redireccionando...';
            div.appendChild(alert);
            setTimeout(() => {
                div.removeChild(alert); // Corregido: se usa removeChild
                location.href = "../views/inventory.html"; // Redirección
            }, 5000);

        } else {
            alert.classList.add('alert', 'alert-danger');
            alert.innerText = 'Datos incorrectos';
            div.appendChild(alert);
            setTimeout(() => {
                div.removeChild(alert); // Corregido: se usa removeChild
            }, 5000);
        }
    }
});
