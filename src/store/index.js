import Vue from "vue";
import Vuex from "vuex";
import settings from '@/store/modules/settings'
import project from '@/store/modules/project'
import user from '@/store/modules/user'
import getters from '@/store/getters'
import menu from '@/store/modules/menu'

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    settings,
    project,
    user,
    menu
  },
  getters
});
