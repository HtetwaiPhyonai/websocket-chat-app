import './bootstrap';
import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router'; // assuming you have a router/index.js
import '../css/app.css';

createApp(App).use(router).mount('#app');
