import to from 'await-to-js'
import {login} from '@/api/user/auth'
import localforage from 'localforage'
import StoreKeys from '@/constant/store-keys'
import {getToken, setToken} from '@/utils/token'
import md5 from 'js-md5'

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
    }
  },
  actions: {
    async SignIn({commit}, form) {
      const params = {
        account: form.account,
        password: md5(form.password)
      };
      const [, res] = await to(login(params));
      if (res) {
        commit("SET_USER_INFO", res['userInfo'])
        commit("SET_TOKEN", res['token'])
        commit("SET_LOGIN_FORM", form)
      } else {
        throw new Error("登录失败")
      }
    },
    async GetUserInfoByStore({commit}) {
      const [, userInfo] = await to(localforage.getItem(StoreKeys.userInfo));
      if (userInfo) commit("SET_USER_INFO", userInfo)
    },
    GetTokenByCookie({commit}) {
      const token = getToken();
      if (token) commit("SET_TOKEN", token)
    },
    FedLogOut({commit}) {
      commit("SET_USER_INFO", {})
      commit("SET_ALL_MENUS", [])
      commit("SET_TOP_MENUS", [])
      commit("SET_ACTIVE_MAIN_SIDEBAR_ID", "")
      commit("SET_TAGS", [])
      commit("SET_TOKEN", "");
      localforage.setItem(StoreKeys.lastOpenRouteTopMenuId, "").then()
    }

  }
}
