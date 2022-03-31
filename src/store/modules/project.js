import to from 'await-to-js'
import localforage from 'localforage'
import StoreKeys from '@/constant/store_keys'

export default {
  state: {
    loginForm: {}
  },
  mutations: {
    SET_LOGIN_FORM: (state, loginForm) => {
      state.loginForm = loginForm
    }
  },
  actions: {
    async GetLoginForm({commit}) {
      const [err, loginForm] = await to(localforage.getItem(StoreKeys.loginForm));
      if (err) return {}
      commit("SET_LOGIN_FORM", loginForm)
      return loginForm;
    },
    async SaveLoginForm({commit}, form) {
      await to(localforage.setItem(StoreKeys.loginForm, form));
      commit("SET_LOGIN_FORM", form)
    },
    async InitProjectStore({dispatch}) {
      await to(Promise.allSettled([
        dispatch("GetLoginForm")
      ]))
    }
  }
}
