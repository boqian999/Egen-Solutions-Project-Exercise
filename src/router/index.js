import Vue from 'vue'
import VueRouter from 'vue-router'
import JobBoard from '../views/JobBoard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: JobBoard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
