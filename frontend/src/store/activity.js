import axios from '../utilities/axios'
import config from '../config'
/* eslint-disable no-param-reassign */

export default {
  state: {
    activities: []
  },
  getters: {
    activities(state) {
      return state.activities
    }
  },
  mutations: {
    setActivites(state, data) {
      state.activities = data
    }
  },
  actions: {
    removeActivity(context, obj) {
      return axios.delete(`${config.api}/api/activity`, {
        params: {
          id: obj.id
        }
      })
    },
    postActivity(context, obj) {
      return axios.post(`${config.api}/api/activity`, obj)
    },
    getActivity(context, obj) {
      return axios.get(`${config.api}/api/activity`, {
        params: {
          time: obj.time
        }
      })
    },
    getActivitiesForMonth(context) {
      return axios
        .get(`${config.api}/api/activity`)
        .then(res => {
          context.commit('setActivites', res.data)
        })
        .catch(() => {
          context.commit('setActivites', [])
        })
    }
  }
}
