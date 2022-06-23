import Vue from "vue";
import VueMeta from "vue-meta";
import ELEMENT from "element-ui";
import { initApi } from "@/api";
import router from "./router";
import store from "./store/index";
import "./styles/index.scss";
import App from "./App";
import "@/plugins";
import "@/components";

Vue.use(ELEMENT);
// 初始化api
initApi(store, router);
Vue.use(VueMeta);

const app = new Vue({
  render: (h) => h(App),
  store,
  router,
});
store.dispatch("InitProjectStore").then(() => {
  app.$mount("#app");
});
