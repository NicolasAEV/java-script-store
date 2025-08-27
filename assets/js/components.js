// Carga dinámica de navbar y footer en todas las páginas
// Uso: <div id="navbar-component"></div> y <div id="footer-component"></div>

function includeComponent(id, url) {
  const el = document.getElementById(id);
  if (el) {
    fetch(url)
      .then(res => res.text())
      .then(html => { el.innerHTML = html; })
      .catch(() => { el.innerHTML = '<div style="color:red">Error al cargar '+url+'</div>'; });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Usar rutas absolutas para máxima compatibilidad
  includeComponent('header-component', '/components/header.html');
  includeComponent('navbar-component', '/components/navbar.html');
  includeComponent('footer-component', '/components/footer.html');
});