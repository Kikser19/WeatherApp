import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta:{
      requiresAuth: false
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta:{
      requiresAuth: false
    }
  },
  {
    path:'/search',
    name:'Search',
    component: () => import('../views/Search.vue'),
    meta:{
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
