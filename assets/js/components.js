// Carga dinámica de navbar y footer en todas las páginas
// Uso: <div id="navbar-component"></div> y <div id="footer-component"></div>

function getBasePath() {
  // Detecta si está en GitHub Pages
  const path = window.location.pathname;
  if (path.includes('/java-script-store/')) {
    return '/java-script-store/components/';
  }
  // Local: carpeta raíz o views
  return '/components/';
}

function includeComponent(id, file) {
  const el = document.getElementById(id);
  if (el) {
    const url = getBasePath() + file;
    fetch(url)
      .then(res => res.text())
      .then(html => { el.innerHTML = html; })
      .catch(() => { el.innerHTML = '<div style="color:red">Error al cargar '+url+'</div>'; });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  includeComponent('header-component', 'header.html');
  includeComponent('navbar-component', 'navbar.html');
  includeComponent('footer-component', 'footer.html');
});