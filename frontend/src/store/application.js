/* eslint-disable no-param-reassign */
import session from './../utilities/session'

export default {
  state: {
    vacancy: session.getVacancy()
  },
  getters: {
    getVacancy (state) {
      return state.vacancy
    }
  },
  mutations: {
    setVacancy (state, vac) {
      state.vacancy = vac
      session.setVacancy(vac)
    }
  }
}
