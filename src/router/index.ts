import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import Signin from '@/views/Signin.vue'
// import WishView from '@/views/Wish.vue'
// import DoneView from '@/views/Done.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
    // {
    //   path: '/wish',
    //   name: 'wish',
    //   component: WishView
    // },
    // {
    //   path: '/done',
    //   name: 'done',
    //   component: DoneView
    // },
  ]
})

export default router
