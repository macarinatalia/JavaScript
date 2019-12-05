<template lang="pug">
section
 div.food-box
  div.food-description
    div.food-name {{ food.name }} 
    div.food-ingridients
      span {{food.ingridients.join(', ')}}
    div.food-price {{ price }} €
  div.add-to-card-button-box
    button.add-to-card-button(@click="addToCart") +
  
  
</template>


<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'FoodCard',
  props: ['food', 'price'],
  methods: {
    //...mapActions(['addToCart'])
    addToCart(){
      let foodToBuy = {food: this.food, price: this.price, quantity: 1}
      this.$store.dispatch('addToCart', foodToBuy)
    }
  },
}
</script>


<style scoped>
.food-box{
  border: 1px solid #ebebeb;
  border-radius: 2px;
  background-color: #fff;
  margin: 8px 0;
  padding: 16px;
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

.food-description {
  height: 100%;

  display: flex;
  flex-direction: column;
}

.food-name{
  font-size: 20px;
  font-weight: bold;
  line-height: 1.22;
  color: #0a3847;
  margin: 0 0 4px;
}

.food-ingridients{
  font-size: 12px;
  font-style: italic;
  color: #666;
  line-height: 1.5;
  margin: 0 0 4px;
}

.food-price{
  font-size: 18px;
  font-weight: bold;
  color: orange;
  line-height: 1.22;
  letter-spacing: -.5px;
  font-family: Takeaway Sans Bold,Avant Garde,Century Gothic,Helvetica,Arial,sans-serif;
  
  margin: auto 0 0;
}
.add-to-card-button-box {
  cursor: pointer;
  flex: 0 0 40px;
  position: static;
}
.add-to-card-button{
  font-weight: 700;
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebebeb;
  border-left: 1px solid #ebebeb;
  border-radius: 0 2px 0 0;
  color: #1574f5;
  font-size: 18px;
  text-align: center;
  content: "\E99B";
  cursor: pointer;
  outline: 0;
}
</style>