/* eslint-disable no-param-reassign */
import session from '../utilities/session'

export default {
  state: {
    loading: false,
    quotes: session.getQuotes(),
    quote: null
  },
  getters: {
    isLoading(state) {
      return state.loading
    },
    quotes(state) {
      return state.quotes
    },
    randomQuote(state) {
      return state.quote
    }
  },
  mutations: {
    isLoading(state) {
      state.loading = true
    },
    isNotLoading(state) {
      state.loading = false
    },
    getQuote(state) {
      const { quotes } = state
      const types = Object.keys(quotes)
      const rand = Math.floor(Math.random() * types.length)
      const list = quotes[types[rand]]
      const randQ = Math.floor(Math.random() * list.length)
      state.quote = list[randQ]
    }
  },
  actions: {
    setRandomQuote(context) {
      context.commit('getQuote')
      window.setInterval(() => {
        context.commit('getQuote')
      }, 7500)
    }
  }
}
