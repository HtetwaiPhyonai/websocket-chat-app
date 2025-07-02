<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
            <!-- Logo/Header -->
            <div class="text-center mb-6">
                <h2 class="text-3xl font-extrabold text-gray-800">Welcome to Chat Room</h2>
                <p class="mt-2 text-sm text-gray-600">Please sign in to continue</p>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin" class="space-y-6">
                <div class="space-y-4">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <InputText id="email" v-model="email" type="email" placeholder="Enter your email"
                            class="w-full" />
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <Password id="password" v-model="password" placeholder="Enter your password" class="w-full"
                            toggleMask />
                    </div>

                    <div>
                        <label for="room" class="block text-sm font-medium text-gray-700 mb-1">Chat Room</label>
                        <Dropdown id="room" v-model="selectedRoom" :options="rooms" optionLabel="label"
                            optionValue="value" placeholder="Select a chat room" class="w-full" />
                    </div>
                </div>

                <Button type="submit" label="Join Chat Room" class="w-full p-button-primary" />
                <!-- Toast should be placed once at the app root (App.vue), not here -->
            </form>

            <!-- Optional Stats Section -->
            <div class="mt-10">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="bg-white px-2 text-gray-500">Active Stats</span>
                    </div>
                </div>

                <div class="mt-6 grid grid-cols-2 gap-4 text-center text-sm text-gray-600">
                    <div>
                        <span class="block text-lg font-bold text-gray-800">15</span>
                        Online Users
                    </div>
                    <div>
                        <span class="block text-lg font-bold text-gray-800">3</span>
                        Active Rooms
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '../router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { useToast } from 'primevue';

const email = ref('');
const password = ref('');
const selectedRoom = ref('');
const toast = useToast();
const rooms = [
    { label: 'General', value: 'general' },
    { label: 'Tech', value: 'tech' },
    { label: 'Random', value: 'random' }
];

const handleLogin = () => {
    if (email.value == 'youngartic.ru@gmail.com' && password.value == '111111' && selectedRoom.value == 'general') {
        router.push(`/chat-room/${encodeURIComponent(email.value)}/${selectedRoom.value}`);
        toast.add({ severity: 'success', summary: 'Success Message', detail: 'login Succcess', life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Login Fail!', life: 3000 });
    }
};
</script>