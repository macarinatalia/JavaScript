<template lang="pug">
  div.modal-backdrop
    div.modal
        header.modal-header
            h4.header Shopping Cart
            button.closeBtn(@click="close") x

        section.modal-body
            div(v-if="shoppingCart.length > 0")
                div.cart-box(v-for="item in shoppingCart" :key="item.id") 
                    div.cart-single-food
                        div.cart-row 
                            div.cart-food-amount {{item.quantity}}x
                            div.cart-food-name {{item.food.name}} 
                            div.cart-food-edit-buttons
                                button.cart-food-edit-delete(@click="deleteQuantity(item)") - 
                                button.cart-food-edit-add(@click="addQuantity(item)") + 
                            div.cart-food-price {{ item.price }} €
                div.cart-total-price Total: {{calcTotalPrice()}} €
            
        footer.modal-footer
           button.checkout(@click="checkOut" :disabled="checkoutIsDisabled") Checkout

</template>

<script>

import { mapState, mapActions } from 'vuex'
  export default {
    name: 'ShoppingCart',
    computed: {
      ...mapState(['shoppingCart']),
      checkoutIsDisabled: function(){
    	    return !this.shoppingCart.length > 0;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        deleteQuantity(meal){
            this.shoppingCart.find(x => x.food._id === meal.food._id).quantity-- 
            let q = this.shoppingCart.find(x => x.food._id === meal.food._id).quantity
            if (q == 0) {
                let ind = this.shoppingCart.findIndex(x => x.food._id === meal.food._id)
                this.shoppingCart.splice(ind, 1)
            }
        },
        addQuantity(meal){
            let obj = this.shoppingCart.find(x => x.food._id === meal.food._id);
            this.shoppingCart.find(x => x.food._id === meal.food._id).quantity++
        },
        calcTotalPrice(){
            let totalPrice = 0
            this.shoppingCart.forEach(element => {
                totalPrice += element.quantity * Number(element.price)
            });
            return totalPrice
        },
        checkOut(){
            console.log('CLICK')
        }
    },
  };
</script>



<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible !important;
    z-index: 100;
 
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 300px;
    border-radius: 2px;
    overflow: visible !important;
 
  }

  .modal-header,
  .modal-footer {
    padding: 10px 10px;
    display: flex;
  }

  .modal-header {
   /* border-bottom: 1px solid #eeeeee;*/
    color: orange;
    justify-content: space-between;
    height: 30px;
  }

  .header{
      margin-top: 5px;
  }

  .modal-footer {
    justify-content: center;
    height: 70px;
  }

  .modal-body {
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
.cart-box{
    display: flex;
    flex-direction: column;
    font-size: 14px;
}
.cart-row{
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    width: 100%;
}

.cart-food-amount {
    padding-right: 10px;
    width: 20px;
}

.cart-food-name {
    width: 100%;
    padding: 4px 0;
    word-break: break-word;
    flex: 1 1;
    text-align: left;
}

.cart-total-price {
    width: 100%;
    border-top: 1px solid #eeeeee;
    padding-top: 10px;
    margin-top: 20px;
    text-align: right;
    font-weight: bold;
}

.cart-food-edit-buttons {
    min-width: 40px;
}

.cart-food-edit-delete
.cart-food-edit-add{
    height: 15px;
    width: 15px;
    font-size: 14px;
    cursor: pointer;
    float: left;
    text-align: center;
    align-items: flex-start;
}

  .closeBtn {
    border: 0;
    font-size: 15px;
    cursor: pointer;
    font-weight: 400px;
    color: orange;
    background: transparent;
    height: 10px;
    line-height: 1;
  }

  
.checkout{
    text-align: center;
    font-size: 14px;
    background-color: orange;
    color: #fff;
    height: 2.5rem;
    padding: 10px 20px;
    margin-bottom: 15px;
    cursor: pointer;
    outline: 0;
    border: 0px;
    width: 100%;
    border-radius: 2px 2px 2px 2px;
}
.checkout[disabled]{
    background-color: grey;
    cursor:unset;
}

</style>