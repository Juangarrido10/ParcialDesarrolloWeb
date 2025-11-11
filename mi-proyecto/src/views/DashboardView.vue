<template>
  <div class="d-flex">
    <SidebarComponent />
    <div class="flex-grow-1">
      <NavbarComponent />
      <main class="p-4">
        <router-view />
      </main>
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import SidebarComponent from '../components/SidebarComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

export default {
  components: { SidebarComponent, NavbarComponent, FooterComponent }
}
</script>

<style>
/* Ajustes para que el sidebar sea fijo en pantallas grandes */
</style>
