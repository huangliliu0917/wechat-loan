import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import authentication from './modules/authentication'
import loan from './modules/loan'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    authentication,
    loan
  },
  getters
})
