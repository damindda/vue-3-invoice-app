import { createStore } from "vuex";
import user from './modules/user';
import invoiceModal from './modules/invoiceModal';
import modalActive from './modules/modalActive';

const store = createStore({
    modules: {
        user,
        invoiceModal,
        modalActive
    }
})


export default store