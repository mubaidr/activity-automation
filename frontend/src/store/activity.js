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
    addActivity(state, data) {
      state.activities.push(data)
    },
    removeActivity(state, data) {
      for (let i = 0, activity; i < state.activities.length; i += 1) {
        activity = state.activities[i]
        if (activity.id === data.id) {
          state.activities.splice(i, 1)
          break
        }
      }
    },
    setActivites(state, data) {
      state.activities = data
    }
  },
  actions: {
    removeActivity(context, obj) {
      return axios
        .delete(`${config.api}/api/activity`, {
          params: {
            id: obj.id
          }
        })
        .then(() => {
          context.commit('removeActivity', obj)
        })
    },
    postActivity(context, obj) {
      return axios.post(`${config.api}/api/activity`, obj).then(() => {
        context.commit('addActivity', obj)
      })
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
