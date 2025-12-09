<template>
  <div class="login-container d-flex justify-content-center align-items-center">
    <div 
      class="card login-card shadow-lg" 
      :class="{ 'animated-card': showCard }"
    >
      <h3 class="mb-4 text-center">Iniciar sesión</h3>

      <div v-if="error" class="alert alert-danger animated-error">{{ error }}</div>

      <form @submit.prevent="onSubmit">
        <div class="mb-3 input-icon">
          <i class="bi bi-person-fill"></i>
          <input v-model="username" class="form-control ps-5" placeholder="Usuario" required />
        </div>

        <div class="mb-3 input-icon">
          <i class="bi bi-lock-fill"></i>
          <input v-model="password" type="password" class="form-control ps-5" placeholder="Contraseña" required />
        </div>

        <button class="btn btn-primary w-100" type="submit">Entrar</button>
      </form>

      <p class="text-center mt-3 text-muted">
        ¿No tienes cuenta? <router-link to="/register">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import authService from '../services/authService'

export default {
  data() {
    return { username: '', password: '', error: null, showCard: false }
  },
  mounted() {
    // Activar animación después de montar
    setTimeout(() => this.showCard = true, 50)
  },
  methods: {
    async onSubmit() {
      try {
        this.error = null
        await authService.login(this.username, this.password)
        this.$router.push('/users')
      } catch (err) {
        this.error = err.message || 'Usuario o contraseña incorrecta'
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  background: linear-gradient(135deg,  #1052ec, #09173e);
  padding: 1rem;
}

.login-card {
  background-color: #fff;
  border-radius: 1rem;
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.5s ease-in-out;
}

.animated-card {
  opacity: 1;
  transform: translateY(0);
}

h3 {
  font-weight: 700;
  color: #1e3a8a;
}

.btn-primary {
  background: linear-gradient(90deg, #0d6efd, #2563eb);
  border: none;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: linear-gradient(90deg, #2563eb, #0d6efd);
}

.input-icon {
  position: relative;
}

.input-icon i {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #6c757d;
  font-size: 1.1rem;
}

.input-icon input {
  padding-left: 2.5rem !important;
  border-radius: 0.5rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}

.animated-error {
  animation: shake 0.3s;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
</style>
