<template>
  <footer class="footer-modern">
    <p>© {{ new Date().getFullYear() }} <span class="brand">Mi Tienda</span> — Todos los derechos reservados</p>
  </footer>
</template>

<style scoped>
.footer-modern {
  background: #f1f5f9;
  color: #475569;
  text-align: center;
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
}
.brand {
  color: #2563eb;
  font-weight: 700;
}
</style>
