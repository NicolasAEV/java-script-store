import { carritos } from './object.js';
import { formatCurrency } from "./helpers.js";

//variables
const con = document.querySelector('.container-2');
const searchInput = document.querySelector('.search');

// Función para renderizar los productos
const renderProducts = (filteredProducts) => {
  con.innerHTML = '';
  filteredProducts.forEach((product) => {
    const row = document.createElement('div');
    row.innerHTML = `
      <div class="card shadow-sm border-0 rounded-4 mb-4 h-100 text-center">
        <img class="card-img-top imagen-game rounded-4" loading="lazy" src="${product.imagen}" alt="imagen del juego" style="max-height:180px; object-fit:cover;">
        <div class="card-body">
          <h5 class="card-title fw-bold">${product.nombre}</h5>
          <p class="card-text text-success">${formatCurrency(product.precio)}</p>
          <div class="d-flex justify-content-center gap-2">
            <button type="button" class="details-btn px-4 py-2 fw-semibold shadow-sm" style="border-radius:2rem;letter-spacing:1px;background:linear-gradient(90deg,#36d1c4 0%,#5b86e5 100%);color:#fff;border:none;box-shadow:0 2px 8px rgba(91,134,229,0.10);transition:transform 0.15s,box-shadow 0.15s,background 0.2s;font-size:1rem;" data-id="${product.id}">
              Detalles
            </button>
            <button type="button" class="buy-btn px-4 py-2 fw-semibold shadow-sm" style="border-radius:2rem;letter-spacing:1px;background:linear-gradient(90deg,#43e97b 0%,#38f9d7 100%);color:#fff;border:none;box-shadow:0 2px 8px rgba(67,233,123,0.10);transition:transform 0.15s,box-shadow 0.15s,background 0.2s;font-size:1rem;" data-id="${product.id}">
              Comprar
            </button>
          </div>
        </div>
      </div>
    `;
    con.appendChild(row);
  });

  // Asignar eventos individuales a los botones
  const detailsBtns = con.querySelectorAll('.details-btn');
  detailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const param = btn.dataset.id;
      window.location.href = `./details.html?id=${encodeURIComponent(param)}`;
    });
  });
  const buyBtns = con.querySelectorAll('.buy-btn');
  buyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const param = btn.dataset.id;
      window.location.href = `./cart.html?id=${encodeURIComponent(param)}`;
    });
  });
};

// Llamar a la función para mostrar todos los productos inicialmente
renderProducts(carritos);

// Event listener para la búsqueda de productos
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  
  // Filtrar los productos que contienen el término de búsqueda en su nombre
  const filteredProducts = carritos.filter(product => 
    product.nombre.toLowerCase().includes(searchTerm)
  );
  
  // Volver a renderizar los productos filtrados
  renderProducts(filteredProducts);
});

// Delegación de eventos para los nuevos botones modernizados

