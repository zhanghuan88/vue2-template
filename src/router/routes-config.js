import ProjectSetting from "@/project-setting";

export default {
  constantRoutes: [
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("@/framework/SignIn"),
      meta: {
        title: "登录",
        isAuth: false,
      },
    },
    {
      path: "/",
      component: () => import("@/framework/layout/index"),
      redirect: "home",
      children: [
        {
          path: "home",
          name: "Home",
          component: () => import("@/framework/layout/pages/Home"),
          meta: {
            title: ProjectSetting.homeTitle,
          },
        },
        {
          path: "personal-center",
          name: "PersonalCenter",
          component: () => import("@/framework/layout/pages/PersonalCenter"),
          meta: {
            title: "个人中心",
          },
        },
        {
          path: "reload",
          name: "Reload",
          component: () => import("@/framework/layout/pages/Reload"),
        },
      ],
    },
  ],
  lastRoutes: [
    {
      path: "*",
      component: () => import("@/framework/RouteError"),
      meta: {
        title: "404",
        isAuth: false,
      },
    },
  ],
};
