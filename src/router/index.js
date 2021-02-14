import Vue from 'vue'
import VueRouter from 'vue-router'
import JobBoard from '../views/JobBoard.vue'
import JobDetail from '../views/JobDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: JobBoard
  }, {
    path: '/job-detail/',
    name: 'JobDetail',
    component: JobDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
