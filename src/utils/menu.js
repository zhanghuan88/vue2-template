import Layout from '@/framework/layout'
import routesConfig from '@/router/routes-config'

export function handleRoutesByMenus(allMenus) {
  let routes = [];
  // 处理一层路由
  routes.push({
    path: '/',
    component: Layout,
    children: []
  })
  allMenus.forEach(menu => {
    // 有文件路径则是路由
    if (menu.filePath) {
      routes[0].children.push(handleChildrenRoutByMenu(menu))
    }
  })
  // 添加最后路由
  routes.push(...routesConfig.lastRoutes);
  return routes;
}

export function handleChildrenRoutByMenu(menu) {
  return {
    path: menu.path,
    name: menu.componentName,
    component: resolve => require([`.${menu.path}`], resolve),
    meta: {
      title: menu.title
    }
  }
}
