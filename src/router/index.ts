import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
// import SearchView from '@/views/Search.vue'
// import WishView from '@/views/Wish.vue'
// import DoneView from '@/views/Done.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
    // {
    //   path: '/search',
    //   name: 'search',
    //   component: SearchView
    // },
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
