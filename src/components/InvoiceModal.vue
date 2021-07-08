<template>
    <div
        @click="checkClick"
        ref="invoiceWrap"
        class="invoice-wrap flex flex-column"
    >
        <form @submit.prevent="submitForm" class="invoice-content">
            <Loading v-show="loading" />
            <h1 v-if="!editInvoice">New Invoice</h1>
            <h1 v-else>Edit Invoice</h1>

            <!-- Bill From -->
            <div class="bill-from flex flex-column">
                <h4>Bill From</h4>
                <div class="input flex flex-column">
                    <label for="billerStreetAddress">Street Address</label>
                    <input
                        required
                        type="text"
                        id="billerStreetAddress"
                        v-model="billerStreetAddress"
                    />
                </div>
                <div class="location-details flex">
                    <div class="input flex flex-column">
                        <label for="billerCity">City</label>
                        <input
                            required
                            type="text"
                            id="billerCity"
                            v-model="billerCity"
                        />
                    </div>
                    <div class="input flex flex-column">
                        <label for="billerZipCode">Zip Code</label>
                        <input
                            required
                            type="text"
                            id="billerZipCode"
                            v-model="billerZipCode"
                        />
                    </div>
                    <div class="input flex flex-column">
                        <label for="billerCountry">Country</label>
                        <input
                            required
                            type="text"
                            id="billerCountry"
                            v-model="billerCountry"
                        />
                    </div>
                </div>
            </div>

            <!-- Bill To -->
            <div class="bill-to flex flex-column">
                <h4>Bill To</h4>
                <div class="input flex flex-column">
                    <label for="clientName">Client's Name</label>
                    <input
                        required
                        type="text"
                        id="clientName"
                        v-model="clientName"
                    />
                </div>
                <div class="input flex flex-column">
                    <label for="clientEmail">Client's Email</label>
                    <input
                        required
                        type="text"
                        id="clientEmail"
                        v-model="clientEmail"
                    />
                </div>
                <div class="input flex flex-column">
                    <label for="clientStreetAddress">Street Address</label>
                    <input
                        required
                        type="text"
                        id="clientStreetAddress"
                        v-model="clientStreetAddress"
                    />
                </div>
                <div class="location-details flex">
                    <div class="input flex flex-column">
                        <label for="clientCity">City</label>
                        <input
                            required
                            type="text"
                            id="clientCity"
                            v-model="clientCity"
                        />
                    </div>
                    <div class="input flex flex-column">
                        <label for="clientZipCode">Zip Code</label>
                        <input
                            required
                            type="text"
                            id="clientZipCode"
                            v-model="clientZipCode"
                        />
                    </div>
                    <div class="input flex flex-column">
                        <label for="clientCountry">Country</label>
                        <input
                            required
                            type="text"
                            id="clientCountry"
                            v-model="clientCountry"
                        />
                    </div>
                </div>
            </div>

            <!-- Invoice Work Details -->
            <div class="invoice-work flex flex-column">
                <div class="payment flex">
                    <div class="input flex flex-column">
                        <label for="invoiceDate">Invoice Date</label>
                        <input
                            disabled
                            type="text"
                            id="invoiceDate"
                            v-model="invoiceDate"
                        />
                    </div>
                    <div class="input flex flex-column">
                        <label for="paymentDueDate">Payment Due</label>
                        <input
                            disabled
                            type="text"
                            id="paymentDueDate"
                            v-model="paymentDueDate"
                        />
                    </div>
                </div>
                <div class="input flex flex-column">
                    <label for="paymentTerms">Payment Terms</label>
                    <select
                        required
                        type="text"
                        id="paymentTerms"
                        v-model="paymentTerms"
                    >
                        <option value="30">Net 30 Days</option>
                        <option value="60">Net 60 Days</option>
                    </select>
                </div>
                <div class="input flex flex-column">
                    <label for="productDescription">Product Description</label>
                    <input
                        required
                        type="text"
                        id="productDescription"
                        v-model="productDescription"
                    />
                </div>
                <div class="work-items">
                    <h3>Item List</h3>
                    <table class="item-list">
                        <tr class="table-heading flex">
                            <th class="item-name">Item Name</th>
                            <th class="qty">Qty</th>
                            <th class="price">Price</th>
                            <th class="total">Toal</th>
                        </tr>
                        <tr
                            class="table-items flex"
                            v-for="(item, index) in invoiceItemList"
                            :key="index"
                        >
                            <td class="item-name">
                                <input type="text" v-model="item.itemName" />
                            </td>
                            <td class="qty">
                                <input type="text" v-model="item.qty" />
                            </td>
                            <td class="price">
                                <input type="text" v-model="item.price" />
                            </td>
                            <td class="total flex">
                                ${{ (item.total = item.qty * item.price) }}
                            </td>
                            <td>
                                <img
                                    @click="deleteInvoiceItem(item.id)"
                                    src="../assets/icon-delete.svg"
                                    alt=""
                                />
                            </td>
                        </tr>
                    </table>

                    <div
                        @click="addNewInvoiceItem"
                        class="flex button btn-icon-plus"
                    >
                        <img src="../assets/icon-plus.svg" alt="" />
                        Add New Item
                    </div>
                </div>
            </div>

            <!-- Save/Exit -->
            <div class="save flex">
                <div class="left">
                    <button type="button" @click="closeInvoice" class="red">
                        Close
                    </button>
                </div>
                <div class="right flex">
                    <button
                        v-if="!editInvoice"
                        type="submit"
                        @click="saveDraft"
                        class="dark-purple"
                    >
                        Save Draft
                    </button>
                    <button
                        v-if="!editInvoice"
                        type="submit"
                        @click="publishInvoice"
                        class="purple"
                    >
                        Create Invoice
                    </button>
                    <button v-if="editInvoice" type="sumbit" class="purple">
                        Update Invoice
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { defineComponent, ref, onMounted, computed, watch } from 'vue'

