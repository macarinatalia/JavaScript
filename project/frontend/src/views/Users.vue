<template>
  <div class="users">
    <h2> Users: </h2>
    <div class="user-container">
      <div v-for="user in users" :key="user.id">
        <router-link v-bind:to="{ name: 'user', params: { id : user._id }}">
          <div class="user-box"> 
            <img src="http://lorempixel.com/400/200/people/" alt="" class="user-image"/>
            <div>       
              <h2>{{ user.name }}</h2>
              <div>{{ user.address}} {{ user.index }} </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'users',
  components: {
    
  },
  mounted(){
      this.$store.dispatch('fetchUsers')
  },
  computed:{
    users() {
      return this.$store.state.users
    }
  },
  methods:{    
  }
  
}
</script>

<style scoped>
.user-box {
  border: 1px solid black;
  margin: 10px;
  padding: 20px;
  text-align: left;
  display: flex;
  justify-content: flex-start;

  
  
}
.user-image{
    size: 100px 100px;
    padding: 10px;
  }
</style>