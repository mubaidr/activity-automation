import axios from '../utilities/axios'
import config from '../config'
/* eslint-disable no-param-reassign */

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    removeActivity (context, obj) {
      return axios.delete(`${config.api}/api/activity`, obj)
    },
    postActivity (context, obj) {
      return axios.post(`${config.api}/api/activity`, obj)
    },
    getActivity (context, obj) {
      return axios.get(`${config.api}/api/activity`, obj)
    },
    getWeekActivities (context, obj) {
      return axios.get(`${config.api}/api/activity/all`, obj)
    }
  }
}

// TODO: save calender date state for activities
