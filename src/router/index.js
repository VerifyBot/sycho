import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/choose/:subject',
    name: 'choose',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ChooseVue.vue')
  },
  {
    path: '/practice/:subject/:id',
    name: 'practice',
    component: () => import('../views/PracticeView.vue')
  },
  {
    path: '/results/:subject',
    name: 'results',
    component: () => import('../views/ResultsView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
