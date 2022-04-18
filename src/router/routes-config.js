import Layout from '@/framework/layout'
import ProjectSetting from '@/project-setting'

export default {
  constantRoutes: [
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
      path: '',
      component: Layout,
      redirect: 'home',
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
    }
  ],
  lastRoutes: [
    {
      path: '*',
      component: () => import('@/framework/RouteError'),
      meta: {
        title: '404',
        isAuth: false
      }
    }
  ]
}
