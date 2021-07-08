<template>
    <div class="container">
        <router-link
            class="invoice flex"
            :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }"
        >
            <div class="left flex">
                <span class="tracking-number">#{{ invoice.invoiceId }}</span>
                <span class="due-date">#{{ invoice.paymentDueDate }}</span>
                <span class="person">#{{ invoice.clientName }}</span>
            </div>

            <div class="right flex">
                <span class="price">${{ invoice.invoiceTotal }}</span>
                <div
                    class="status-button flex"
                    :class="{
                        paid: invoice.invoicePaid,
                        draft: invoice.invoiceDraft,
                        pending: invoice.invoicePending,
                    }"
                >
                    <span v-if="invoice.invoicePaid">Paid</span>
                    <span v-if="invoice.invoiceDraft">Draft</span>
                    <span v-if="invoice.invoicePending">Pending</span>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
const props = defineProps({
    invoice: String,
})
</script>

<style lang="scss" scoped>
.container {
    color: #fff;
    flex: 1;
    text-decoration: none;
}

.container * {
    color: #fff;
}
.flex {
    display: flex;
    justify-content: space-evenly;
}
.left,
.status-button,
.right {
    span {
        padding: 20px;
    }
}
.invoice {
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 20px;
    padding: 20px;
}
</style>
