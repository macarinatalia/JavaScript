<template lang="pug">
div
  h2 {{ menu.name }} 
  div.food-card-box
    food-card(v-for="(food, index) in foods", :food="food", :price="menu.price[index]", :key="food.id")
</template>


<script>
import FoodCard from '@/components/food-card.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MenuCard',
  components: {
        FoodCard
  },
  computed: {
    ...mapState(['menu', 'foods'])
  },
  created() {
      ///this.fetchFoodOfMenu(menu._id)
  },
  
}
</script>


<style scoped>
.food-card-box{
  margin: 8px 0;
  text-align: left;
  width: 100%;
}
</style>