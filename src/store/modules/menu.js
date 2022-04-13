import localforage from 'localforage'
import StoreKeys from '@/constant/store-keys'
import to from 'await-to-js'

export default {
  state: {
    // 顶部菜单
    topMenus: [],
    // 当前激活的顶部菜单id
    activeMainSidebarId: "",
    // 顶部菜单和子菜单的缓存
    topMenuSide: {}
  },
  mutations: {
    // 设置顶部菜单
    SET_TOP_MENUS: (state, topMenus) => {
      state.topMenus = topMenus;
      state.activeMainSidebarId = topMenus[0].id;
      localforage.setItem(StoreKeys.topMenus, topMenus).then();
    },
    // 设置当前激活的顶部菜单id
    SET_ACTIVE_MAIN_SIDEBAR_ID: (state, activeMainSidebarId) => {
      state.activeMainSidebarId = activeMainSidebarId;
    },
    // 设置顶部菜单和子菜单的缓存
    SET_TOP_MENU_SIDE: (state, {topMenuId, sideMenu}) => {
      state.topMenuSide[topMenuId] = sideMenu;
    }
  },
  actions: {
    async GetTopMenu({commit}) {
      const [, topMenus] = await to(localforage.getItem(StoreKeys.topMenus));
      if (topMenus) commit("SET_TOP_MENUS", topMenus)
    }
  }
}
