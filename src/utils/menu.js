import {cloneDeep, isEmpty, last} from 'lodash-es'
import regex from '@/constant/regex'
import routesConfig from '@/router/routes-config'

// 获取二级路由
function getRoutByMenu(menu) {
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
    path: menu.path,
    name: menu.componentName,
    component: component,
    props: {
      url: menu.link
    },
    meta: {
      title: menu.title,
      disPageCache: menu.disPageCache,
      refreshPage: menu.refreshPage?.split(',') ?? []
    }
  }

}

// 获取所有可访问根菜单的路径
export function getAllChildMenuPaths(allMenus) {
  let result = [];
  let tempPath = []; // 栈

  function getChild(menu) {
    if (menu.filePath || regex.url.test(menu.path)) {
      tempPath.push(menu);
      result.push(cloneDeep(tempPath));
      tempPath.pop();
    }
    if (!isEmpty(menu.children)) {
      tempPath.push(menu);
      menu.children.forEach(getChild);
      tempPath.pop();
    }
  }

  allMenus.forEach(getChild);
  return result;
}

// 动态路由
export function handleRoutesByMenus(allChildMenuPaths) {
  // 所有动态路由分组
  let routesObj = {
    "/": []
  }
  allChildMenuPaths.forEach(menuPaths => {
    let lastMenu = last(menuPaths);
    if (regex.url.test(lastMenu.path) && lastMenu['newWindow']) return;
    if (menuPaths.length > 1) {
      const firstMenu = menuPaths[0];
      if (regex.url.test(lastMenu.path)) {
        // 补充iframe信息
        lastMenu.link = lastMenu.path;
        lastMenu.path = lastMenu.componentName;
        lastMenu.filePath = "framework/layout/pages/PageIframe";
        lastMenu.disPageCache = true;
      }
      lastMenu.path = menuPaths.slice(1, menuPaths.length).map(item => trimSlash(item.path)).join('/');
      if (routesObj[firstMenu.path] != null) {
        routesObj[`/${trimSlash(firstMenu.path)}`].push(lastMenu);
      } else {
        routesObj[`/${trimSlash(firstMenu.path)}`] = [lastMenu];
      }
    } else {
      routesObj["/"].push(lastMenu)
    }
  })
  // 动态路由
  let routes = [];
  Object.entries(routesObj).forEach(entry => {
    let [parentPath, children] = entry;
    if (isEmpty(children)) return;
    routes.push({
      path: parentPath,
      component: () => import("@/framework/layout/index"),
      redirect: parentPath + '/' + children.find(o => !o['hideMenu']).path,
      children: children.map(getRoutByMenu)
    })
  })
  // 添加最后路由
  routes.push(...routesConfig.lastRoutes);
  window.console.log(routes, '所有动态路由')
  return routes;
}

// 根据路由路径获取菜单路径
export function getChildMenuPathsByFullPath(allMenuChildrenPaths, fullPath) {
  return allMenuChildrenPaths.find(menuPaths => "/" + menuPaths.map(menu => regex.url.test(menu.path) ? trimSlash(menu.componentName ?? "") : trimSlash(menu.path)).join('/') === fullPath);
}

// 去除开头 / 和 结尾 / 的字符串
export function trimSlash(str) {
  return str.replace(/^\/*/, '').replace(/\/*$/, '');
}
