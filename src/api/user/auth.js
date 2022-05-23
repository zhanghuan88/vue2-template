import api from "@/api";

export const login = (data) =>
  api({
    url: "/api/login",
    method: "post",
    data,
  });
/**
 * @description: 获取顶部菜单,根据用户权限获取,如果没有子菜单,则不返回该顶部菜单
 * @returns {*}
 */
export const getTopMenus = () =>
  api({
    url: "/api/getTopMenus",
    method: "get",
  });

export const getMenus = (topMenuId) =>
  api({
    url: "/api/routers",
    method: "get",
    params: {
      topMenuId,
    },
  });
