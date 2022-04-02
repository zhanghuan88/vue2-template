import Vue from 'vue';
import App from './App';
import store from "./store/index";
import './styles/index.scss';
import router from './routers'
import VueMeta from 'vue-meta'
import SvgIcon from '@/components/SvgIcon'
// 根据CDN配置条件编译
/* IFTRUE_offCDN */
import ElementUI from 'element-ui';

Vue.use(ElementUI);
/* FITRUE_offCDN */

// 自动加载 svg 图标
 const req = require.context('./assets/icons', false, /\.svg$/)
 const requireAll = requireContext => requireContext.keys().map(requireContext)
 requireAll(req)
Vue.component(SvgIcon.name, SvgIcon)

Vue.use(VueMeta)
const app = new Vue({
  render: h => h(App),
  store,
  router
});
alert("111")

store.dispatch("InitProjectStore").then(() => {
  app.$mount('#app');
});
