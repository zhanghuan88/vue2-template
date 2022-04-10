import localforage from 'localforage'
import StoreKeys from '@/constant/store-keys'
import to from 'await-to-js'

export default {
  state: {
    topMenus: [],
    activeMainSidebarId: ""
  },
  mutations: {
    SET_TOP_MENUS: (state, topMenus) => {
      state.topMenus = topMenus;
      localforage.setItem(StoreKeys.topMenus, topMenus).then();
    },
    SET_ACTIVE_MAIN_SIDEBAR_ID: (state, activeMainSidebarId) => {
      state.activeMainSidebarId = activeMainSidebarId;
    }
  },
  actions: {
    async GetTopMenu({commit}) {
      const [, topMenus] = await to(localforage.getItem(StoreKeys.topMenus));
      if (topMenus) {
        commit("SET_TOP_MENUS", topMenus)
      }
    }
  }
}
