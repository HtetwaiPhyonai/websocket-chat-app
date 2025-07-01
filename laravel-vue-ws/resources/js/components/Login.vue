<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
            <!-- Logo/Header -->
            <div class="text-center">
                <h2 class="mt-6 text-3xl font-bold text-gray-900">
                    Welcome to Chat Room
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    Please sign in to continue
                </p>
            </div>

            <!-- Login Form -->
            <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
                <div class="rounded-md shadow-sm space-y-4">
                    <div>
                        <label for="username" class="sr-only">Username</label>
                        <input id="username" v-model="username" type="text" required
                            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Enter your username" />
                    </div>

                    <div>
                        <label for="room" class="sr-only">Chat Room</label>
                        <select id="room" v-model="selectedRoom"
                            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm">
                            <option value="" disabled>Select a chat room</option>
                            <option value="general">General</option>
                            <option value="tech">Tech</option>
                            <option value="random">Random</option>
                        </select>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-stone-900 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                        Join Chat Room
                    </button>
                </div>
            </form>

            <!-- Optional: Recent Rooms or Stats -->
            <div class="mt-6">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">
                            Active Rooms
                        </span>
                    </div>
                </div>
                <div class="mt-6 grid grid-cols-2 gap-3">
                    <div class="text-center text-sm text-gray-500">
                        <span class="block font-medium text-gray-900">15</span>
                        Online Users
                    </div>
                    <div class="text-center text-sm text-gray-500">
                        <span class="block font-medium text-gray-900">3</span>
                        Active Rooms
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const selectedRoom = ref('');

const handleLogin = () => {
    // Handle login/join room logic here
    console.log('Joining room:', {
        username: username.value,
        room: selectedRoom.value
    });
};
</script>
