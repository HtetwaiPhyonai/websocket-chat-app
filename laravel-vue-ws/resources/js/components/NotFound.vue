<!-- <template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <p class="text-2xl text-gray-700 mb-2">Page Not Found</p>
      <router-link to="/" class="text-indigo-500 hover:underline">Go Home</router-link>
    </div>
  </template> -->
<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 overflow-hidden">
        <div class="max-w-2xl w-full text-center relative">
            <!-- Animated 404 Section -->
            <div class="mb-8 relative">
                <!-- Main 404 Text with Bounce Animation -->
                <div class="relative inline-block animate-bounce-slow">
                    <div
                        class="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 select-none animate-pulse-color">
                        404
                    </div>
                    <!-- Floating Search Icon -->
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="animate-float">
                            <i class="pi pi-search text-4xl text-gray-400 animate-spin-slow"></i>
                        </div>
                    </div>
                </div>

                <!-- Orbiting Elements -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div class="animate-orbit-1 w-32 h-32">
                        <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                    <div class="animate-orbit-2 w-40 h-40">
                        <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    </div>
                    <div class="animate-orbit-3 w-48 h-48">
                        <div class="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            <!-- Animated Main Content Card -->
            <transition name="slide-up" appear>
                <Card class="shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-card-entrance">
                    <template #content>
                        <div class="p-6">
                            <!-- Animated Title -->
                            <transition name="fade-in" appear :delay="300">
                                <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-text-wave">
                                    <span class="inline-block animate-letter" style="animation-delay: 0.1s">P</span>
                                    <span class="inline-block animate-letter" style="animation-delay: 0.2s">a</span>
                                    <span class="inline-block animate-letter" style="animation-delay: 0.3s">g</span>
                                    <span class="inline-block animate-letter" style="animation-delay: 0.4s">e</span>
                                    <span class="inline-block animate-letter"
                                        style="animation-delay: 0.5s">&nbsp;</span>
                                    <span class="inline-block animate-letter" style="animation-delay: 0.6s">N</span>
                                    <span class="inline-block animate-letter" style="animation-delay: 0.7s">o</span>
                                    <span class="inline-block animate-letter" style="animation-delay: 0.8s">t</span>
                                    <span class="inline-block animate-letter"
                                        style="animation-delay: 0.9s">&nbsp;</span>
                                    <span class="inline-block animate-letter" style="animation-delay: 1.0s">F</span>
                                    <span class="inline-block animate-letter" style="animation-delay: 1.1s">o</span>
                                    <span class="inline-block animate-letter" style="animation-delay: 1.2s">u</span>
                                    <span class="inline-block animate-letter" style="animation-delay: 1.3s">n</span>
                                    <span class="inline-block animate-letter" style="animation-delay: 1.4s">d</span>
                                </h1>
                            </transition>


                            <!-- Animated Action Buttons -->
                            <transition name="slide-up" appear :delay="900">
                                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <Button label="Go Back" icon="pi pi-arrow-left"
                                        class="p-button-outlined p-button-lg animate-button-hover" @click="goBack" />
                                    <Button label="Go Home" icon="pi pi-home"
                                        class="p-button-lg animate-button-hover animate-glow" @click="goHome" />
                                </div>
                            </transition>


                            <!-- Animated Help Links -->
                            <transition name="fade-in" appear :delay="1500">
                                <div class="mt-8 pt-6 border-t border-gray-200">
                                    <p class="text-sm text-gray-500 mb-4">
                                        Need help? Try these popular pages:
                                    </p>
                                    <div class="flex flex-wrap gap-2 justify-center">
                                        <Button v-for="(link, index) in helpLinks" :key="link.label" :label="link.label"
                                            class="p-button-text p-button-sm animate-link-hover"
                                            :style="{ animationDelay: `${index * 0.1}s` }"
                                            @click="navigateTo(link.path)" />
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </template>
                </Card>
            </transition>

            <!-- Animated Footer Message -->
            <transition name="fade-in" appear :delay="1800">
                <div class="mt-8 text-sm text-gray-500 animate-fade-in-up">
                    <p>Error Code: 404 | Page Not Found</p>
                    <p class="mt-1">If you believe this is an error, please contact our support team.</p>
                </div>
            </transition>
        </div>

        <!-- Enhanced Floating Elements -->
        <div class="fixed top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float-1"></div>
        <div class="fixed bottom-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-float-2"></div>
        <div class="fixed top-1/2 left-5 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-float-3"></div>
        <div class="fixed top-20 right-20 w-8 h-8 bg-yellow-200 rounded-full opacity-30 animate-float-4"></div>
        <div class="fixed bottom-20 left-20 w-14 h-14 bg-green-200 rounded-full opacity-25 animate-float-5"></div>

        <!-- Particle Effect -->
        <div class="fixed inset-0 pointer-events-none">
            <div v-for="i in 20" :key="i" class="absolute w-1 h-1 bg-white rounded-full animate-particle"
                :style="getParticleStyle(i)">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const searchQuery = ref('')

