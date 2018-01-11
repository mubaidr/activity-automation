import session from '../utilities/session'
/* eslint-disable no-param-reassign */

export default {
  state: {
    applicationSteps: 7,
    applicationStep: session.getApplicationStep()
  },
  getters: {
    getApplicationStep (state) {
      return state.applicationStep
    },
    getApplicationSteps (state) {
      return state.applicationSteps
    }
  },
  mutations: {
    setApplicationStep (state, obj) {
      state.applicationStep = obj
      session.setApplicationStep(obj)
    },
    nextApplicationStep (state) {
      if (state.applicationStep < state.applicationSteps) {
        state.applicationStep += 1
        session.setApplicationStep(state.applicationStep)
      }
    },
    previousApplicationStep (state) {
      if (state.applicationStep > 0) {
        state.applicationStep -= 1
        session.setApplicationStep(state.applicationStep)
      }
    }
  },
  actions: {
    gotoPreviousStep () {},
    gotoNextStep () {}
  }
}
