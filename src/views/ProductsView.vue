<template>
  <div>
    <h3 class="mb-3">
      Productos
      <button class="btn btn-success btn-sm ms-2" @click="openCreate">
        <i class="bi bi-plus"></i> Nuevo
      </button>
    </h3>

    <Alert v-if="alertMsg" :message="alertMsg" :type="alertType" />

    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <th>Título</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>{{ p.title }}</td>
          <td>{{ p.price }}</td>
          <td>{{ p.category }}</td>
          <td>{{ p.description }}</td>

          <td>
            <button class="btn btn-primary btn-sm me-2" @click="openEdit(p)">
              <i class="bi bi-pencil"></i>
            </button>

            <button class="btn btn-danger btn-sm" @click="confirmDelete(p)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <ProductModal ref="modal" @saved="onSaved" />

    <div class="modal fade" id="deleteProductModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-body">
            ¿Seguro que deseas eliminar el producto
            <strong>{{ deleting?.title }}</strong>?
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>

            <button type="button" class="btn btn-danger" @click="deleteProduct">
              Eliminar
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import productService from "../services/productService";
import ProductModal from "../components/ProductModal.vue";
import Alert from "../components/Alert.vue";

export default {
  components: {
    ProductModal,
    Alert
  },

  data() {
    return {
      products: [],
      alertMsg: "",
      alertType: "success",
      deleting: null
    };
  },

  mounted() {
    this.fetchProducts();
  },

  methods: {
    async fetchProducts() {
      const res = await productService.list();
      this.products = res.data;
    },

    openCreate() {
      this.$refs.modal.open();
    },

    openEdit(product) {
      this.$refs.modal.open(product);
    },

    confirmDelete(product) {
      this.deleting = product;
      new bootstrap.Modal(document.getElementById("deleteProductModal")).show();
    },

    async deleteProduct() {
      await productService.delete(this.deleting.id);

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deleteProductModal")
      );
      modal.hide();

      this.alertMsg = "Producto eliminado";
      this.fetchProducts();

      setTimeout(() => (this.alertMsg = ""), 2500);
    },

    onSaved(message) {
      this.alertMsg = message;
      this.fetchProducts();
      setTimeout(() => (this.alertMsg = ""), 2500);
    }
  }
};
</script>
