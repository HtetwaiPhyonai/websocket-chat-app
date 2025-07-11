<template>
    <div class="flex min-h-screen">
        <Sidebar />
        <div class="flex-1 overflow-y-auto">
            <router-view />
            <!-- <ChatRoom /> -->
        </div>
    </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import ChatRoom from '../page/ChatRoom/ChatRoom.vue';

</script>