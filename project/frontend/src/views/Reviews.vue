<template lang="pug">
    div.restaurant-reviews
        div.overview
            div.overview-container
                div
                    h1.restaurant-name {{restaurant.name}}
                    h4 {{reviews.length}} Reviews
                div.total-rating-info
                    h2.rating Total Rating
                    h1 {{getTotalRating()}}
        div.review-box
            div.review-list 
                review-card(v-for="review in reviews", :review="review",  :key="review.id")
</template>

<script>
import ReviewCard from '@/components/review-card.vue'
import { mapState, mapActions } from 'vuex'

export default {
    components: {
        ReviewCard
     },
     
    computed: {
        ...mapState(['restaurant', 'reviews'])
    },
    methods: {
        getTotalRating(){
            let result = 0
            for (let i = 0; i < this.reviews.length; i++) {
                result += this.reviews[i].stars;
            }
            return this.reviews.length > 0 ? result/this.reviews.length : result
        }
    },
    created() {
    }
}
</script>

<style scoped>
.overview{
    background-color: lightgray;
    margin: 16px;
    padding: 0 20px;
    height: 90px;
    text-align: left;
    
}

.overview-container{
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.restaurant-reviews{
    font-weight: 400;
    padding: 0;
}
.review-list {
    padding: 0 16px;
}

.rating {
    font-weight: 700;
    font-size: 18px;
}

.total-rating-info{
    text-align: right;
}
</style>