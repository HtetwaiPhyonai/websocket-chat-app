import { createRouter, createWebHistory } from 'vue-router';
import ChatRoom from '../page/ChatRoom.vue';
import Login from '../components/Login.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  }, {
    path: '/chat-room/:username/:room',
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
