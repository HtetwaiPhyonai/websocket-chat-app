import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router';
import '../css/app.css';
import 'primeicons/primeicons.css';

// PrimeVue imports
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import './bootstrap'

const app = createApp(App);
app.use(router);
app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '',
        }
    }
});
app.mount('#app');
