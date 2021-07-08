export default {
    state: () => ({
        name: 'JOHN',
        age: [32, 33, 42, 43]
    }),
    getters: {},
    mutations: {
        SET_NAME(state, payload) {
            state.name = payload
        }
    },
    actions: {
        saveName({commit}, data) {
            commit('SET_NAME', data)
        }
    },
}