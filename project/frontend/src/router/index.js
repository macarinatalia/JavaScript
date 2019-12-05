import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Restaurant from '../views/Restaurant.vue'
import Restaurants from '../views/Restaurants.vue'
import Users from '../views/Users.vue'
import Reviews from '../views/Reviews.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/restaurant/:id',
    name: 'restaurant',
    component: Restaurant,
    params: true
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: Restaurants
  },
  {
    path: '/restaurant/postal/:index',
    name: 'restaurantsByIndex',
    component: Restaurants,
    params: true
  },
  {
    path: '/restaurant/:id/reviews',
    name: 'reviews',
    component: Reviews,
    params: true
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
