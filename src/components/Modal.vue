<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Are you sure you want to exit? Your changes will not be saved?</p>
      <div class="actions flex">
        <button @click="closeModal" class="purple">Return</button>
        <button @click="closeInvoice" class="red">Close</button>
      </div>
    </div>
  </div>
  
</template>

<script setup>

import { useStore } from 'vuex'
const store = useStore();


const closeModal = () => {
 store.dispatch('SET_MODAL_STATUS');

return {
  closeModal
}
}

const closeInvoice = () => {
  
store.dispatch('SET_MODAL_STATUS');
   store.dispatch('SET_INVOICE');

  return {
  closeInvoice
}
}

</script>

<style lang="scss" scoped>
.flex{
    display: flex;
    justify-content: center;
}
.modal {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  .modal-content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #252945;
    color: #fff;
    p {
      text-align: center;
    }
    .actions {
      margin-top: 24px;
      button {
        flex: 1;
      }
    }
  }
}

button {
    border: none;
    height: 40px;
    border-radius: 30px;
    margin: 30px;
    color: #fff;
}
.red{
    background-color: brown;
}

.purple{
    border-radius: 20px;
    height: 40px;
    background-color: #7c5dfa;
    color: #fff;
}
</style>