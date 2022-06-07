import VueRouter from "vue-router";
import NProgress from "accessible-nprogress";
import Vue from "vue";
import { isEmpty } from "lodash-es";
import store from "@/store";
import { getToken } from "@/utils/token";
import ProjectSetting from "@/project-setting";
import routesConfig from "@/router/routes-config";

Vue.use(VueRouter);
// 解决路由在 push/replace相同地址报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  routes: routesConfig.constantRoutes,
});
router.beforeEach(async (to, from, next) => {
  const meta = to.meta || {};
  if (meta.title) {
    store.commit("SET_TITLE", meta.title);
  }
  if (ProjectSetting.enableProgress) NProgress.start();
  if (getToken()) {
    // 判断是否加载了路由信息
    if (isEmpty(store.state.menu.allMenus)) {
      const allRoutes = await store.dispatch("GetAllRoutes");
      if (allRoutes) {
        router.matcher = new VueRouter({
          routes: routesConfig.constantRoutes,
        }).matcher;
        allRoutes.forEach((route) => {
          router.addRoute(route);
        });
        // 重新跳转到当前路由
        next({ ...to, replace: true });
        return;
      }
    }
    if (to.path === "/sign-in") {
      next({ path: "/home" });
      if (ProjectSetting.enableProgress) NProgress.done();
    } else {
      next();
    }
  } else if (meta?.isAuth === false) {
    // 判断是否需要认证，没有登录访问去登录页
    next();
  } else {
    next({
      path: "/sign-in",
      query: {
        redirect: to.fullPath,
      },
    });
    if (ProjectSetting.enableProgress) NProgress.done();
  }
});

router.afterEach(() => {
  if (ProjectSetting.enableProgress) NProgress.done();
});
router.onError(() => {
  if (ProjectSetting.enableProgress) NProgress.done();
});
export default router;
