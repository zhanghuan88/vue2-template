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
    // 顶部菜单和子菜单的缓存
    topMenuSide: {},
    // 所有路由信息
    allRoutes: []
  },
  mutations: {
    // 设置顶部菜单
    SET_TOP_MENUS: (state, topMenus) => {
      state.topMenus = topMenus;
      localforage.setItem(StoreKeys.topMenus, topMenus).then();
      if (topMenus.findIndex(item => item.id === state.activeMainSidebarId) === -1) {
        state.activeMainSidebarId = topMenus[0].id;
      }
    },
    // 设置当前激活的顶部菜单id
    SET_ACTIVE_MAIN_SIDEBAR_ID: (state, activeMainSidebarId) => {
      state.activeMainSidebarId = activeMainSidebarId;
      localforage.setItem(StoreKeys.activeMainSidebarId, activeMainSidebarId).then();
    },
    // 设置顶部菜单和子菜单的缓存
    SET_TOP_MENU_SIDE: (state, {topMenuId, sideMenu}) => {
      state.topMenuSide[topMenuId] = sideMenu;
    },
    SET_ALL_ROUTES: (state, allRoutes) => {
      state.allRoutes = allRoutes;
    }
  },
  actions: {
    async GetTopMenu({commit}) {
      const [, topMenus] = await to(localforage.getItem(StoreKeys.topMenus));
      if (topMenus) commit("SET_TOP_MENUS", topMenus)
    },
    async GetActiveMainSidebarId({commit}) {
      const [, activeMainSidebarId] = await to(localforage.getItem(StoreKeys.activeMainSidebarId));
      if (activeMainSidebarId) commit("SET_ACTIVE_MAIN_SIDEBAR_ID", activeMainSidebarId)
    },
    async GetAllRoutes({commit}) {
      const [, allMenus] = await to(getMenus());
      if (allMenus) {
        const allRoutes = handleRoutesByMenus(allMenus);
        commit("SET_ALL_ROUTES", allRoutes);
        return allRoutes;
      }
    }
  }
}
