import VueRouter from 'vue-router'
import NProgress from 'accessible-nprogress'
import store from '@/store'
import {getToken} from '@/utils/token'
import ProjectSetting from '@/project-setting'
import Vue from 'vue'
import routesConfig from '@/router/routes-config'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: routesConfig.constantRoutes
})
router.beforeEach((to, from, next) => {
  const meta = to.meta || {};
  meta?.['title'] && store.commit('SET_TITLE', meta.title);
  ProjectSetting.enableProgress && NProgress.start();
  if (getToken()) {
    if (to.path === '/sign-in') {
      next({path: '/home'});
      ProjectSetting.enableProgress && NProgress.done()
    } else {
      next();
    }
  } else {
    // 判断是否需要认证，没有登录访问去登录页
    if (meta?.['isAuth'] === false) {
      next()
    } else {
      next({
        path: '/sign-in',
        query: {
          redirect: to.fullPath
        }
      });
      ProjectSetting.enableProgress && NProgress.done()
    }
  }
})

router.afterEach(() => {
  ProjectSetting.enableProgress && NProgress.done()
})
export default router;
