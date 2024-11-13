import { carritos } from './object.js';
import { formatCurrency } from "./helpers.js";

//variables
const con = document.querySelector('.container-2');
const searchInput = document.querySelector('.search');

// Función para renderizar los productos
const renderProducts = (filteredProducts) => {
  // Limpiar la lista de productos antes de volver a renderizar
  con.innerHTML = '';
  
  // Iterar sobre los productos filtrados y agregarlos al DOM
  filteredProducts.forEach((product) => {
    const row = document.createElement('div');
    row.innerHTML = `<div class="cards">
      <img class="imagen-game" loading="lazy" src="${product.imagen}" alt="imagen del juego">
      <h5 class="producto">${product.nombre}</h5>
      <p class="precio">Precio: ${formatCurrency(product.precio)}</p>
      <div class="info">
        <a class="button details" id="details" data-id="${product.id}" href="">Detalles</a>
        <a class="button buy" id="buy" data-id="${product.id}" href="">Comprar</a>
      </div>
    </div>`;
    
    // Añadir el producto al contenedor
    con.appendChild(row);
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

// Event listeners para botones de detalles y compra
const handleButtonClick = (e) => {
  e.preventDefault();
  const param = e.target.dataset.id;
  
  // Verifica si el botón es para detalles o compra
  if (e.target.id === "details") {
    location.href = `./details.html?id=${param}`;
  } else if (e.target.id === "buy") {
    location.href = `./cart.html?id=${encodeURIComponent(param)}`;
  }
};

// Agregar event listeners a los botones de detalles y comprar
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('button')) {
    handleButtonClick(e);
  }
});
