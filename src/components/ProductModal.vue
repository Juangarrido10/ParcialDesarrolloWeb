<template>
  <div class="modal fade" id="productModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="save">
          <div class="modal-header">
            <h5 class="modal-title">{{ editing ? "Editar producto" : "Crear producto" }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label>Título</label>
              <input v-model="form.title" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Precio</label>
              <input v-model.number="form.price" type="number" min="0" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Categoría</label>
              <input v-model="form.category" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Descripción</label>
              <textarea v-model="form.description" class="form-control" rows="3" required></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary">{{ editing ? "Guardar cambios" : "Crear producto" }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal fade" id="deleteProductModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmar Eliminación</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          ¿Deseas eliminar el producto <strong>{{ selectedProduct?.title }}</strong>?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productService from "../services/productService";
import * as bootstrap from "bootstrap";

export default {
  data() {
    return {
      editing: false,
      currentId: null,
      form: {
        title: "",
        price: 0,
        category: "",
        description: ""
      },
      selectedProduct: null,
      productModalInstance: null,
      deleteModalInstance: null
    };
  },
  mounted() {
    this.productModalInstance = new bootstrap.Modal(document.getElementById("productModal"));
    this.deleteModalInstance = new bootstrap.Modal(document.getElementById("deleteProductModal"));
  },
  methods: {
    open(product = null) {
      this.editing = !!product;
      if (this.editing) {
        this.currentId = product.id;
        this.form = { ...product };
      } else {
        this.currentId = null;
        this.form = { title: "", price: 0, category: "", description: "" };
      }
      this.productModalInstance.show();
    },

    async save() {
      try {
        if (this.editing) {
          await productService.update(this.currentId, this.form);
        } else {
          await productService.create(this.form);
        }
        this.productModalInstance.hide();
        this.$emit("saved");
      } catch (error) {
        console.error("Error al guardar producto:", error);
      }
    },

    openDelete(product) {
      this.selectedProduct = product;
      this.deleteModalInstance.show();
    },

    async confirmDelete() {
      if (!this.selectedProduct) return;
      try {
        await productService.delete(this.selectedProduct.id);
        this.deleteModalInstance.hide();
        this.selectedProduct = null;
        this.$emit("deleted");
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  }
};
</script>

