<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h4>Clientes</h4>
      <button class="btn btn-success" @click="openCreate">+ Nuevo cliente</button>
    </div>

    <div v-if="loading" class="text-center">Cargando...</div>

    <table v-else class="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in clientes" :key="c.id">
          <td>{{ c.nombre }}</td>
          <td>{{ c.email }}</td>
          <td>{{ c.telefono }}</td>
          <td>{{ c.direccion }}</td>
          <td>
            <button class="btn btn-sm btn-primary me-1" @click="openEdit(c)">Editar</button>
            <button class="btn btn-sm btn-danger" @click="remove(c.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal (crear/editar cliente) -->
    <div class="modal" tabindex="-1" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="save">
            <div class="modal-header">
              <h5 class="modal-title">{{ form.id ? 'Editar Cliente' : 'Nuevo Cliente' }}</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-2">
                <label>Nombre</label>
                <input v-model="form.nombre" class="form-control" required />
              </div>
              <div class="mb-2">
                <label>Correo</label>
                <input v-model="form.email" type="email" class="form-control" required />
              </div>
              <div class="mb-2">
                <label>Teléfono</label>
                <input v-model="form.telefono" class="form-control" />
              </div>
              <div class="mb-2">
                <label>Dirección</label>
                <textarea v-model="form.direccion" class="form-control"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
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

// Simulación de API temporal (puedes conectar luego con backend o JSON)
const clientesMock = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', telefono: '3214567890', direccion: 'Calle 123' },
  { id: 2, nombre: 'María Gómez', email: 'maria@example.com', telefono: '3129876543', direccion: 'Av. Principal 45' },
  { id: 3, nombre: 'Carlos Rodríguez', email: 'carlosr@example.com', telefono: '3106543210', direccion: 'Carrera 7 #85-12' },
  { id: 4, nombre: 'Laura Martínez', email: 'lauram@example.com', telefono: '3007896541', direccion: 'Calle 56B #24-09' },
  { id: 5, nombre: 'Andrés López', email: 'andresl@example.com', telefono: '3154567890', direccion: 'Av. 68 #45-20' },
  { id: 6, nombre: 'Sofía Torres', email: 'sofiat@example.com', telefono: '3199871234', direccion: 'Cra. 12 #33-50' },
  { id: 7, nombre: 'Miguel Herrera', email: 'miguelh@example.com', telefono: '3142589630', direccion: 'Transv. 25 #10-22' },
  { id: 8, nombre: 'Camila Ruiz', email: 'camilar@example.com', telefono: '3113698745', direccion: 'Calle 90 #15-30' }
]

export default {
  data() {
    return {
      clientes: [],
      loading: true,
      form: {},
      modalInstance: null
    }
  },
  methods: {
    async fetchClientes() {
      this.loading = true
      setTimeout(() => { // Simula carga desde servidor
        this.clientes = [...clientesMock]
        this.loading = false
      }, 500)
    },
    openCreate() {
      this.form = { nombre: '', email: '', telefono: '', direccion: '' }
      this.showModal()
    },
    openEdit(cliente) {
      this.form = { ...cliente }
      this.showModal()
    },
    save() {
      if (this.form.id) {
        const index = this.clientes.findIndex(c => c.id === this.form.id)
        if (index !== -1) this.clientes[index] = { ...this.form }
      } else {
        const newId = this.clientes.length ? Math.max(...this.clientes.map(c => c.id)) + 1 : 1
        this.clientes.push({ ...this.form, id: newId })
      }
      this.closeModal()
    },
    remove(id) {
      if (!confirm('¿Eliminar cliente?')) return
      this.clientes = this.clientes.filter(c => c.id !== id)
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
    this.fetchClientes()
  }
}
</script>
