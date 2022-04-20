import to from 'await-to-js'
import localforage from 'localforage'
import StoreKeys from '@/constant/store-keys'
import {getToken} from '@/utils/token'

export default {
  state: {
    loginForm: {},
    // 页面标题,
    title: '',
    // 显示模式，支持：mobile、pc
    mode: 'pc'
  },
  mutations: {
    SET_LOGIN_FORM: (state, loginForm) => {
      state.loginForm = {
        account: loginForm.account,
        remember: loginForm.remember
      };
      localforage.setItem(StoreKeys.loginForm, state.loginForm).then();
    },
    SET_TITLE: (state, title) => {
      state.title = title;
    },
    SET_MODE: (state, width) => {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        state.mode = 'mobile'
      } else {
        // 如果为桌面设备，再根据页面宽度判断是否需要切换为移动端展示
        if (width < 992) {
          state.mode = 'mobile'
        } else {
          state.mode = 'pc'
        }
      }
    }
  },
  actions: {
    async GetLoginFormByStore({commit}) {
      const [, loginForm] = await to(localforage.getItem(StoreKeys.loginForm));
      if (loginForm) {
        commit("SET_LOGIN_FORM", loginForm)
        return loginForm;
      }
    },
    async GetTopMenuByStore({commit}) {
      const [, topMenus] = await to(localforage.getItem(StoreKeys.topMenus));
      if (topMenus) commit("SET_TOP_MENUS", topMenus)
    },
    async GetUserInfoByStore({commit}) {
      const [, userInfo] = await to(localforage.getItem(StoreKeys.userInfo));
      if (userInfo) commit("SET_USER_INFO", userInfo)
    },
    GetTokenByCookie({commit}) {
      const token = getToken();
      if (token) commit("SET_TOKEN", token)
    },
    async InitProjectStore({dispatch}) {
      await to(Promise.allSettled([
        dispatch("GetLoginFormByStore"),
        dispatch("GetTopMenuByStore"),
        dispatch("GetTokenByCookie"),
        dispatch("GetUserInfoByStore")
      ]))
    }
  }
}
