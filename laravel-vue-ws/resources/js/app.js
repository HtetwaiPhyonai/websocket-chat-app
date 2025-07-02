import './bootstrap';
import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router'; // assuming you have a router/index.js
import '../css/app.css';

// PrimeVue imports
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount('#app');
