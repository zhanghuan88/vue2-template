import localforage from 'localforage'
import StoreKeys from '@/constant/store-keys'
import to from 'await-to-js'
import {getAllMenu} from '@/api/user/auth'

export default {
  state: {
    menuAll: []
  },
  mutations: {
    SET_MENU_ALL: (state, menuAll) => {
      state.menuAll = menuAll;
      localforage.setItem(StoreKeys.menuAll, menuAll).then();
    }
  },
  actions: {
    async GetMenuAll({commit}) {
      const [, menuAll] = await to(getAllMenu());
      if (menuAll) {
        commit("SET_MENU_ALL", menuAll)
      }
    }
  }
}
