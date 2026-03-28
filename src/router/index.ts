import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Chess from '../views/Chess.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/chess',
    name: 'Chess',
    component: Chess
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
