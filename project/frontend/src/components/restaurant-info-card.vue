<template lang="pug">
    div.restaurant-info-box
      div.restaurant-comtainer
        div
            img(:src="getImgUrl(restaurant.img)", alt="", class="rest-image")
        div.restaurant-details-box
            h1 {{restaurant.name}}
            div.favorite-box 
              button.add-to-favorite-button(@click="addToFavorite")
            h4 {{restaurant.address}}, {{ restaurant.index}}
            div.restaurant-reviews 
              router-link(:to="reviewsUrl") Reviews
</template>


<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'RestaurantInfoCard',
  computed: {
    ...mapState(['restaurant']),
    reviewsUrl() {
      return `/restaurant/${this.restaurant._id}/reviews`
    }
  },
  methods: {
    ...mapActions(['addToFavorite']),
    getImgUrl(img) {
      return ('../assets/images/restaurant/' + img)
    }
  }

}
</script>


<style scoped>
.restaurant-info-box {
  margin-bottom: 16px;
}

.restaurant-container{
  max-width: 1130px;
  margin: 0 auto;
  position: relative;
  padding: 0 15px;
}
  
.restaurant-details-box{
  padding: 20px;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #ebebeb;
  position: relative; 

}
.favorite-box {
  background: #fff;
  display: inline-flex;
  height: 50px;
  line-height: 46px;
  text-align: center;
  position: absolute;
  right: 10px;
  top: 18px;
}
.rest-image{
    max-width: 80px;
    max-height: 80px;
    height: auto;
    padding: 0 10px 0 0;
    align-content: center;
  }
.add-to-favorite-button{
  justify-content: center;
  width: 50px;
  height: 48px;
  color: #0a3847;
  background-image: url(~@/assets/images/icons/icon_empty_fav.svg);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 22px;
  cursor: pointer;
  border: 0px white;
  outline: 0;           /*remove blue border on click*/
}

.restaurant-reviews{
  color: orange;
  cursor: pointer;
}
</style>