import db from '../firebase/firebase'
import Loading from '../components/Loading.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import { uid } from 'uid'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const billerStreetAddress = ref(null)
const dateOptions = ref(null)
const docId = ref(null)
const loading = ref(null)
const billerCity = ref(null)
const billerZipCode = ref(null)
const billerCountry = ref(null)
const clientName = ref(null)
const clientEmail = ref(null)
const clientStreetAddress = ref(null)
const clientCity = ref(null)
const clientZipCode = ref(null)
const clientCountry = ref(null)
const invoiceDateUnix = ref(null)
const invoiceDate = ref(null)
const paymentTerms = ref(null)
const paymentDueDateUnix = ref(null)
const paymentDueDate = ref(null)
const productDescription = ref(null)
const invoicePending = ref(null)
const invoiceDraft = ref(null)
const invoiceItemList = ref([])
const invoiceTotal = ref(0)
const store = useStore()

const editInvoice = ref(false)

const { state } = useStore()

const currentInvoice = ref([])

const route = useRoute()

const [firstArrayItems] = state.invoiceModal.currentInvoices
currentInvoice.value = firstArrayItems

const closeInvoice = () => {
    dateOptions.value = { year: 'numeric', month: 'short', day: 'numeric' }

    store.dispatch('SET_INVOICE')
    return {
        closeInvoice,
    }
}

paymentTerms.value = watch(() => {
    const futureDate = new Date()
    paymentDueDateUnix.value = futureDate.setDate(
        futureDate.getDate() + parseInt(paymentTerms.value)
    )
    paymentDueDate.value = new Date(
        paymentDueDateUnix.value
    ).toLocaleDateString('en-us', dateOptions)
})

editInvoice.value = state.invoiceModal.editInvoice

console.log(editInvoice.value)

const addNewInvoiceItem = () => {
    invoiceItemList.value.push({
        id: uid(),
        itemName: '',
        qty: '',
        price: 0,
        total: 0,
    })

    return {
        addNewInvoiceItem,
    }
}

const checkClick = (e) => {
    if (e.target === ref.invoiceWrap) {
        console.log('if', e)
        store.dispatch('SET_MODAL_STATUS')
    } else {
        console.log('else', e)
    }

    return {
        checkClick,
    }
}

