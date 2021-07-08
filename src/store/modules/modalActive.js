export default {
    state: () => ({
        modalActive: false
    }),
    getters: {},
    mutations: {
        TOGGLE_MODAL(state) {
            state.modalActive = !state.modalActive

        }
    },
    actions: {
        SET_MODAL_STATUS({commit}) {
            commit('TOGGLE_MODAL')
        }
    },
}