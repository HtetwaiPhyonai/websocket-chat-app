<template>
    <div class="flex min-h-screen">
        <Sidebar :current-user="currentUser" />
        <div class="flex-1 overflow-y-auto">
            <router-view />
        </div>
    </div>
</template>

<script setup>
// import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
// import ChatRoom from '../page/ChatRoom/ChatRoom.vue';
import { ref } from 'vue';

const currentUser = ref(JSON.parse(localStorage.getItem('user') || '{}'));

</script>