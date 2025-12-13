import useAuth from '@/composables/useAuth';
import { createRouter, createWebHistory } from 'vue-router';
const {authenticated} = useAuth();

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false },
  },

  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),  
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = authenticated.value;

  if (to.name === 'login' && isAuthenticated) {    
    next({ name: 'home' });
  } else if (!to.meta.requiresAuth && !isAuthenticated) {
    console.log("OKOK",isAuthenticated);
    if(to.name === 'login'){
      next();
    }else{
      router.push('/login');
    }
  } else {
    next();
  }
});

export default router;