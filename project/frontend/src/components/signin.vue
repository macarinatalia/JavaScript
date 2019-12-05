<template lang="pug">
  div.modal-backdrop
    div.modal
        header.modal-header
            slot.header Sign in
                button.closeBtn(@click="close") x

        section.modal-body
            input.username(placeholder="Name")
            input.password(placeholder="Password")
            input.address(placeholder="Address")
            input.index(placeholder="Index")

        footer.modal-footer
            button.singinBtn(@click="signin") Sign in

</template>

<script>
  export default {
    name: 'modal',

    methods: {
        close() {
        this.$emit('close');
        },
        signin(){

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
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 300px;
  }

  .modal-header,
  .modal-footer {
    padding: 5px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
    height: 20px;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
  }

  .closeBtn {
    border: 1px black;
    font-size: 15px;
    padding-right:5px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  

  .username,
  .password,
  .address,
  .index{
      padding: 10px;
      margin-bottom: 10px;
  }
</style>