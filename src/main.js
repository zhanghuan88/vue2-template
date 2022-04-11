import Vue from 'vue';
import App from './App';
import router from './router'
import store from "./store/index";
import './styles/index.scss';
import VueMeta from 'vue-meta'
import SvgIcon from '@/components/SvgIcon'
import ELEMENT from 'element-ui';

// 根据CDN配置条件编译
Vue.use(ELEMENT);
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
store.dispatch('InitProjectStore').then(() => {
  app.$mount('#app');
});