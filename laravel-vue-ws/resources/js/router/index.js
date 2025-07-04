import { createRouter, createWebHistory } from 'vue-router';
import ChatRoom from '../page/ChatRoom/ChatRoom.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue'

const routes = [
  {
    path: '/',
    redirect: '/register'
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }, {
    path: '/chat-room',
    name: 'chatRoom',
    component: ChatRoom,
  },
  // Add more routes here as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
