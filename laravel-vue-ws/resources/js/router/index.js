import { createRouter, createWebHistory } from 'vue-router';
import ChatRoom from '../page/ChatRoom/ChatRoom.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue'
import NotFound from '@/components/NotFound.vue';

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
    meta: { requiresAuth: true }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // Add more routes here as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('auth_token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
