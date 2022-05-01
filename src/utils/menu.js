import Layout from '@/framework/layout'
import routesConfig from '@/router/routes-config'
import {isEmpty} from 'lodash-es'

export function handleRoutesByMenus(allMenus) {
  let routes = [
    {
      path: '/',
      component: Layout,
      children: []
    }
  ];
  allMenus.forEach(menu => {
    // 处理只有一层路由 的情况
    if (menu.filePath) {
      routes[0].children.push(getRoutByMenu(menu))
    } else if (!isEmpty(menu.children)) { // 处理有子菜单的路由
      // 将子路由递归判断是否有文件路径
      let children = [];
      deepChildRoute(menu.children, children);
      if (!isEmpty(children)) {
        routes.push({
          path: `/${trimSlash(menu.path)}`,
          component: Layout,
          redirect: `${trimSlash(menu.path)}/${trimSlash(children[0].path)}`,
          children: children.map(getRoutByMenu),
          meta: {
            title: menu.title
          }
        })
      }
    }
  })
  // 删除第一个路由
  if (routes[0].children.length === 0) {
    routes.splice(0, 1)
  }
  // 添加最后路由
  routes.push(...routesConfig.lastRoutes);
  window.console.log(routes, '所有动态路由')
  return routes;
}

// 递归获取子路由
export function deepChildRoute(menus, children) {
  menus.forEach(menu => {
    if (menu.filePath) {
      children.push(menu)
    }
    if (!isEmpty(menu.children)) {
      deepChildRoute(menu.children.map(item => (
        {
          ...item,
          path: `${trimSlash(menu.path)}/${trimSlash(item.path)}` // 补充路径
        }
      )), children)
    }
  })
}

// 获取二级路由
export function getRoutByMenu(menu) {
  let filePath = menu.filePath;
  // 页面是否来自 src/framework/layout/pages
  const isFileFromFramework = /^\/*framework/.test(filePath);
  let component;
  if (isFileFromFramework) {
    filePath = filePath = filePath.replace(/^\/*framework\/layout\/pages\//, "");
    component = () => import(`@/framework/layout/pages/${filePath}`);
  } else { // 其他页面认为来自 src/views
    filePath = filePath.replace(/^\/*views\//, "");
    component = () => import(`@/views/${filePath}`);
  }
  return {
    path: trimSlash(menu.path),
    name: menu.componentName,
    component: component,
    meta: {
      title: menu.title,
      disPageCache: menu.disPageCache,
      refreshPage: menu.refreshPage?.split(',') ?? []
    }
  }

}

// 去除开头 / 和 结尾 / 的字符串
export function trimSlash(str) {
  return str.replace(/^\/*/, '').replace(/\/*$/, '');
}
