<template>
  <div class="products-container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="title">📦 Productos</h3>
      <button class="btn btn-primary btn-new" @click="openCreate">+ Nuevo producto</button>
    </div>

    <div v-if="loading" class="text-center">Cargando...</div>

    <div v-else class="table-responsive">
      <table class="table-modern">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in products" :key="p.id">
            <td><img :src="p.image" class="product-img" /></td>
            <td>{{ p.title }}</td>
            <td>${{ p.price }}</td>
            <td>
              <button class="btn-action edit" @click="openEdit(p)">✏️</button>
              <button class="btn-action delete" @click="remove(p.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div class="modal" tabindex="-1" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content p-2">
          <form @submit.prevent="save">
            <div class="modal-header border-0">
              <h5 class="modal-title">
                {{ form.id ? 'Editar producto' : 'Crear producto' }}
              </h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>

            <div class="modal-body">
              <label>Nombre</label>
              <input v-model="form.title" class="form-control mb-2" required />

              <label>Precio</label>
              <input type="number" v-model.number="form.price" class="form-control mb-2" required />

              <label>Imagen URL</label>
              <input v-model="form.image" class="form-control mb-2" />

              <label>Descripción</label>
              <textarea v-model="form.description" class="form-control"></textarea>
            </div>

            <div class="modal-footer border-0">
              <button type="button" class="btn btn-outline-secondary" @click="closeModal">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap'
import Api from '../services/api'

export default {
  data() {
    return { products: [], loading: true, form: {}, modalInstance: null }
  },
  methods: {
    async fetchProducts() {
      this.loading = true
      try {
        const res = await Api.listProducts()
        this.products = res.data
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    openCreate() {
      this.form = { title: '', price: 0, image: '', description: '' }
      this.showModal()
    },
    openEdit(p) {
      this.form = { ...p }
      this.showModal()
    },
    async save() {
      try {
        if (this.form.id) await Api.updateProduct(this.form.id, this.form)
        else await Api.createProduct(this.form)
        await this.fetchProducts()
        this.closeModal()
      } catch (e) { console.error(e) }
    },
    async remove(id) {
      if (!confirm('¿Eliminar producto?')) return
      try {
        await Api.deleteProduct(id)
        await this.fetchProducts()
      } catch (e) { console.error(e) }
    },
    showModal() {
      const modal = new bootstrap.Modal(this.$refs.modal)
      this.modalInstance = modal
      modal.show()
    },
    closeModal() {
      if (this.modalInstance) this.modalInstance.hide()
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>

<style scoped>
.products-container {
  background:rgb(225, 225, 226);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.title {
  color:rgb(46, 45, 45);
  font-weight: 700;
}

.table-modern {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.table-modern th {
  background: #2563eb;
  color: white;
  padding: 12px;
  text-align: left;
}

.table-modern td {
  padding: 10px 12px;
  vertical-align: middle;
}

.product-img {
  width: 80px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

.btn-action {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 0 4px;
  transition: transform 0.2s;
}
.btn-action:hover {
  transform: scale(1.1);
}
.edit {
  color: #2563eb;
}
.delete {
  color: #dc2626;
}
.btn-new {
  border-radius: 10px;
  font-weight: 600;
  padding: 8px 14px;
}
</style>
