import to from 'await-to-js'
import {login} from '@/api/user/auth'
import localforage from 'localforage'
import StoreKeys from '@/constant/store-keys'
import {setToken} from '@/utils/token'

export default {
  state: {
    userInfo: {},
    token: ""
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
      localforage.setItem(StoreKeys.userInfo, state.userInfo).then();
    },
    SET_TOKEN: (state, token) => {
      setToken(token);
      state.token = token;
      localforage.setItem(StoreKeys.token, state.token).then();
    }
  },
  actions: {
    async SignIn({commit}, form) {
      const [, res] = await to(login(form));
      if (res) {
        commit("SET_USER_INFO", res['userInfo'])
        commit("SET_TOKEN", res['token'])
        commit("SET_LOGIN_FORM", form)
      }
    },
    FedLogOut({commit}) {
      commit("SET_USER_INFO", {})
      commit("SET_TOKEN", "")
    }

  }
}
