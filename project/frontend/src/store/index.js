import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    restaurants: [],
    restaurant: {},
    index: "",
    users: [],
    user: {},
    menu: {},
    foods: [],
    food: {},
    reviews: [],
    shoppingCart: []
  },
  mutations: {
    SET_RESTAURANTS(state, data) {
      state.restaurants = data
    },
    SET_INDEX(state, data) {
      state.index = data
    },
    SET_RESTAURANTS_BY_INDEX(state, data, index) {
      state.restaurants = data,
      state.index = index
    },
    SET_ONE_RESTAURANT(state, data) {
      state.restaurant = data
    },
    SET_USERS(state, data) {
      state.users = data
    },
    SET_USER(state, data) {
      state.user = data
    },
    SET_MENU(state, data) {
      state.menu = data
    },
    SET_FOODS(state, data) {
      state.foods = data
    },
    SET_ONE_FOOD(state, data) {
      state.food = data
    },
    SET_REVIEWS(state, data){
      state.reviews = data
    },
    SET_LOGIN_STATUS(state, data){
      state.isLoggedIn = data
    },
    SET_ADD_TO_CART(state, data) {
      state.shoppingCart.push(data)
    },
    SET_ADD_TO_CART_INCREASE_QUANTITY(state, index) {
      state.shoppingCart[index].quantity++
    }
  },
  actions: {
    async fetchRestaurants({ commit }) {
      commit('SET_INDEX', "")
      const result = await axios.get('http://localhost:3000/restaurant/all/json')
      commit('SET_RESTAURANTS', result.data)
    },
    async fetchOneRestaurant({ commit }, restId) {
      const result = await axios.get(`http://localhost:3000/restaurant/${restId}/json`)
      commit('SET_ONE_RESTAURANT', result.data)
    },
    async fetchRestaurantsByIndex({ commit }, index) {
      commit('SET_INDEX', index)
      const result = await axios.get(`http://localhost:3000/restaurant/postal/${index}/json`)
      commit('SET_RESTAURANTS', result.data)
    },
    async fetchUsers({ commit }) {
      const result = await axios.get('http://localhost:3000/user/all/json')
      commit('SET_USERS', result.data)
    },
    async loginUser({ commit }, user) {
      const result = await axios.post('http://localhost:3000/user/login/json', {name: user.username})
      commit('SET_USER', result.data[0])
      commit('SET_LOGIN_STATUS', true)
    },
    async fetchMenuForRestaurant({ commit }, restId) {
      const menu = await axios.get(`http://localhost:3000/restaurant/${restId}/menu/json`)
      const food = await axios.get(`http://localhost:3000/menu/${menu.data._id}/food/json`)
      commit('SET_MENU', menu.data)
      commit('SET_FOODS', food.data)
    },
    async fetchOneFood({ commit }, foodId) {
      const result = await axios.get(`http://localhost:3000/food/${foodId}/json`)
      commit('SET_ONE_FOOD', result.data)
    },
    async fetchReviewsForRestaurant({ commit }, restId) {
      const result = await axios.get(`http://localhost:3000/restaurant/${restId}/reviews/json`)
      commit('SET_REVIEWS', result.data)
    },
    addToCart({commit}, meal) {
      let index = this.state.shoppingCart.findIndex(x => x.food._id === meal.food._id)
      if (index == -1)
        commit('SET_ADD_TO_CART', meal)
      else
        commit('SET_ADD_TO_CART_INCREASE_QUANTITY', index)
    }
  },
  modules: {
  }
})
