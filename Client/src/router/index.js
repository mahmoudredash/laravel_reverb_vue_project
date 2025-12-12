import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  // You can add more routes here
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../views/AboutView.vue'), // Lazy-loaded component
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;