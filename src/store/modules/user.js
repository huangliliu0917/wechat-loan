import request from '@/utils/request'
import { getUserInfo, setUserInfo } from '@/utils/auth'
import { USER_INFO } from '../mutation-type'

const user = {
  state: {
    userInfo: getUserInfo()
  },
  mutations: {
    [USER_INFO](state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/login',
          method: 'post',
          data: userInfo
        })
          .then(response => {
            let res = response.userInfo
            res['userToken'] = res['token']
            setUserInfo(res)
            commit(USER_INFO, res)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