const publishInvoice = () => {
    invoicePending.value = true
    return {
        publishInvoice,
    }
}

const saveDraft = () => {
    invoiceDraft.value = true
    return {
        saveDraft,
    }
}

const uploadInvoice = async () => {
    if (invoiceItemList.value.length <= 0) {
        alert('Please ensure you filled out work items....!')
        return
    }

    loading.value = true

    calcInvoiceTotal()

    const dataBase = db.collection('invoices').doc()

    await dataBase.set({
        invoiceId: uid(6),
        billerStreetAddress: billerStreetAddress.value,
        billerCity: billerCity.value,
        billerZipCode: billerZipCode.value,
        billerCountry: billerCountry.value,
        clientName: clientName.value,
        clientEmail: clientEmail.value,
        clientStreetAddress: clientStreetAddress.value,
        clientCity: clientCity.value,
        clientZipCode: clientZipCode.value,
        clientCountry: clientCountry.value,
        invoiceDate: invoiceDate.value,
        invoiceDateUnix: invoiceDateUnix.value,
        paymentTerms: paymentTerms.value,
        paymentDueDate: paymentDueDate.value,
        paymentDueDateUnix: paymentDueDateUnix.value,
        productDescription: productDescription.value,
        invoiceItemList: invoiceItemList.value,
        invoiceTotal: invoiceTotal.value,
        invoicePending: invoicePending.value,
        invoiceDraft: invoiceDraft.value,
        invoicePaid: null,
    })

    loading.value = false
    store.dispatch('SET_INVOICE')

   store.dispatch('GET_INVOICE', state)

    return {
        uploadInvoice,
    }
}

const updateInvoice = async () => {
    if (invoiceItemList.value.length <= 0) {
        alert('Please ensure you filled out work items....!')
        return
    }

    loading.value = true

    calcInvoiceTotal()

    const dataBase = db.collection('invoices').doc(docId.value)

    await dataBase.update({
        billerStreetAddress: billerStreetAddress.value,
        billerCity: billerCity.value,
        billerZipCode: billerZipCode.value,
        billerCountry: billerCountry.value,
        clientName: clientName.value,
        clientEmail: clientEmail.value,
        clientStreetAddress: clientStreetAddress.value,
        clientCity: clientCity.value,
        clientZipCode: clientZipCode.value,
        clientCountry: clientCountry.value,
        paymentTerms: paymentTerms.value,
        paymentDueDate: paymentDueDate.value,
        paymentDueDateUnix: paymentDueDateUnix.value,
        productDescription: productDescription.value,
        invoiceItemList: invoiceItemList.value,
        invoiceTotal: invoiceTotal.value,
    })

    loading.value = false

    const data = {
        docId: docId.value,
        routeId: route.params.invoiceId,
    }
    console.log('data', data)
    store.dispatch('SET_UPDATE_INVOICE', data)
    store.dispatch('GET_INVOICE', state)

    return {
        updateInvoice,
    }
}

const submitForm = () => {
    if (editInvoice.value) {
        updateInvoice()
    } else {
        uploadInvoice()
    }

    return {
        submitForm,
    }
}

const deleteInvoiceItem = (id) => {
    invoiceItemList.value = invoiceItemList.value.filter(
        (item) => item.id !== id
    )

    return {
        deleteInvoiceItem,
    }
}

const calcInvoiceTotal = () => {
    invoiceTotal.value = 0

    invoiceItemList.value.forEach((element) => {
        invoiceTotal.value += element.total
    })

    return {
        calcInvoiceTotal,
    }
}

