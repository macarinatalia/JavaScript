<template lang="pug">
  div.modal-backdrop
    div.modal
        header.modal-header
            h4.header My account
            button.closeBtn(@click="close") x

        section.modal-body
            input.username(placeholder="Name", v-model="username") 
            input.password(placeholder="Password", v-model="password")

        footer.modal-footer
            button.btnLogin(@click="login(username, password)") Log in
            button.btnSignin(@click="signin") Sign in

</template>

<script>

import { mapState, mapActions } from 'vuex'
  export default {
    name: 'login',
     data() {
        return {
            username: '',
            password: '',
        }
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
        close() {
            this.$emit('close');
        },
        login(username, password) {
            this.$store.dispatch('loginUser', {username, password})
            //this.$emit("isLoggedIn", true)
            //this.$emit('username', username)
            this.username = ''
            this.password = ''
            this.$emit('close');
        },
        signin(){

        },
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
    padding: 5px 10px;
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
  }

  .modal-body {
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
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

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .username,
  .password{
    padding: 10px;
    margin-bottom: 10px;
  }

.btnSignin,
.btnLogin{
    text-align: center;
    font-size: 14px;
    background-color: orange;
    color: #fff;
    height: 2.5rem;
    padding: 0 10px;
    cursor: pointer;
    outline: 0;
    border: 0px;
    width: 100%;
}

.btnLogin{
    border-radius: 2px 0 0 2px;
    margin-right: 1px;
}

.btnSignin {
  border-radius: 0 2px 2px 0;
  
}
</style>