class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name");
    const price = this.getAttribute("price");
    const description = this.getAttribute("description");
    const image = this.getAttribute("image");

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 15px;
          text-align: center;
          width: 200px;
          background: #fff;
          margin: 10px;
        }
        img {
          width: 100%;
          border-radius: 8px;
        }
        h3 {
          margin: 10px 0 5px;
        }
        p {
          margin: 5px 0;
        }
      </style>
      <div class="card">
        <img src="${image}" alt="${name}">
        <h3>${name}</h3>
        <p>${description}</p>
        <p><strong>$${price}</strong></p>
      </div>
    `;
  }
}

customElements.define("product-card", ProductCard);
