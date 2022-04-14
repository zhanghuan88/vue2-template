import to from 'await-to-js'
import localforage from 'localforage'
import StoreKeys from '@/constant/store-keys'

export default {
  state: {
    loginForm: {}
  },
  mutations: {
    SET_LOGIN_FORM: (state, loginForm) => {
      state.loginForm = {
        account: loginForm.account,
        remember: loginForm.remember
      };
      localforage.setItem(StoreKeys.loginForm, state.loginForm).then();
    }
  },
  actions: {
    async GetLoginForm({commit}) {
      const [, loginForm] = await to(localforage.getItem(StoreKeys.loginForm));
      if (loginForm) {
        commit("SET_LOGIN_FORM", loginForm)
        return loginForm;
      }

    },
    async InitProjectStore({dispatch}) {
      await to(Promise.allSettled([
        dispatch("GetLoginForm"),
        dispatch("GetActiveMainSidebarId"),
        dispatch("GetTopMenu")
      ]))
    }
  }
}
