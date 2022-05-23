import { getAllChildMenuPaths } from "@/utils/menu";

const getters = {
  isMobile: (state) => state.project.mode === "mobile",
  shrink: (state) => state.project.shrink,
  activeMainSidebarId: (state) => state.menu.activeMainSidebarId,
  nickname: (state) => state.user.userInfo.nickname,
  avatar: (state) => state.user.userInfo.avatar ?? "",
  allMenuChildrenPaths: (state) => getAllChildMenuPaths(state.menu.allMenus),
};
export default getters;
