document.addEventListener("DOMContentLoaded", () => {
  cargarComponente("./components/header/header.html", "header-container");
  cargarComponente("./components/sidebar/sidebar.html", "sidebar-container");
  cargarComponente("./components/footer/footer.html", "footer-container");
});

function cargarComponente(url, containerId) {
  fetch(url)
    .then(res => res.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch(err => console.error("Error cargando componente:", url, err));
}
