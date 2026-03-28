import { createStore } from 'vuex'

export interface State {
  count: number
}

export default createStore<State>({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    },
    decrement(context) {
      context.commit('decrement')
    }
  },
  getters: {
    count(state) {
      return state.count
    }
  }
})
