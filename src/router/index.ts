import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useAuthStore } from '@/stores/useAuthStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
      meta: { guestOnly: true }
    },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: () => import('../views/RegisterView.vue'),
    //   meta: { guestOnly: true }
    // },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:username',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue'),
    }
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const isAuthenticated = authStore.isAuthenticated;
  if (to.matched.some(record => record.meta.guestOnly) && isAuthenticated) {
    next('/dashboard');
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
    return;
  }

  next();
});

export default router;
