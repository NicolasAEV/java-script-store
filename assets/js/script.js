console.log('script.js cargado');
import { carritos } from './object.js';
import { formatCurrency } from "./helpers.js";

//variables
const con = document.querySelector('.container-2');
// Solo renderizar si el contenedor existe
if (con) {
  // Muestra hasta 5 elementos, pero solo si existen en carritos y el contenedor existe
  for (let i = 0; i < Math.min(5, carritos.length); i++) {
    if (!carritos[i]) continue;
    const row = document.createElement('div');
    row.innerHTML = `
      <div class="card shadow-sm border-0 rounded-4 mb-4 h-100 text-center">
        <img class="card-img-top imagen-game rounded-4" loading="lazy" src="${carritos[i].imagen}" alt="imagen del juego" style="max-height:180px; object-fit:cover;">
        <div class="card-body">
          <h5 class="card-title fw-bold">${carritos[i].nombre}</h5>
          <p class="card-text text-success">${formatCurrency(carritos[i].precio)}</p>
          <div class="d-flex justify-content-center gap-2">
              <button type="button" class="details-btn px-4 py-2 fw-semibold shadow-sm" 
              style="
                border-radius: 2rem;
                letter-spacing:1px;
                background: linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%);
                color: #fff;
                border: none;
                box-shadow: 0 2px 8px rgba(91,134,229,0.10);
                transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
                font-size: 1rem;
              "
              data-id="${carritos[i].id}">
              Detalles
            </button>
                <button type="button" class="buy-btn px-4 py-2 fw-semibold shadow-sm" 
              style="
                border-radius: 2rem;
                letter-spacing:1px;
                background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
                color: #fff;
                border: none;
                box-shadow: 0 2px 8px rgba(67,233,123,0.10);
                transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
                font-size: 1rem;
              "
              data-id="${carritos[i].id}">
              Comprar
            </button>
          </div>
        </div>
      </div>
    `;
    con.appendChild(row);
  }
}

// Delegación de eventos para los nuevos botones modernizados
document.addEventListener('click', (e) => {
  console.log('click detectado', e.target);
  const detailsBtn = e.target.closest('.details-btn');
  if (detailsBtn) {
    e.preventDefault();
    let param = detailsBtn.dataset.id;
    window.location.href = "./views/details.html?id=" + encodeURIComponent(param);
    return;
  }
  const buyBtn = e.target.closest('.buy-btn');
  if (buyBtn) {
    e.preventDefault();
    let param = buyBtn.dataset.id;
    window.location.href = "./views/cart.html?id=" + encodeURIComponent(param);
    return;
  }
});
