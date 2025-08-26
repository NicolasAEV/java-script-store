//imports
import { carritos } from "./object.js";
import { formatCurrency } from "./helpers.js";
//variables
const urlParams = new URLSearchParams(location.search);
const id = urlParams.get("id");
const con = document.querySelector('#productos');
const vaciarCarrito = document.querySelector('#limpiar')
const cart = document.querySelector('#carrito')
let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
// Ahora puedes utilizar el ID en el código de la otra página
//funcion find 

let juego = carritos.find(juego => juego.id == id);
let existe = false;

//listeners
document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
  mostrarCarrito();
  mostrarPrecio();
 
})
//limpiar carrito
// const clean = document.querySelector('#limpiar')
vaciarCarrito.addEventListener('click', (e) => {
  e.preventDefault();
  shoppingCart = [];
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  mostrarCarrito();
  mostrarPrecio();

})

//funciones 
if(id != null || id != undefined){
//agregar a carrito
shoppingCart.forEach((product) => {
  if (product.id === juego.id) {
    existe = true;
    product.cantidad++;
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    mostrarCarrito();
    mostrarPrecio();
  }
});
if (!existe) {
  shoppingCart.push(juego);
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  mostrarCarrito();
  mostrarPrecio();
}
}else{
  mostrarCarrito();
}

// Mostrar en carrito
// Mostrar en carrito
function mostrarCarrito() {
  con.innerHTML = '';
  for (const product of shoppingCart) {
    if (shoppingCart !== null || shoppingCart !== undefined) {
      con.innerHTML += `
      <div class="card shadow-sm border-0 rounded-4 mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex flex-row align-items-center gap-3">
              <img src="${product.imagen}" class="img-fluid rounded-3 border" alt="Shopping item" style="width: 65px; height:65px; object-fit:cover;">
              <div>
                <h5 class="mb-1 fw-bold">${product.nombre}</h5>
                <span class="badge bg-primary mb-1">${product.categoria}</span>
              </div>
            </div>
            <div class="d-flex flex-row align-items-center gap-3">
              <div class="cantidad-container">
                <span class="cantidad-title small">Cantidad</span>
                <div class="cantidad-input-container d-flex align-items-center gap-1">
                  <button class="btn btn-outline-secondary btn-sm btn-qty btn-qty-decrement" onclick="restar('${product.id}')">-</button>
                  <input class="cantidad-input form-control form-control-sm text-center" type="number" value="${product.cantidad}" min="0" max="10" style="width:50px;">
                  <button class="btn btn-outline-secondary btn-sm btn-qty btn-qty-increment" onclick="sumar('${product.id}')">+</button>
                </div>
              </div>
              <div style="width: 80px;">
                <h5 class="mb-0 precio text-success">${formatCurrency(product.precio)}</h5>
              </div>
              <a data-id="${product.id}" class="eliminar ms-2"><i class="fas fa-trash-alt text-danger" onclick='eliminar(${product.id})'></i></a>
            </div>
          </div>
        </div>
      </div>`;
    } else {
      con.innerHTML += `
      <div class="card shadow-sm border-0 rounded-4 mb-3">
        <div class="card-body text-center">
          <p class="mb-0">Por el momento no tienes productos añadidos al carrito</p>
        </div>
      </div>`;
    }
  }
}

//funciones sumar o restar productos con botones
window.restar = (id)=> {
  shoppingCart.forEach(product =>{
    if(product.id == id){
      if (product.cantidad > 1) {    
        product.cantidad -= 1;
     } else {
       shoppingCart = shoppingCart.filter((juego) => juego.id != id);
     }
     localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
     mostrarCarrito();
     mostrarPrecio();
    }
  })
}
window.sumar = (id)=> {

shoppingCart.forEach(product =>{
  if(product.id == id){
    if (product.cantidad >= 1) {    
      product.cantidad += 1;
   } 
   localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
   mostrarCarrito();
   mostrarPrecio();
  }
})
}

//eliminar de carrito
window.eliminar = (id) => {
    shoppingCart.forEach((product) => {
      if (product.id == id) {
   
          shoppingCart = shoppingCart.filter((juego) => juego.id != id);
   
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        mostrarCarrito();
        mostrarPrecio();
      }
});
}
//Calcular total
// const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
function mostrarPrecio() {
  let total = 0;
  let iva = 0.19;
  let ivaTotal = 0;
  let descuento = 0.25;
  let totalConDescuento = 0;
  let subTotal = 0;

  // Calcular el subTotal
  subTotal = shoppingCart.reduce((acc , arr) => {
    acc += (arr.cantidad * arr.precio);
    return acc;
  }, 0);

  // Calcular IVA y total con descuento
  ivaTotal = subTotal * iva;
  totalConDescuento = (subTotal + ivaTotal) * descuento;
  total = (subTotal + ivaTotal) - totalConDescuento;

  // Formatear los precios con el símbolo de pesos chilenos (CLP)


  if(total != null && total != 0) {
    cart.innerHTML = `
      <div class="card shadow-sm border-0 rounded-4 mb-3" style="background: #f8f9fa;">
        <div class="card-body">
          <h5 class="fw-bold mb-3" style="color:#222;">Resumen de compra</h5>
          <div class="d-flex justify-content-between mb-2">
            <span style="color:#444;">SubTotal</span>
            <span style="color:#444;">${formatCurrency(subTotal)}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span style="color:#444;">IVA (19%)</span>
            <span style="color:#444;">${formatCurrency(ivaTotal)}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span style="color:#444;">Descuento 25%</span>
            <span style="color:#444;">${formatCurrency(totalConDescuento)}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span style="color:#444;">Envío</span>
            <span style="color:#28a745;font-weight:600;">Free</span>
          </div>
          <hr>
          <div class="d-flex justify-content-between mb-2">
            <span class="fw-bold" style="font-size:1.1rem; color:#222;">Total</span>
            <span class="fw-bold text-success" style="font-size:1.1rem;">${formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <button type="button" class="btn btn-success w-100 py-3 fw-bold fs-5 shadow-sm" id="btnPagar" style="border-radius:2rem;letter-spacing:1px;">
        <span>Pagar</span>
        <span><i class="fas fa-long-arrow-alt-right ms-2"></i></span>
      </button>
    `;
  }
}

// Agregar event listener para el botón de pagar
document.addEventListener('DOMContentLoaded', () => {
  const btnPagar = document.querySelector('#btnPagar');
  if (btnPagar) {
    btnPagar.addEventListener('click', () => {
  shoppingCart = [];
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  mostrarCarrito();
  mostrarPrecio();
  alert('¡Gracias por tu compra!');
    });
  }
});



