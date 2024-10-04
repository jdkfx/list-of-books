import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    }
  ]
})

export default router

// import Wish from '../views/Wish.vue'
// import Done from '../views/Done.vue'
// import Search from '../views/Search.vue'
// import Signin from '../views/Signin.vue'
// import Signout from '../views/Signout.vue'

// const routes = [
//   {
//     path: '/wish',
//     name: 'Wish',
//     component: Wish
//   },
//   {
//     path: '/done',
//     name: 'Done',
//     component: Done
//   },
//   {
//     path: '/search',
//     name: 'Search',
//     component: Search
//   },
//   {
//     path: '/signin',
//     name: 'Signin',
//     component: Signin
//   },
//   {
//     path: '/signout',
//     name: 'Signout',
//     component: Signout
//   }
// ]
