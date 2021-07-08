import db from "../../firebase/firebase";

export default {
    state: () => ({
        invoiceModal: false,
        invoiceData: [],
        currentInvoices: [],
        invoicesLoaded: null,
        editInvoice: false
    }),
    getters: {
        invoiceData: state => state.invoiceData,
    },
    mutations: {
        TOGGLE_INVOICE(state) {
            state.invoiceModal = !state.invoiceModal;
            state.editInvoice = false;
        },
        SET_INVOICE_DATA(state, payload) {
            state.invoiceData.push(payload);
            console.log(state.invoiceData)
        },
        INVOICES_LOADED(state) {
            state.invoicesLoaded = true;
        },
        CURRENT_INVOICES(state, payload) {
            console.log("payload", payload);
            console.log("state.invoiceData", state.invoiceData);
            state.currentInvoices = state.invoiceData.filter((invoice) => {
                return invoice.invoiceId === payload;
            })
        },
        TOGGLE_EDIT_INVOICE(state) {
            state.editInvoice = !state.editInvoice
        },
        DELETE_INVOICE(state, payload) {
            state.invoiceData = state.invoiceData.filter((invoice) => invoice.docId !== payload)
        },
        UPDATE_STATUS_TO_PAID(state, payload) {
            state.invoiceData.forEach(invoice => {
                if(invoice.docId === payload) {
                    invoice.invoicePaid = true;
                    invoice.invoicePending = false;
                }
            })
        },
        UPDATE_STATUS_TO_PENDING(state, payload) {
            state.invoiceData.forEach(invoice => {
                if(invoice.docId === payload) {
                    invoice.invoicePaid = false;
                    invoice.invoicePending = true;
                    invoice.invoiceDraft = false;
                }
            })
        }
    },
    actions: {
        SET_INVOICE({commit}) {
            commit('TOGGLE_INVOICE')
        },
        SET_CURRENT_INVOICES({commit}, payload) {
            commit('CURRENT_INVOICES', payload)
        },
        SET_TOGGLE_EDIT_INVOICE({commit}) {
            commit('TOGGLE_EDIT_INVOICE')
        },
        async GET_INVOICE({commit}, payload) {
            const getData = db.collection('invoices');
            const results = await getData.get();
            console.log(payload);
            results.forEach(doc => {
                if(!payload.invoiceModal.invoiceData.some(invoice => invoice.docId === doc.id)) {
                    const data = {
                        docId: doc.id,
                        invoiceId: doc.data().invoiceId,
                        billerStreetAddress: doc.data().billerStreetAddress,
                        billerCity: doc.data().billerCity,
                        billerZipCode: doc.data().billerZipCode,
                        billerCountry: doc.data().billerCountry,
                        clientName: doc.data().clientName,
                        clientEmail: doc.data().clientEmail,
                        clientStreetAddress: doc.data().clientStreetAddress,
                        clientCity: doc.data().clientCity,
                        clientZipCode: doc.data().clientZipCode,
                        clientCountry: doc.data().clientCountry,
                        invoiceDateUnix: doc.data().invoiceDateUnix,
                        invoiceDate: doc.data().invoiceDate,
                        paymentTerms: doc.data().paymentTerms,
                        paymentDueDateUnix: doc.data().paymentDueDateUnix,
                        paymentDueDate: doc.data().paymentDueDate,
                        productDescription: doc.data().productDescription,
                        invoiceItemList: doc.data().invoiceItemList,
                        invoiceTotal: doc.data().invoiceTotal,
                        invoicePending: doc.data().invoicePending,
                        invoiceDraft: doc.data().invoiceDraft,
                        invoicePaid: doc.data().invoicePaid,
                      };
                      commit("SET_INVOICE_DATA", data);
                }
            });
            commit('INVOICES_LOADED')
        },
        async SET_UPDATE_INVOICE({commit, dispatch, state}, {docId, routeId}) {
            commit('DELETE_INVOICE', docId);
            await dispatch('GET_INVOICE', state);
            commit('TOGGLE_INVOICE')
            commit('TOGGLE_EDIT_INVOICE');
            commit('CURRENT_INVOICES', routeId);
        },
        async SET_DELETE_INVOICE({commit}, docId) {
            const getInvoice = db.collection('invoices').doc(docId)
            await getInvoice.delete();
            commit('DELETE_INVOICE', docId)
        },
        async SET_UPDATE_STATUS_TO_PAID({commit}, docId) {
            const getInvoice = db.collection('invoices').doc(docId);
            await getInvoice.update({
                invoicePaid : true,
                invoicePending: false
            });

            commit('UPDATE_STATUS_TO_PAID', docId)
        },
        async SET_UPDATE_STATUS_TO_PENDING({commit}, docId) {

            const getInvoice = db.collection('invoices').doc(docId);
            await getInvoice.update({
                invoicePaid : false,
                invoicePending: true,
                invoiceDraft: false
            });

            commit('UPDATE_STATUS_TO_PENDING', docId)
        },
    },
}