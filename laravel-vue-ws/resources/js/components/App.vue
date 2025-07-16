<template>
  <div class="flex min-h-screen">
    <!-- <Sidebar  /> -->

    <div class="flex-1 overflow-y-auto">
      <Navbar v-if="showSidebar" />
      <router-view />
      <Toast />
    </div>
  </div>
</template>

<script setup>
// import Sidebar from './Sidebar.vue'
import Toast from "primevue/toast";
import Navbar from "../components/Navbar.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const hideOnRoutes = ["/login", "/register"];
const showSidebar = computed(() => !hideOnRoutes.includes(route.path));
</script>

<style>
/* Add any custom styles here if needed */
</style>
