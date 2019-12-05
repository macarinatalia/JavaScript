<template>
  <div class="restaurants">
    <h2>You can order from {{restaurants.length}} restaurants</h2>
    
    <input class="inputIndex" v-model="index" placeholder="Enter index"> 
    <button class="btnSearch" v-on:click="searchRestByIndex()">Search</button>
    <div class="restaurants-container">
      <div v-for="rest in restaurants" :key="rest.id">
        <router-link v-bind:to="{ name: 'restaurant', params: { id : rest._id }}">
          <div class="restaurant-box"> 
            <img :src="getImgUrl(rest.img)" v-bind:alt="rest" class="rest-image"/>
            <div>       
              <h2 class="restaurantName">{{ rest.name }}</h2>
              <div class="restaurantAddress">{{ rest.address}} {{ rest.index }} </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  //<h2> Index {{index}} </h2>
  name: 'restaurants',
  components: {
    
  },
  beforeRouteEnter(to, from, next) {
    console.log(to)
    console.log(from)
    next(vm => {
      if(to.name == "restaurants") {
        vm.$store.dispatch('fetchRestaurants')
      } 
    })
  },
  mounted(){
    if(this.index == "" && this.restaurants.length == 0){
     this.$store.dispatch('fetchRestaurants')
    }
  },
  computed:{
    restaurants() {
      return this.$store.state.restaurants
    },
    index: {
      get: function (){
        return this.$store.state.index
      },
      set: function (newValue) {
        this.$store.state.index = newValue;
      }
    }
  },
  methods:{
    searchRestByIndex(){
      if(this.index != ""){
        this.$store.dispatch('fetchRestaurantsByIndex', this.index)
        var location = this.$route.fullPath
        this.$router.replace('/restaurant/postal/' + this.index)

      }else {
        this.$store.dispatch('fetchRestaurants')
        this.$router.replace('/restaurant/all')
      }
    },
    getImgUrl(img) {
      return require('../assets/images/restaurant/' + img)
    }
    
  }
  
}
</script>

<style scoped>
.restaurant-box {
  margin: 10px;
  padding: 20px;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #ebebeb;
  cursor: pointer;
  position: relative; 
}
.rest-image{
    max-width: 80px;
    max-height: 80px;
    height: auto;
    padding: 0 10px 0 0;
    align-content: center;
  }

 h2 {
   background-color: transparent;
 } 

.restaurantName {
  padding: 0;
  font-family: Takeaway Sans Bold,Avant Garde,Century Gothic,Helvetica,Arial,sans-serif;
  color: #0a3847;
  font-size: 18px;
  line-height: 22px;
  max-height: 66px;
  overflow: hidden;
  margin: 0;
}

.restaurantAddress {
  line-height: 22px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 0 4px;
  color: #666;
}
 
 .inputIndex {
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;

  font-size: 1rem;
  /*background-color: white;*/
  height: 3rem;
  border-radius: 2px 0 0 2px;
  padding: 0 21px;
  /*border: 1px solid grey;*/
  line-height: 3rem;
}
.btnSearch {
  padding: 0 21px;
  /*border: 1px solid #1574f5;*/
  background-color: #1574f5;
  color: #fff;
  cursor: pointer;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 1rem;
  border-radius: 0 2px 2px 0;
  white-space: nowrap;
}
</style>