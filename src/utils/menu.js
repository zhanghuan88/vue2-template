import { cloneDeep, isEmpty, last } from "lodash-es";
import regex from "@/constant/regex";
import routesConfig from "@/router/routes-config";

// 转换path
export function transformPath(str) {
  return `/${str?.replace(/^\/*/, "").replace(/\/*$/, "") ?? ""}`;
}

// 获取二级路由
function getRoutByMenu(menu) {
  let { filePath } = menu;
  // 页面是否来自 src/framework/layout/pages
  const isFileFromFramework = /^\/*framework/.test(filePath);
  let component;
  if (isFileFromFramework) {
    filePath = filePath.replace(/^\/*framework\/layout\/pages\//, "");
    component = () => import(`@/framework/layout/pages/${filePath}`);
  } else {
    // 其他页面认为来自 src/views
    filePath = filePath.replace(/^\/*views\//, "");
    component = () => import(`@/views/${filePath}`);
  }
  return {
    path: menu.path.replace(/^\/*/, ""),
    name: menu.componentName,
    component,
    props: {
      url: menu.link,
    },
    meta: {
      title: menu.title,
      disPageCache: menu.disPageCache,
      refreshPage: menu.refreshPage?.split(",") ?? [],
    },
  };
}

// 获取所有可访问根菜单的路径
export function getAllChildMenuPaths(allMenus) {
  const result = [];
  const tempPath = []; // 栈

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

export function getMenusFullPath(menus) {
  return menus
    .map((menu) => (regex.url.test(menu.path) ? transformPath(menu.componentName) : transformPath(menu.path)))
    .join("");
}

// 动态路由
export function handleRoutesByMenus(allChildMenuPaths) {
  const cloneData = cloneDeep(allChildMenuPaths);
  // 所有动态路由分组
  const routesObj = {
    "/": [],
  };
  cloneData.forEach((menuPaths) => {
    const lastMenu = last(menuPaths);
    if (regex.url.test(lastMenu.path) && !lastMenu.componentName) return;
    if (menuPaths.length > 1) {
      const firstMenu = menuPaths[0];
      if (regex.url.test(lastMenu.path)) {
        // 补充iframe信息
        lastMenu.link = lastMenu.path;
        lastMenu.path = lastMenu.componentName;
        lastMenu.filePath = "framework/layout/pages/PageIframe";
        lastMenu.disPageCache = true;
      }
      lastMenu.path = getMenusFullPath(menuPaths.slice(1, menuPaths.length));
      if (routesObj[`${transformPath(firstMenu.path)}`] != null) {
        routesObj[`${transformPath(firstMenu.path)}`].push(lastMenu);
      } else {
        routesObj[`${transformPath(firstMenu.path)}`] = [lastMenu];
      }
    } else {
      routesObj["/"].push(lastMenu);
    }
  });
  // 动态路由
  const routes = [];
  Object.entries(routesObj).forEach((entry) => {
    const [parentPath, children] = entry;
    if (isEmpty(children)) return;
    routes.push({
      path: parentPath,
      component: () => import("@/framework/layout/index"),
      redirect: parentPath + children.find((o) => !o.hideMenu).path,
      children: children.map(getRoutByMenu),
    });
  });
  // 添加最后路由
  routes.push(...routesConfig.lastRoutes);
  window.console.log(routes, "所有动态路由");
  return routes;
}

// 根据路由路径获取菜单路径
export function getChildMenuPathsByFullPath(allMenuChildrenPaths, fullPath) {
  return allMenuChildrenPaths.find((menuPaths) => getMenusFullPath(menuPaths) === fullPath);
}
