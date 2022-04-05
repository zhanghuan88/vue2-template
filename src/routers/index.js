import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'accessible-nprogress'
import store from '@/store'
import Layout from '@/framework/layout'
import {getToken} from '@/utils/token'
import ProjectSetting from '@/project-setting'

Vue.use(VueRouter)
const constantRoutes = [
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/framework/SignIn'),
    meta: {
      title: '登录',
      isAuth: false
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/framework/layout/pages/Home'),
        meta: {
          title: ProjectSetting.homeTitle
        }
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/framework/RouteError'),
    meta: {
      title: '404',
      isAuth: false
    }
  }
]

const router = new VueRouter({
  routes: constantRoutes
})

router.beforeEach((to, from, next) => {
  ProjectSetting.enableProgress && NProgress.start();
  const meta = to.meta || {};
  meta?.title && store.commit('SET_TITLE', meta.title);
  if (getToken()) {
    if (to.path === '/sign-in') {
      next({path: '/'});
    } else {
      next();
    }
  } else {
    // 判断是否需要认证，没有登录访问去登录页
    if (meta?.isAuth === false) {
      next()
    } else {
      next({path: '/sign-in'});
    }
  }
})

router.afterEach(() => {
  ProjectSetting.enableProgress && NProgress.done()
})

export default router;
