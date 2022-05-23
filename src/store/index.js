import Vue from "vue";
import Vuex from "vuex";
import project from "@/store/modules/project";
import user from "@/store/modules/user";
import getters from "@/store/getters";
import menu from "@/store/modules/menu";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    project,
    user,
    menu,
  },
  getters,
});
