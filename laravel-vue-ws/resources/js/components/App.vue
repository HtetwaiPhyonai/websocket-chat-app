<template>
  <div class="flex min-h-screen">
    <!-- <Sidebar v-if="showSidebar" /> -->
    <div class="flex-1 overflow-y-auto">
      <router-view />
      <Toast />
    </div>
  </div>
</template>

<script setup>
// import Sidebar from './Sidebar.vue'
import Toast from 'primevue/toast'
import { useRoute } from 'vue-router'

// const route = useRoute()
// const hideOnRoutes = ['/login', '/register']
// const showSidebar = !hideOnRoutes.includes(route.path)
</script>

<style>
/* Add any custom styles here if needed */
</style>