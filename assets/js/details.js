// Imports
import { carritos } from "./object.js";

// Variables
const urlParams = new URLSearchParams(location.search);
const id = urlParams.get("id");
const con = document.querySelector('.container-4');

// Función find para seleccionar el juego con el id proporcionado
let juego = carritos.find((juego) => juego.id == id);

if (juego) {
    const row = document.createElement('div');
    row.innerHTML = `
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
          <img src="${juego.imagen}" alt="" width="100%" style="border-radius: 10px; margin: 30px;">
        </div>
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
          <h1 style="margin: 30px;">${juego.nombre}</h1>
          <p style="margin: 30px;">${juego.categoria}</p>
          <p style="margin: 30px;">${juego.descripcion}</p>
          <p style="margin: 30px;">precio: ${juego.precio}</p>
          <a class="button buy" id="buy" style="margin: 30px;" data-id="${juego.id}">Comprar</a>
        </div>
      </div>`;
    con.appendChild(row);
} else {
    const row = document.createElement('div');
    row.innerHTML = `
      <div class="card" style="width: 100%;">
        <h5 class="card-title text-center">Disculpa, no se encontró el producto</h5>
      </div>`;
    
    // Añadir al contenedor
    con.appendChild(row);
}

// Evento click para el botón "Comprar"
const button = document.querySelector("#buy");
if (button) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let param = e.target.dataset.id;
    location.href = "./cart.html?id=" + encodeURIComponent(param);
  });
}