onMounted(() => {
    if (!editInvoice.value) {
        invoiceDateUnix.value = Date.now()
        invoiceDate.value = new Date(invoiceDateUnix.value).toLocaleDateString(
            'en-us',
            dateOptions
        )
    }

    if (editInvoice.value) {
        const currentInvoiceData = currentInvoice.value
        docId.value = currentInvoiceData.docId
        billerStreetAddress.value = currentInvoiceData.billerStreetAddress
        billerCity.value = currentInvoiceData.billerCity
        billerZipCode.value = currentInvoiceData.billerZipCode
        billerCountry.value = currentInvoiceData.billerCountry
        clientName.value = currentInvoiceData.clientName
        clientEmail.value = currentInvoiceData.clientEmail
        clientStreetAddress.value = currentInvoiceData.clientStreetAddress
        clientCity.value = currentInvoiceData.clientCity
        clientZipCode.value = currentInvoiceData.clientZipCode
        clientCountry.value = currentInvoiceData.clientCountry
        invoiceDate.value = currentInvoiceData.invoiceDate
        invoiceDateUnix.value = currentInvoiceData.invoiceDateUnix
        paymentTerms.value = currentInvoiceData.paymentTerms
        paymentDueDate.value = currentInvoiceData.paymentDueDate
        paymentDueDateUnix.value = currentInvoiceData.paymentDueDateUnix
        productDescription.value = currentInvoiceData.productDescription
        invoiceItemList.value = currentInvoiceData.invoiceItemList
        invoiceTotal.value = currentInvoiceData.invoiceTotal
        invoicePending.value = currentInvoiceData.invoicePending
        invoiceDraft.value = currentInvoiceData.invoiceDraft
    }
})
</script>

<style lang="scss" scoped>
.red {
    background-color: brown;
}

.invoice-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    @media (min-width: 900px) {
        left: 90px;
    }
    .invoice-content {
        position: relative;
        padding: 56px;
        max-width: 700px;
        width: 100%;
        background-color: #141625;
        color: #fff;
        box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        h1 {
            margin-bottom: 48px;
            color: #fff;
        }
        h3 {
            margin-bottom: 16px;
            font-size: 18px;
            color: #777f98;
        }
        h4 {
            color: #7c5dfa;
            font-size: 12px;
            margin-bottom: 24px;
        }
        // Bill To / Bill From
        .bill-to,
        .bill-from {
            margin-bottom: 48px;
            .location-details {
                gap: 16px;
                div {
                    flex: 1;
                }
            }
        }
        // Invoice Work
        .invoice-work {
            .payment {
                gap: 24px;
                div {
                    flex: 1;
                }
            }
            .work-items {
                .item-list {
                    width: 100%;
                    // Item Table Styling
                    .table-heading,
                    .table-items {
                        gap: 16px;
                        font-size: 12px;
                        .item-name {
                            flex-basis: 50%;
                        }
                        .qty {
                            flex-basis: 10%;
                        }
                        .price {
                            flex-basis: 20%;
                        }
                        .total {
                            flex-basis: 20%;
                            align-self: center;
                        }
                    }
                    .table-heading {
                        margin-bottom: 16px;
                        th {
                            text-align: left;
                        }
                    }
                    .table-items {
                        position: relative;
                        margin-bottom: 24px;
                        img {
                            //   position: absolute;
                            //   top: 15px;
                            //   right: 0;
                            width: 16px;
                            height: 16px;
                        }
                    }
                }
                .button {
                    color: #fff;
                    background-color: #252945;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    img {
                        margin-right: 4px;
                    }
                }
            }
        }
        .save {
            margin-top: 60px;
            div {
                flex: 1;
            }
            .right {
                justify-content: flex-end;
            }
        }
    }
    .input {
        margin-bottom: 24px;
    }
    label {
        font-size: 12px;
        margin-bottom: 6px;
    }
    input,
    select {
        width: 100%;
        background-color: #1e2139;
        color: #fff;
        border-radius: 4px;
        padding: 12px 4px;
        border: none;
        &:focus {
            outline: none;
        }
    }
}

.dark-purple {
    border-radius: 20px;
    height: 40px;
    background-color: #7c5dfa;
    color: #fff;
}
.btn-icon-plus {
    display: flex;
    border-radius: 20px;
    height: 40px;
    background-color: #7c5dfa;
    color: #fff;
    img {
        width: 10px;
    }
}

.save {
    display: flex;
    // flex-direction: column;
    justify-content: space-evenly;
}
.purple {
    background-color: cadetblue;
}
button {
    border: none;
    padding: 10px;
    height: 40px;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
}
</style>
