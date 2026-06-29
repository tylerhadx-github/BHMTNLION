import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/LandingView.vue'),
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../views/AppView.vue'),
  },
]

// Clean URLs on Azure Static Web Apps; deep links/refreshes are handled by
// the navigationFallback rewrite to index.html in staticwebapp.config.json.
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to) {
    if (to.hash) return { el: to.hash }
    return { top: 0 }
  },
})

export default router
