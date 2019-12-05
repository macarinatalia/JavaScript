<template>
  <div id="app">
    <div id="topbar">
      <div id="user"> {{user.name}} </div>
      <button id="loginBtn" @click="showModal">  </button>
      <login v-show="isModalVisible" @close="closeModal" />
      <button id="shoppingCartBtn" @click="showCartModal">  </button>
      <shopping-cart v-show="isCartModalVisible" @close="closeCartModal" />
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/restaurants">Restaurants</router-link> |
      <router-link to="/users">Users</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    
    <router-view id="router"/>
  </div>
</template>

<script>
import Login from './components/login.vue';
import ShoppingCart from './components/shopping-cart.vue';
import { mapState, mapActions } from 'vuex'

export default {
  data () {
      return {
        isModalVisible: false,
        isCartModalVisible: false
      };
    },
  components: {
      Login, ShoppingCart
  },
  computed: {
      ...mapState(['user', 'username', 'isLoggedIn', 'shoppingCart'])
  },
  methods:{
    ...mapActions(['loginUser']),
    showModal() {
        this.isModalVisible = true;
      },
    closeModal() {
        this.isModalVisible = false;
    },
    showCartModal() {
        this.isCartModalVisible = true;
      },
    closeCartModal() {
        this.isCartModalVisible = false;
    },
    setAuthenticated(status) {
          this.isLoggedIn = status;
    },    
  },
  mounted() {
    if(!this.isLoggedIn) {
        console.log('User is loged in as : ' + user.username)
    }
  },
  created() {
    
  }
}
</script>

<style>
*{
  padding:0;
  margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
  padding: 0px;
  background-image: url(~@/assets/images/home_bkg.jpg);
  background-position: center;
  background-repeat:  no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

}

#topbar{
  align-items: center;
  display: flex;
  height: 20px;
  justify-content: flex-end;
  margin: 0 auto;
  padding-top: 10px;
  
}
#user{
  background-color: transparent;
  border: 1px black;
  text-align: right;
}
#loginBtn,
#shoppingCartBtn{
  width: 50px;
  height: 50px;
  color: #0a3847;
  
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 28px;
  cursor: pointer;
  border: 0;
  outline: 0;   
  background-color: transparent;     
}

#loginBtn{
  background-image: url(~@/assets/images/icons/login.png);
}

#shoppingCartBtn{
  background-image: url(~@/assets/images/icons/shopping-cart.png);
}

#nav {
  padding: 0 30px 30px 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#router{
  background-size: cover;
}
</style>
