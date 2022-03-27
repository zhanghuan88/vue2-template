import Vue from 'vue';
import App from './App';
import store from "./store/index";
import './styles/index.scss';
import router from './routers'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
const app = new Vue({
  render: h => h(App),
  store,
  router
});
app.$mount('#app');