const helpLinks = [
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Support', path: '/support' },
    { label: 'Site Map', path: '/sitemap' }
]

const goBack = () => {
    if (window.history.length > 1) {
        window.history.back()
    } else {
        goHome()
    }
}

const goHome = () => {
    window.location.href = '/'
}

const performSearch = () => {
    if (searchQuery.value.trim()) {
        window.location.href = `/search?q=${encodeURIComponent(searchQuery.value)}`
    }
}

const navigateTo = (path) => {
    window.location.href = path
}

const getParticleStyle = (index) => {
    return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`
    }
}
</script>

<style scoped>
/* Main Animations */
@keyframes bounce-slow {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-10px);
    }

    60% {
        transform: translateY(-5px);
    }
}

@keyframes pulse-color {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.7;
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
    }

    50% {
        transform: translateY(-20px) rotate(180deg);
    }
}

@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

/* Orbiting Animations */
@keyframes orbit-1 {
    from {
        transform: rotate(0deg) translateX(60px) rotate(0deg);
    }

    to {
        transform: rotate(360deg) translateX(60px) rotate(-360deg);
    }
}

@keyframes orbit-2 {
    from {
        transform: rotate(0deg) translateX(80px) rotate(0deg);
    }

    to {
        transform: rotate(-360deg) translateX(80px) rotate(360deg);
    }
}

@keyframes orbit-3 {
    from {
        transform: rotate(0deg) translateX(100px) rotate(0deg);
    }

    to {
        transform: rotate(360deg) translateX(100px) rotate(-360deg);
    }
}

/* Letter Animation */
@keyframes letter {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }
}

/* Floating Elements */
@keyframes float-1 {

    0%,
    100% {
        transform: translateY(0px) translateX(0px);
    }

    33% {
        transform: translateY(-20px) translateX(10px);
    }

    66% {
        transform: translateY(10px) translateX(-10px);
    }
}

@keyframes float-2 {

    0%,
    100% {
        transform: translateY(0px) translateX(0px) rotate(0deg);
    }

    50% {
        transform: translateY(-30px) translateX(15px) rotate(180deg);
    }
}

@keyframes float-3 {

    0%,
    100% {
        transform: translateY(0px) scale(1);
    }

    50% {
        transform: translateY(-25px) scale(1.2);
    }
}

@keyframes float-4 {

    0%,
    100% {
        transform: translateY(0px) translateX(0px);
    }

    25% {
        transform: translateY(-15px) translateX(-15px);
    }

    75% {
        transform: translateY(15px) translateX(15px);
    }
}

@keyframes float-5 {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
    }

    50% {
        transform: translateY(-20px) rotate(360deg);
    }
}

/* Particle Animation */
@keyframes particle {
    0% {
        opacity: 0;
        transform: translateY(0px) scale(0);
    }

    10% {
        opacity: 1;
        transform: translateY(-10px) scale(1);
    }

    90% {
        opacity: 1;
        transform: translateY(-100px) scale(1);
    }

    100% {
        opacity: 0;
        transform: translateY(-110px) scale(0);
    }
}

/* Button Glow Animation */
@keyframes glow {

    0%,
    100% {
        box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
    }

    50% {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
    }
}

/* Apply Animations */
.animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
}

.animate-pulse-color {
    animation: pulse-color 2s ease-in-out infinite;
}

.animate-float {
    animation: float 4s ease-in-out infinite;
}

.animate-spin-slow {
    animation: spin-slow 8s linear infinite;
}

.animate-orbit-1 {
    animation: orbit-1 10s linear infinite;
}

.animate-orbit-2 {
    animation: orbit-2 15s linear infinite;
}

.animate-orbit-3 {
    animation: orbit-3 20s linear infinite;
}

.animate-letter {
    animation: letter 2s ease-in-out infinite;
}

.animate-float-1 {
    animation: float-1 6s ease-in-out infinite;
}

.animate-float-2 {
    animation: float-2 8s ease-in-out infinite;
}

.animate-float-3 {
    animation: float-3 7s ease-in-out infinite;
}

.animate-float-4 {
    animation: float-4 5s ease-in-out infinite;
}

.animate-float-5 {
    animation: float-5 9s ease-in-out infinite;
}

.animate-particle {
    animation: particle 6s ease-out infinite;
}

.animate-glow {
    animation: glow 2s ease-in-out infinite;
}

/* Vue Transitions */
.slide-up-enter-active {
    transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(50px);
}

.fade-in-enter-active {
    transition: all 0.6s ease-out;
}

.fade-in-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

/* Enhanced Hover Effects */
:deep(.p-button:hover) {
    transform: translateY(-3px) scale(1.05);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

:deep(.p-button-outlined:hover) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

:deep(.p-card) {
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

:deep(.p-card:hover) {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

:deep(.p-inputtext:focus) {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    transform: scale(1.02);
    transition: all 0.3s ease;
}

/* Additional Animation Classes */
.animate-card-entrance {
    animation: slide-up 1s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out;
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-up {
    from {
        opacity: 0;
        transform: translateY(50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>