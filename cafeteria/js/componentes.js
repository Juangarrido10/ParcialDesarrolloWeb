async function loadComponent(id, file) {
  const response = await fetch(file);
  const content = await response.text();
  document.getElementById(id).innerHTML = content;
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "components/header/header.html");
  loadComponent("footer", "components/footer/footer.html");
  loadComponent("sidebar", "components/sidebar/sidebar.html");
});
