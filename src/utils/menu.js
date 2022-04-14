import Layout from '@/framework/layout'
import routesConfig from '@/router/routes-config'
import {flatMapDeep, isEmpty} from 'lodash-es'

export function handleRoutesByMenus(allMenus) {
  let routes = [
    {
      path: '/',
      component: Layout,
      children: []
    }
  ];
  // 处理一层路由
  allMenus.forEach(menu => {
    // 有文件路径则是路由
    if (menu.filePath) {
      routes[0].children.push(getRoutByMenu(menu))
    } else if (!isEmpty(menu.children)) {
      // 将子路由扁平化并判断是否有文件路径
      let children = flatMapDeep(menu.children, item => {
        if (isEmpty(item.children)) {
          return item;
        } else {
          return item.children.map(child => {
            return {
              ...child,
              path: item.path + child.path
            }
          })
        }
      }).filter(item => item.filePath);
      if (!isEmpty(children)) {
        routes.push({
          path: menu.path,
          component: Layout,
          redirect: menu.path + children[0].path,
          children: children.map(getRoutByMenu)
        })
      }
    }
  })
  // 添加最后路由
  routes.push(...routesConfig.lastRoutes);
  return routes;
}

export function getRoutByMenu(menu) {
  let filePath = menu.filePath;
  // 页面来自 src/framework/layout/pages
  if (/^framework/.test(filePath)) {
    filePath = filePath.replace(/^framework\/layout\/pages\//, "");
    return {
      path: menu.path.replace(/^\/*/, ''),
      name: menu.componentName,
      component: resolve => require([`@/framework/layout/pages/${filePath}`], resolve),
      meta: {
        title: menu.title
      }
    }
  }
  // 其他页面认为来自 src/views
  filePath = filePath.replace(/^views\//, "");
  return {
    path: menu.path.replace(/^\/*/, ''),
    name: menu.componentName,
    component: () => import(`@/views/${filePath}`),
    meta: {
      title: menu.title
    }
  }
}
