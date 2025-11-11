<template>
  <div>
    <!-- Botón hamburguesa (solo visible en móvil) -->
    <button class="menu-btn" @click="toggleSidebar">
      ☰
    </button>

    <!-- Sidebar -->
    <div :class="['sidebar-modern', { 'sidebar-open': isOpen }]">
      <div class="sidebar-header">TecnoHome 🏠</div>

      <ul class="sidebar-menu">
        <li>
          <router-link to="/dashboard/productos" class="link" active-class="active">
            🛒 Productos
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard/clientes" class="link" active-class="active">
            👥 Clientes
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Fondo oscuro cuando se abre el menú en móvil -->
    <div v-if="isOpen" class="overlay" @click="toggleSidebar"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
/* ====== SIDEBAR GENERAL ====== */
.sidebar-modern {
  background: white;
  color: #1e293b;
  width: 250px;
  height: 100vh;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  transition: transform 0.3s ease-in-out;
}

/* ====== CONTENIDO PRINCIPAL ====== */
:global(main) {
  margin-left: 250px; /* deja espacio para el sidebar */
  transition: margin-left 0.3s;
}

/* ====== CABECERA ====== */
.sidebar-header {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2563eb;
}

/* ====== LINKS ====== */
.sidebar-menu {
  list-style: none;
  padding: 0;
}

.link {
  display: block;
  padding: 12px 20px;
  color: #475569;
  border-radius: 8px;
  margin: 4px 12px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
}

.link:hover {
  background: #e0e7ff;
  color: #1e3a8a;
}

.active {
  background: #2563eb;
  color: white !important;
  font-weight: 600;
}

/* ====== RESPONSIVE ====== */
@media (max-width: 768px) {
  .sidebar-modern {
    transform: translateX(-100%);
  }
  .sidebar-modern.sidebar-open {
    transform: translateX(0);
  }

  /* En móvil, el contenido principal no se desplaza */
  :global(main) {
    margin-left: 0;
  }

  .menu-btn {
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 60;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 22px;
    cursor: pointer;
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 40;
  }
}
</style>
