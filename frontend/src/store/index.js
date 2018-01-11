import vue from 'vue'
import vuex from 'vuex'

import userModule from './user'
import stateModule from './state'
import stepsModule from './steps'
import applicationModule from './application'

vue.use(vuex)

const store = new vuex.Store({
  modules: {
    user: userModule,
    state: stateModule,
    steps: stepsModule,
    application: applicationModule
  }
})

export default store
