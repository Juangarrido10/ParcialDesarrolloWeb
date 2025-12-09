<template>
  <div class="modal fade" id="userModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="save">
          <div class="modal-header">
            <h5 class="modal-title">{{ editing ? 'Editar usuario' : 'Crear usuario' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label>Nombre</label>
              <input v-model="form.name" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Usuario</label>
              <input v-model="form.username" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Email</label>
              <input v-model="form.email" class="form-control" type="email" required />
            </div>
            <div class="mb-3">
              <label>Contraseña</label>
              <input v-model="form.password" class="form-control" type="password" :required="!editing" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button class="btn btn-primary" type="submit">{{ editing ? 'Guardar' : 'Crear' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import userService from '../services/userService'
import * as bootstrap from 'bootstrap' 

export default {
  data() {
    return {
      form: { name:'', username:'', email:'', password:'' },
      editing: false,
      currentId: null,
      modalInstance: null 
    }
  },
  mounted() {
    const modalEl = document.getElementById('userModal')
    this.modalInstance = new bootstrap.Modal(modalEl)
  },
  methods: {
    open(user) {
      this.editing = !!user
      if (user) {
        this.currentId = user.id
        this.form = { ...user }
      } else {
        this.currentId = null
        this.form = { name:'', username:'', email:'', password:'' }
      }
      if (this.modalInstance) this.modalInstance.show() 
    },
    async save() {
      try {
        if (this.editing) {
          await userService.update(this.currentId, this.form)
          if (this.modalInstance) this.modalInstance.hide()
          this.$emit('saved', 'Usuario actualizado')
        } else {
          await userService.create(this.form)
          if (this.modalInstance) this.modalInstance.hide()
          this.$emit('saved', 'Usuario creado')
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>