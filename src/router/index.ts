import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    {
      path: '/YinYangCapsule',
      name: 'YinYangCapsule',
      component: () => import('../views/showViews/YinYangCapsuleView.vue'),
    },
    {
      path: '/TheTabbar',
      name: 'TheTabbar',
      component: () => import('../views/showViews/TheTabbar.vue'),
    },
  ],
})

export default router
