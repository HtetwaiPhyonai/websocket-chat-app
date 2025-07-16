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
                        <InputText id="email" v-model="form.email" type="email" placeholder="Enter your email"
                            class="w-full" />
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <Password id="password" v-model="form.password" placeholder="Enter your password" class="w-full"
                            toggleMask />
                    </div>

                    <div>
                        <label for="room" class="block text-sm font-medium text-gray-700 mb-1">Chat Room</label>
                        <Dropdown id="room" v-model="form.chat_room" :options="rooms" optionLabel="label"
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
                        <p class="bg-white px-2 text-gray-500">
                            Don't have an account?
                            <router-link to="/register">Register here</router-link>
                        </p>
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
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { useToast } from 'primevue';

const router = useRouter();
const toast = useToast();

const form = reactive({
    email: '',
    password: '',
    chat_room: ''
});
const loading = ref(false);
const error = ref(null);

const rooms = [
    { label: 'General', value: 'general' },
    { label: 'Tech', value: 'tech' },
    { label: 'Random', value: 'random' }
];

async function handleLogin() {
    loading.value = true;
    error.value = null;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        });

        const data = await response.json();
        

        if (response.ok) {
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/home');
            toast.add({ severity: 'success', summary: 'Success', detail: 'Login Success', life: 3000 });
        } else {
            error.value = data.message || 'Login failed';
            toast.add({ severity: 'error', summary: 'Error', detail: error.value, life: 3000 });
        }
    } catch (err) {
        error.value = 'Network error. Please try again.';
        toast.add({ severity: 'error', summary: 'Error', detail: error.value, life: 3000 });
    } finally {
        loading.value = false;
    }
}
</script>