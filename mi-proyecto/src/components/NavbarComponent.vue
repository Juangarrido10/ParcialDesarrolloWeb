<template>
  <nav class="navbar-modern">
    <div class="navbar-container">
      <h1 class="brand-name">TecnoHome 🏠</h1>
      <button class="btn-logout" @click="handleLogout">Cerrar sesión</button>
    </div>
  </nav>
</template>

<script>
import auth from '@/services/auth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const handleLogout = () => {
      auth.logout()
      router.push('/login')
    }
    return { handleLogout }
  }
}
</script>

<style scoped>
.navbar-modern {
  background: linear-gradient(135deg, #2563eb, #1e3a8a);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  position: relative;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: center; /* 🔹 centramos el contenido */
  position: relative;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-align: center;
}

.btn-logout {
  position: absolute;
  right: 0; /* 🔹 mantenemos el botón a la derecha */
  background: white;
  color: #1e3a8a;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-logout:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}
</style>
