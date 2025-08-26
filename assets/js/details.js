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
      <div class="card shadow-lg border-0 rounded-4 my-4 p-3">
        <div class="row g-4 align-items-center">
          <div class="col-12 col-md-6 text-center">
            <img src="${juego.imagen}" alt="${juego.nombre}" class="img-fluid rounded-4 mb-3" style="max-height:320px; object-fit:cover;">
          </div>
          <div class="col-12 col-md-6">
            <h2 class="fw-bold mb-2">${juego.nombre}</h2>
            <span class="badge bg-primary mb-2">${juego.categoria}</span>
            <p class="mb-2">${juego.descripcion}</p>
            <h4 class="text-success mb-3">${juego.precio}</h4>
            <button type="button" class="buy-btn px-4 py-2 fw-semibold shadow-sm" style="border-radius:2rem;letter-spacing:1px;background:linear-gradient(90deg,#43e97b 0%,#38f9d7 100%);color:#fff;border:none;box-shadow:0 2px 8px rgba(67,233,123,0.10);transition:transform 0.15s,box-shadow 0.15s,background 0.2s;font-size:1rem;" id="buy" data-id="${juego.id}">
              Comprar
            </button>
          </div>
        </div>
      </div>`;
    con.appendChild(row);
} else {
    const row = document.createElement('div');
    row.innerHTML = `
      <div class="card shadow border-0 my-4">
        <div class="card-body text-center">
          <h5 class="card-title">Disculpa, no se encontró el producto</h5>
        </div>
      </div>`;
    con.appendChild(row);
}


// Asignar evento individual al botón Comprar
setTimeout(() => {
  const buyBtn = document.getElementById('buy');
  if (buyBtn) {
    buyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let param = buyBtn.dataset.id;
      window.location.href = "./cart.html?id=" + encodeURIComponent(param);
    });
  }
}, 0);
