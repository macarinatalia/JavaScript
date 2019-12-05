<template lang="pug">
    div.restaurant-box
        div.restaurant-info-card-box
            restaurant-info-card
        div.menu-card-box  
            menu-card
</template>

<script>
import MenuCard from '@/components/menu-card.vue'
import RestaurantInfoCard from '@/components/restaurant-info-card.vue'
import { mapState, mapActions } from 'vuex'

export default {
    components: {
        RestaurantInfoCard,
        MenuCard
     },
     
    computed: {
        ...mapState(['restaurant', 'menu', 'foods','reviews'])
    },
    methods: {
        ...mapActions(['fetchOneRestaurant', 
                    'fetchMenuForRestaurant', 
                    'fetchFoodOfMenu', 
                    'fetchReviewsForRestaurant'])
    },
    created() {
        this.fetchOneRestaurant(this.$route.params.id)
        this.fetchMenuForRestaurant(this.$route.params.id)
        this.fetchReviewsForRestaurant(this.$route.params.id)
    }
}
</script>

<style scoped>
.restaurant-box{
    padding: 0 15px;
    max-width: 1130px;
    margin: 0 auto;
    position: relative;
}
.menu-card-box{
    margin-top: 16px;
    
}
</style>