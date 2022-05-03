import to from 'await-to-js'
import localforage from 'localforage'
import StoreKeys from '@/constant/store-keys'

export default {
  state: {
    loginForm: {},
    // 页面标题,
    title: '',
    // 显示模式，支持：mobile、pc
    mode: 'pc',
    // 工具栏收缩按钮是否收缩
    shrink: false,
    // page是否最大化
    pageMaximized: false,
    // 页面keep-alive的include
    keepAliveInclude: [],
    // 页面keep-alive的exclude
    keepAliveExclude: []
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
    },
    SET_SHRINK: (state, shrink) => {
      state.shrink = shrink;
    },
    SET_PAGE_MAXIMIZED: (state, pageMaximized) => {
      state.pageMaximized = pageMaximized;
    },
    SET_KEEP_ALIVE_INCLUDE: (state, keepAliveInclude) => {
      state.keepAliveInclude = keepAliveInclude;
    },
    ADD_KEEP_ALIVE_EXCLUDE: (state, name) => {
      !state.keepAliveExclude.includes(name) && state.keepAliveExclude.push(name);
    },
    REMOVE_KEEP_ALIVE_EXCLUDE: (state, name) => {
      state.keepAliveExclude = state.keepAliveExclude.filter(v => v !== name);
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
    async InitProjectStore({dispatch}) {
      await to(Promise.allSettled([
        dispatch("GetLoginFormByStore"),
        dispatch("GetTopMenuByStore"),
        dispatch("GetTokenByCookie"),
        dispatch("GetUserInfoByStore"),
        dispatch("GetTabsByStore")
      ]))
    }
  }
}
