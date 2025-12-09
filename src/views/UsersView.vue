<template>
  <div>
    <h3>Usuarios <button class="btn btn-sm btn-success" @click="openCreate"><i class="bi bi-plus"></i> Nuevo</button></h3>
    <Alert :message="alertMsg" :type="alertType" v-if="alertMsg" />
    <table class="table table-striped">
      <thead><tr><th>Nombre</th><th>Usuario</th><th>Email</th><th>Acciones</th></tr></thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.name }}</td>
          <td>{{ u.username }}</td>
          <td>{{ u.email }}</td>
          <td>
            <button class="btn btn-sm btn-primary me-1" @click="openEdit(u)"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-danger" @click="confirmDelete(u)"><i class="bi bi-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>

    <UserModal ref="modal" @saved="onSaved" />
    <!-- Confirm delete modal básico -->
    <div class="modal fade" id="confirmDeleteModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">¿Eliminar usuario {{ deleting?.name }}?</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button class="btn btn-danger" @click="deleteUser">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from '../services/userService'
import UserModal from '../components/UserModal.vue'
import Alert from '../components/Alert.vue'

export default {
  components: { UserModal, Alert },
  data() { return { users: [], alertMsg: '', alertType: 'success', deleting: null } },
  mounted() { this.fetch() },
  methods: {
    async fetch() {
      try {
        const res = await userService.list()
        this.users = res.data
      } catch (err) { console.error(err) }
    },
    openCreate() { this.$refs.modal.open() },
    openEdit(u) { this.$refs.modal.open(u) },
    onSaved(msg) {
      this.alertMsg = msg
      setTimeout(()=> this.alertMsg = '', 3000)
      this.fetch()
    },
    confirmDelete(u) {
      this.deleting = u
      const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'))
      modal.show()
    },
    async deleteUser() {
      try {
        await userService.delete(this.deleting.id)
        this.alertMsg = 'Usuario eliminado'
        const modalEl = document.getElementById('confirmDeleteModal')
        bootstrap.Modal.getInstance(modalEl).hide()
        this.fetch()
        setTimeout(()=> this.alertMsg = '', 3000)
      } catch (err) { console.error(err) }
    }
  }
}
</script>
