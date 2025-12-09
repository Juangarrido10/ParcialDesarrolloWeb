<template>
  <nav class="navbar navbar-expand-lg navbar-modern shadow-sm">
    <div class="container-fluid navbar-container">
      <a class="navbar-brand brand-name" href="#">De todito 🛒</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="nav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/users">Usuarios</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Productos</router-link>
          </li>
        </ul>

        <div class="d-flex align-items-center">
          <span v-if="user" class="me-3">Hola, {{ user.name || user.username }}</span>
          <button v-if="user" class="btn btn-outline-danger btn-logout" @click="logout">
            <i class="bi bi-box-arrow-right"></i> Cerrar sesión
          </button>
          <router-link v-else class="btn btn-primary btn-sm" to="/login">Ingresar</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import authService from '../services/authService'

export default {
  data() {
    return { user: authService.getCurrentUser() }
  },
  methods: {
    logout() {
      authService.logout()
      this.user = null
      this.$router.push('/login')
    }
  },
  watch: {
    '$route'() { this.user = authService.getCurrentUser() }
  }
}
</script>

<style scoped>

.navbar-modern {
  background: linear-gradient(135deg, #2563eb, #1e3a8a);
  color: white;
  padding: 0.8rem 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  position: relative;
  transition: all 0.3s;
}


.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
}


.nav-link {
  color: white !important;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ffd700 !important;
}


.btn-logout {
  background: white;
  color: #1e3a8a;
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-logout:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}


.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
