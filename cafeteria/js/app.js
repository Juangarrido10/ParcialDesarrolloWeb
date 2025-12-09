const template = document.getElementById("product-template");
const container = document.getElementById("product-list");

fetch("data/products.json")
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const clone = template.content.cloneNode(true);

      clone.querySelector("img").src = product.imagen;
      clone.querySelector("img").alt = product.nombre;
      clone.querySelector("h3").textContent = product.nombre;
      clone.querySelector(".descripcion").textContent = product.descripcion;
      clone.querySelector(".precio").textContent = `$${product.precio}`;

      container.appendChild(clone);
    });
  })
  .catch(error => console.error("Error al cargar productos:", error));