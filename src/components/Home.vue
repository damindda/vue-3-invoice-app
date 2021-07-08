<template>
    <div class="home-container">
        <div class="header">
            <div class="left">
                <h1 class="h1-header">Invoices</h1>
                <span>There are {{invoiceData.length}} total invoices</span>
            </div>
            <div class="right">
                <div class="filter" @click="toggleFilterMenu">
                    <span
                        >Filter by status
                        <span v-if="filteredInvoice">{{
                            filteredInvoice
                        }}</span>
                        <img
                            src="../assets/down-arrow.svg"
                            alt=""
                            class="down-arrow-icon"
                        />
                        <ul class="filter-menu" v-show="filterMenu">
                            <li @click="onClickFilterInvoices">Draft</li>
                            <li @click="onClickFilterInvoices">Pending</li>
                            <li @click="onClickFilterInvoices">Paid</li>
                            <li @click="onClickFilterInvoices">Clear Filter</li>
                        </ul>
                    </span>
                </div>

                <div @click="newInvoice" class="btn-primary">+ New Invoice</div>
            </div>
        </div>

        <div class="flex" v-if="invoiceData.length > 0">
            <Invoice
                v-for="(invoice, index) in filteredData"
                :invoice="invoice"
                :key="index"
            />
        </div>
        <div v-else class="empty flex flex column">
            <img src="../assets/empty.svg" alt="" />
            <h3>
                There is no data to show at this moment, please add invoices
            </h3>
        </div>
    </div>
</template>

<script setup>
import {
    defineComponent,
    ref,
    onMounted,
    computed,
    onUpdated,
    onBeforeMount,
    watchEffect,
    watch,
} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { mapMutations, mapState } from 'vuex'
import Invoice from './Invoice.vue'

const invoiceData = ref([])

const filteredInvoice = ref(null)

const filterMenu = ref(false)
const router = useRouter()
const store = useStore()
const { state } = useStore()
const newName = ref('')

const newInvoice = () => {
    console.log('newInvoice clicked')
    store.dispatch('SET_INVOICE')
    return {
        newInvoice,
    }
}

const toggleFilterMenu = () => {
    console.log('toggleFilterMenu')
    filterMenu.value = !filterMenu.value

    return {
        toggleFilterMenu,
    }
}

const onClickFilterInvoices = (e) => {
    if (e.target.innerText === 'Clear Filter') {
        filteredInvoice.value = null
    } else {
        filteredInvoice.value = e.target.innerText
    }
}

const filteredData = computed(() => {
    return invoiceData.value.filter((invoice) => {
        if(filteredInvoice.value === "Draft") {
            return invoice.invoiceDraft === true;
        }
         if(filteredInvoice.value === "Pending") {
            return invoice.invoicePending === true;
        }
         if(filteredInvoice.value === "Paid") {
            return invoice.invoicePaid === true;
        }
        return invoice;
    })
})

onMounted(() => {
    invoiceData.value = state.invoiceModal.invoiceData

    console.log(
        'state.invoiceModal.invoiceData',
        state.invoiceModal.invoiceData
    )
})

onUpdated(() => {
    console.log(
        'state.invoiceModal.invoiceData onUpdated',
        state.invoiceModal.invoiceData
    )
})

console.log(invoiceData.value)

// watch(() => {
//     if (!invoiceData.value) {
//         invoiceData.value = state.invoiceModal.invoiceData
//         console.log("watch", invoiceData.value)
//     }
// })

invoiceData.value = watch(() => {
    // const futureDate = new Date()
    // paymentDueDateUnix.value = futureDate.setDate(
    //     futureDate.getDate() + parseInt(paymentTerms.value)
    // )
    // paymentDueDate.value = new Date(
    //     paymentDueDateUnix.value
    // ).toLocaleDateString('en-us', dateOptions)
    invoiceData.value = state.invoiceModal.invoiceData
    console.log('invoiceData.value changed', invoiceData.value)
})
</script>

<style lang="scss" scoped>
.btn-primary {
    background-color: blueviolet;
    font-size: 13px;
    border-radius: 20px;
    padding: 12px;
    cursor: pointer;
    height: 20px;
    margin-left: 30px;
}

.header {
    color: #fff;
    margin-bottom: 60px;
    display: flex;
    flex: 1;
    justify-content: space-evenly;
}

.empty {
    margin-top: 150px;
    color: #fff;
    img {
        width: 60%;
    }
}

.home-container {
    flex: 1;
}

.filter-menu {
    background-color: rgba(121, 123, 134, 0.5);
    padding: 0;

    li {
        list-style: none;
        padding: 12px 20px;
        &:hover {
            background-color: rgba(12, 23, 134, 0.8);
            cursor: pointer;
        }
    }
}
.right {
    flex: 1;
    display: flex;
}
.left {
    flex: 1;
    .h1-header {
        padding: 2px 0;
        margin: 2px 0;
    }
}

.filter {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.down-arrow-icon {
    width: 10px;
}
</style>
