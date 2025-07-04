<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
            <!-- Header -->
            <div class="text-center mb-6">
                <h2 class="text-3xl font-extrabold text-gray-800">Create your Account</h2>
                <p class="mt-2 text-sm text-gray-600">Join the chat room today!</p>
            </div>

            <!-- Register Form -->
            <form @submit.prevent="handleRegister" class="space-y-6">
                <div class="space-y-4">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <InputText id="name" v-model="form.name" placeholder="Your name" class="w-full" />
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <InputText id="email" v-model="form.email" type="email" placeholder="Enter your email"
                            class="w-full" />
                    </div>

                    <div>
                        <label for="chatRoom" class="block text-sm font-medium text-gray-700 mb-1">Chat Room</label>
                        <Dropdown id="chatRoom" v-model="form.chat_room" :options="rooms" optionLabel="label" optionValue="value" placeholder="Select a chat room" class="w-full" />
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <Password id="password" v-model="form.password" placeholder="Create a password" class="w-full"
                            toggleMask />
                    </div>

                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm
                            Password</label>
                        <Password id="confirmPassword" v-model="form.password_confirmation"
                            placeholder="Confirm your password" class="w-full" toggleMask />
                    </div>
                </div>

                <Button type="submit" label="Register" class="w-full p-button-primary" :loading="loading" />
            </form>

            <div class="mt-6 text-center text-sm text-gray-600">
                Already have an account?
                <router-link to="/login" class="text-indigo-600 hover:underline">Login here</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { useToast } from 'primevue';
import Dropdown from 'primevue/dropdown';

const router = useRouter();
const toast = useToast();

const form = reactive({
    name: '',
    email: '',
    chat_room: '',
    password: '',
    password_confirmation: ''
});

const loading = ref(false);
const error = ref(null);

const rooms = [
    { label: 'General', value: '1' },
    { label: 'Tech', value: '2' },
    { label: 'Random', value: '3' }
];

async function handleRegister() {
    if (form.password !== form.password_confirmation) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Passwords do not match', life: 3000 });
        return;
    }

    loading.value = true;
    error.value = null;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(form)
        });

        const data = await response.json();
        console.log(data);
        

        if (response.ok) {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Registration successful', life: 3000 });
            router.push('/login');
        } else {
            error.value = data.message || 'Registration failed';
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
