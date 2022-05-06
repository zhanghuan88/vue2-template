import {cloneDeep, isEmpty} from 'lodash-es'

export function getAllChildMenuPaths(allMenus) {
  let result = [];
  let tempPath = []; // 栈

  function getChild(menu) {
    if (isEmpty(menu.children)) {
      tempPath.push(menu);
      result.push(cloneDeep(tempPath));
      tempPath.pop();
    } else {
      tempPath.push(menu);
      menu.children.forEach(getChild);
      tempPath.pop();
    }
  }

  allMenus.forEach(getChild);
  return result;
}

// export function handleRoutesByMenus(allMenus) {
//   // 所有动态路由
//   // let routesObj = {
//   //   "/": []
//   // }
//   // const allChildMenuPaths = getAllChildMenuPaths(allMenus);
//   // allChildMenuPaths.forEach(menuPaths => {
//   //   const lastMenu = last(menuPaths);
//   //   if (lastMenu['newWindow'] || !lastMenu.filePath) return;
//   //   if (menuPaths.length > 1) {
//   //
//   //   } else {
//   //     routesObj["/"].push(lastMenu)
//   //   }
//   // )
//   // allMenus.forEach(menu => {
//   //   // 处理只有一层路由 的情况
//   //   if (regex.url.test(menu.path) && !menu['newWindow'] && menu['componentName']) {
//   //     // 是链接且不是新窗口打开
//   //     routes[0].children.push(getRoutByMenu({
//   //       path: menu.componentName,
//   //       title: menu.title,
//   //       filePath: "framework/layout/pages/PageIframe",
//   //       componentName: menu.componentName,
//   //       props: {url: menu.path},
//   //       disPageCache: true
//   //     }))
//   //   } else if (menu.filePath) {
//   //     routes[0].children.push(getRoutByMenu(menu))
//   //   }
//   //   // 子路由
//   //   if (!isEmpty(menu.children)) { // 处理有子菜单的路由
//   //     let children = [];
//   //     deepChildRoute(menu.children, children);
//   //     if (!isEmpty(children)) {
//   //       routes.push({
//   //         path: `/${trimSlash(menu.path)}`,
//   //         component: () => import("@/framework/layout/index"),
//   //         redirect: trimSlash(menu.path) + "/" + trimSlash(children.find(item => !item['hideMenu']).path),
//   //         children: children.map(getRoutByMenu),
//   //         meta: {
//   //           title: menu.title
//   //         }
//   //       })
//   //     }
//   //   }
//   // })
//   // 删除第一个路由
//   // if (routes[0].children.length === 0) {
//   //   routes.splice(0, 1)
//   // }
//   // // 添加最后路由
//   // routes.push(...routesConfig.lastRoutes);
//   // window.console.log(routes, '所有动态路由')
//   return [];
// }

// 去除开头 / 和 结尾 / 的字符串
export function trimSlash(str) {
  return str.replace(/^\/*/, '').replace(/\/*$/, '');
}

// // 递归获取子路由
// function deepChildRoute(menus, children, parentPath = '') {
//   menus.forEach(menu => {
//     if (regex.url.test(menu.path) && !menu['newWindow'] && menu['componentName']) {
//       // 是链接且不是新窗口打开
//       children.push({
//         path: `${trimSlash(parentPath)}/${menu.componentName}`,
//         title: menu.title,
//         filePath: "framework/layout/pages/PageIframe",
//         componentName: menu.componentName,
//         props: {url: menu.path},
//         disPageCache: true
//       })
//     } else if (menu.filePath) {
//       children.push({
//         ...menu,
//         path: `${trimSlash(parentPath)}/${trimSlash(menu.path)}`
//       })
//     }
//     if (!isEmpty(menu.children)) {
//       deepChildRoute(menu.children, children, `${trimSlash(parentPath)}/${trimSlash(menu.path)}`)
//     }
//   })
// }
//
// // 获取二级路由
// function getRoutByMenu(menu) {
//   let filePath = menu.filePath;
//   // 页面是否来自 src/framework/layout/pages
//   const isFileFromFramework = /^\/*framework/.test(filePath);
//   let component;
//   if (isFileFromFramework) {
//     filePath = filePath = filePath.replace(/^\/*framework\/layout\/pages\//, "");
//     component = () => import(`@/framework/layout/pages/${filePath}`);
//   } else { // 其他页面认为来自 src/views
//     filePath = filePath.replace(/^\/*views\//, "");
//     component = () => import(`@/views/${filePath}`);
//   }
//   return {
//     path: trimSlash(menu.path),
//     name: menu.componentName,
//     component: component,
//     props: menu.props,
//     meta: {
//       title: menu.title,
//       disPageCache: menu.disPageCache,
//       refreshPage: menu.refreshPage?.split(',') ?? []
//     }
//   }
//
// }
