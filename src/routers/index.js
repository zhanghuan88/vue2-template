import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'accessible-nprogress'
import store from '@/store'

Vue.use(VueRouter)
const constantRoutes = [
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/framework/SignIn'),
    meta: {
      title: '登录'
    }
  },
  // {
  //  path: '/',
  //  component: Layout,
  //  redirect: '/home',
  //  children: [
  //
  //  ]
  // },
  {
    path: '*',
    component: () => import('@/framework/RouteError'),
    meta: {
      title: '404',
      sidebar: false
    }
  }
]

const router = new VueRouter({
  routes: constantRoutes
})

router.beforeEach(async(to, from, next) => {
  store.state.settings.enableProgress && NProgress.start();
  to.meta?.title && store.commit('SET_TITLE', to.meta.title);
  next()
})

router.afterEach(() => {
  store.state.settings.enableProgress && NProgress.done()
})

export default router;
