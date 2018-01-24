/* eslint-disable no-param-reassign */
import session from '../utilities/session'

export default {
  state: {
    loading: false,
    quotes: session.getQuotes()
  },
  getters: {
    isLoading (state) {
      return state.loading
    },
    getQuotes (state) {
      return state.quotes
    }
  },
  mutations: {
    isLoading (state) {
      state.loading = true
    },
    isNotLoading (state) {
      state.loading = false
    }
  }
}
