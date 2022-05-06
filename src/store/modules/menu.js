import localforage from 'localforage'
import StoreKeys from '@/constant/store-keys'
import to from 'await-to-js'
import {getMenus} from '@/api/user/auth'
import {handleRoutesByMenus} from '@/utils/menu'

export default {
  state: {
    // 顶部菜单
    topMenus: [],
    // 当前激活的顶部菜单id
    activeMainSidebarId: "",
    // 所有菜单信息
    allMenus: [],
    // 标签栏
    tabs: []
  },
  mutations: {
    // 设置顶部菜单
    SET_TOP_MENUS: (state, topMenus) => {
      state.topMenus = topMenus;
      localforage.setItem(StoreKeys.topMenus, topMenus).then();
    },
    // 设置当前激活的顶部菜单id
    SET_ACTIVE_MAIN_SIDEBAR_ID: (state, activeMainSidebarId) => {
      state.activeMainSidebarId = activeMainSidebarId;
    },
    // 设置所有菜单信息
    SET_ALL_MENUS: (state, allMenus) => {
      state.allMenus = allMenus;
    },
    // 设置标签栏
    SET_TABS: (state, tabs) => {
      state.tabs = tabs;
      localforage.setItem(StoreKeys.tabs, tabs).then();
    }
  },
  actions: {
    async GetAllRoutes({commit, getters}) {
      const [, allMenus] = await to(getMenus());
      if (allMenus) {
        commit("SET_ALL_MENUS", allMenus);
        return handleRoutesByMenus(getters.allMenuChildrenPaths);
      }
    },
    async GetTopMenuByStore({commit}) {
      const [, topMenus] = await to(localforage.getItem(StoreKeys.topMenus));
      if (topMenus) commit("SET_TOP_MENUS", topMenus)
    },
    async GetTabsByStore({commit}) {
      const [, tabs] = await to(localforage.getItem(StoreKeys.tabs));
      if (tabs) commit("SET_TABS", tabs);
    }
  }
}
