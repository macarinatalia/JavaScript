<template>
  <div class="home">
    <h1>It is time to order some food</h1>
    <h2>Find restaurants in your neighbourhood</h2>
    <input class="inputIndex" v-model="index" placeholder="Enter index"> 
    <button class="btnSearch" v-on:click="searchRestByIndex()">Search</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    
  },
  data(){
    return {
            index: ""
        }
  },
  mounted(){
  },
  computed:{
    
  },
  methods:{
    searchRestByIndex(){
      if(this.index != ""){
        this.$store.dispatch('fetchRestaurantsByIndex', this.index)
        this.$router.push({name: 'restaurantsByIndex', params: { index: this.index }})
      }else {
        this.$store.dispatch('fetchRestaurants')
        this.$router.push({name: 'restaurants'})
      }
    }
  }
  
}
</script>

<style scoped>
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
  outline: 0;
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
  outline: 0;
}

</style>