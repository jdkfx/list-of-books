import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import Wish from '@/views/Wish.vue'
import Done from '@/views/Done.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/wish',
      name: 'wish',
      component: Wish
    },
    {
      path: '/done',
      name: 'done',
      component: Done
    }
  ]
})

export default router
