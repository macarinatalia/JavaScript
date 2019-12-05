<template lang="pug">
div.review-main-box
    section.review-head
        section.review-user-details
            img.user-image(:src="require('@/assets/images/icons/icon_user.svg')", alt="")
            div
                div.user-name {{review.user.name}}
                div.review-date {{formatDate(review.date)}}
        div.review-stars {{review.stars}}
    section.review-user
        div.review-body {{review.name}}
   
</template>


<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ReviewCard',
  props: ['review'],
  methods: {
      formatDate(date){
          return moment(date).format("L")
      }
  },
}
</script>

<style scoped>
.review-main-box {
    background-color: #f8f5f2;
    padding: 16px 24px;
    margin: 16px 0;
    border: 1px solid #ebebeb;
    border-radius: 2px;
}

.review-head{
    margin-bottom: 13px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.review-user-details{
    display: flex;
    flex-direction: row;
    text-align: left;
}

.user-image{
    margin-right: 10px;
    width: 50px;
    height: 50px;
}

.review-user{
    display: flex;
    flex-direction: column;
    text-align: left;
}

.review-body{
    margin-top: 10px;
    display: block;
    color: #666;
    font-size: 14px;
    line-height: 22px;
    word-wrap: break-word;
}

.user-name{
    font-weight: 700;
    color: #ff8000;
    font-size: 16px;
    line-height: 24px;
}

.review-date{
    color: #0a3847;
    font-size: 12px;
    line-height: 26px;
    font-weight: 300;
    text-transform: capitalize;
}

.review-stars{
    font-size: 17px;
    line-height: 24px;
    height: 24px;
}
</style>
