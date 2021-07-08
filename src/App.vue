<template>
    <div v-if="!mobile" class="app">
        <Navigation />
        <div class="app-content" v-if="state.invoiceModal.invoicesLoaded">
            <Modal v-if="state.modalActive.modalActive"/>
            <transition name="invoice">
                <InvoiceModal v-if="state.invoiceModal.invoiceModal" />
            </transition>
            <router-view></router-view>
        </div>
    </div>

    <div v-else class="mobile-message">
        <h2>sorry, this app is not supported on Mobile Devices</h2>
    </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import InvoiceModal from './components/InvoiceModal.vue'
import { useStore } from 'vuex'
import { defineComponent, ref, onMounted, computed, onBeforeMount } from 'vue'
import  Modal from './components/Modal.vue'

const mobile = ref(false)
const invoiceModal = ref(null)

export default {
    components: {
        Navigation,
        InvoiceModal,
        Modal
    },
    setup() {
        const store = useStore();
        // console.log(store)
         const { state } = useStore();
console.log('state', state)
         invoiceModal.value = state.invoiceModal.invoiceModal;


        const checkScreen = () => {
            const winddowWidth = window.innerWidth
            if (winddowWidth <= 750) {
                mobile.value = true
                return
            }
            mobile.value = false
        }


        onBeforeMount(() => {
           console.log("onBeforeMount");
        })
        onMounted(() => {
            console.log("onMounted");
            store.dispatch('GET_INVOICE', state);
            checkScreen()
            window.addEventListener('resize', checkScreen)
        })

        // computed(() => {
        //     return invoiceModal.value =  store.state.invoiceModal.invoiceModal
        //     // return store.state.invoiceModal.invoiceModal
        // });

        return {
            checkScreen,
            state
        }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;400&display=swap');

body {
    font-family: 'Poppins', sans-serif;
    padding: 0;
    margin: 0;
     height: 100vh;
}

.app {
    display: flex;
    // flex-direction: column;
    // height: 100vh;
    background-color: #1e2139;
}

.app-content {
    display: flex;
    flex-direction: row;
    flex: 1;
    position: relative;
    padding: 30px;
}

.mobile-message {
    text-align: center;
    color: #fff;
    background-color: #141625;
    height: 100vh;
}

//animation for the invoice

// .invoice-enter-active, .invoice-leave-active {
//     transition: 0.8 ease all;
// }

// .invoice-enter-from {
//      transition: transformX(-700px)
// }

.invoice-enter-active,
.invoice-leave-active {
  transition: opacity 0.5s ease;
}

.invoice-enter-from,
.invoice-leave-to {
  opacity: 0;
  transition: transformX(-700px)
}
</style>
