<template>
  <div class="login-page">
    <div class="login-card">
      <h2 class="title">🔐 Iniciar sesión</h2>

      <form @submit.prevent="login" class="form">
        <div class="form-group">
          <label>Usuario</label>
          <input
            v-model="user.username"
            type="text"
            class="input"
            placeholder="Ingrese su usuario"
            required
          />
        </div>

        <div class="form-group">
          <label>Contraseña</label>
          <input
            v-model="user.password"
            type="password"
            class="input"
            placeholder="Ingrese su contraseña"
            required
          />
        </div>

        <div v-if="error" class="error-msg">{{ error }}</div>

        <button class="btn-login" type="submit">Entrar</button>
      </form>

      <p class="note">
        Validación educativa: usuarios en
        <code>public/usuarios.json</code>.
      </p>
    </div>
  </div>
</template>

<script>
import auth from '../services/auth'

export default {
  data() {
    return {
      user: { username: '', password: '' },
      error: ''
    }
  },
  methods: {
    async login() {
      this.error = ''
      try {
        const res = await fetch('/usuarios.json')
        const users = await res.json()

        const found = users.find(
          u =>
            u.username === this.user.username &&
            u.password === this.user.password
        )

        if (found) {
          localStorage.setItem('user', JSON.stringify(found))
          this.$router.push('/dashboard')
        } else {
          this.error = 'Credenciales inválidas'
        }
      } catch (e) {
        console.error(e)
        this.error = 'Error validando usuario'
      }
    }
  }
}
</script>

<style scoped>
/* --- Fondo solo con imagen --- */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/login.png') no-repeat center center;
  background-size: cover;
  padding: 20px;
}

/* --- Tarjeta del formulario --- */
.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6px);
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-align: center;
}

/* --- Título --- */
.title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
}

/* --- Campos --- */
.form-group {
  text-align: left;
  margin-bottom: 1.2rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #334155;
}

.input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
}

.input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

/* --- Error --- */
.error-msg {
  color: #ef4444;
  background: #fee2e2;
  border: 1px solid #fca5a5;
  padding: 8px;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

/* --- Botón --- */
.btn-login {
  width: 100%;
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-login:hover {
  background: #1e40af;
  transform: translateY(-2px);
}

/* --- Nota --- */
.note {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: #64748b;
}
code {
  color: #1e3a8a;
}
</style>
