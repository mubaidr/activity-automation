import axios from '../utilities/axios'
import config from '../config'
/* eslint-disable no-param-reassign */

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    postActivity (context, obj) {
      return axios.post(`${config.api}/api/activity`, obj)
    },
    getActivities (context, obj) {
      return axios.get(`${config.api}/api/activity/all`, obj)
    },
    getActivitiesAll (context, obj) {
      return axios.get(`${config.api}/api/activity`, obj)
    }
  }
}
