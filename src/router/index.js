import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/times',
    name: 'times',
    component: () => import('../views/TimesView.vue')
  },
  {
    path: '/swimmers',
    name: 'swimmers',
    component: () => import('../views/SwimmersView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
