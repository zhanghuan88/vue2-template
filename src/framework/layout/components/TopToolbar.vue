<template>
  <div class="top-toolbar">
    <div class="top-toolbar-left">
      <div class="sidebar-collapse" :class="{ 'is-collapse': shrink }" @click="toggleCollapse">
        <svg-icon name="collapse" />
      </div>
      <el-breadcrumb v-if="isShowBreadcrumb" separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="list of breadcrumbList" :key="list.path" :to="list.path">
            {{ list.name }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="top-toolbar-right">
      <div class="tools">
        <el-tooltip effect="dark" content="搜索" placement="bottom">
          <i class="el-icon-search item" @click="showSearchPop"></i>
        </el-tooltip>
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <span v-if="isFullscreenEnable" class="item" @click="fullscreen">
            <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
          </span>
        </el-tooltip>
        <el-tooltip effect="dark" content="刷新页面" placement="bottom">
          <span class="item reload" @click="reload()">
            <svg-icon name="reload" />
          </span>
        </el-tooltip>
      </div>
      <el-dropdown class="user-container" @command="handleCommand">
        <div class="user-wrapper">
          <el-avatar size="medium" :src="avatar">
            <i class="el-icon-user-solid" />
          </el-avatar>
          {{ nickname }}
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="home">{{ homeTitle }}</el-dropdown-item>
          <el-dropdown-item command="setting">个人中心</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { isEmpty, last } from "lodash-es";
import screenfull from "screenfull";
import projectSetting from "@/project-setting";
import { getAllChildMenuPaths, getChildMenuPathsByFullPath, getMenusFullPath } from "@/utils/menu";
import regex from "@/constant/regex";

export default {
  name: "TopToolbar",
  inject: ["reload"],
  data() {
    return {
      homeTitle: projectSetting.homeTitle,
      isFullscreenEnable: screenfull.isEnabled,
      isFullscreen: screenfull.isFullscreen,
      breadcrumbList: [],
    };
  },
  computed: {
    ...mapGetters(["isMobile", "avatar", "nickname", "shrink", "allMenuChildrenPaths"]),
    isShowBreadcrumb() {
      // 如果是移动端，则不显示面包屑
      return !this.isMobile;
    },
  },
  watch: {
    "$route.fullPath": {
      handler() {
        this.getBreadcrumb();
      },
      immediate: true,
    },
    isMobile() {
      // 模式变换 重置收缩按钮
      this.setShrink(false);
    },
  },
  mounted() {
    if (screenfull.isEnabled) {
      screenfull.on("change", this.fullscreenChange);
    }
  },
  beforeDestroy() {
    if (screenfull.isEnabled) {
      screenfull.off("change", this.fullscreenChange);
    }
  },
  methods: {
    ...mapMutations({
      setShrink: "SET_SHRINK",
      setShowSearchPop: "SET_SHOW_SEARCH_POP",
    }),
    showSearchPop() {
      this.setShowSearchPop(true);
    },
    getBreadcrumb() {
      const [parentRouter, currentRouter] = this.$route.matched;
      if (currentRouter.name === "Reload") return;
      const breadcrumbList = [
        {
          path: this.$route.fullPath,
          name: currentRouter.meta.title,
        },
      ];

      if (parentRouter.path) {
        // 不是单层菜单
        // 过滤当层菜单
        const currentMenuPaths = getChildMenuPathsByFullPath(this.allMenuChildrenPaths, currentRouter.path);
        if (isEmpty(currentMenuPaths)) return;
        // 当前根菜单的所有子路径
        const curMenuChildrenPaths = getAllChildMenuPaths(currentMenuPaths[0].children);
        // 每层菜单最近一个可访问的菜单
        currentMenuPaths.slice(0, -1).findLast((menu, i) => {
          // 默认最前面包屑路径为当前路径
          let curPath = breadcrumbList[0].path;
          // 先找子路径的第一个可访问菜单
          const recentChildRouters = curMenuChildrenPaths.find((routers) => {
            const lastRouter = last(routers);
            const lastIsRouter =
              !lastRouter.hideMenu &&
              (lastRouter.filePath || (regex.url.test(lastRouter.path) && lastRouter.componentName));
            return routers.length === i + 1 && lastIsRouter;
          });
          if (isEmpty(recentChildRouters)) {
            // 没有找到，则看当前菜单是否可访问
            if (menu.filePath || (regex.url.test(menu.path) && menu.componentName)) {
              curPath = `/${getMenusFullPath(currentMenuPaths.slice(0, i + 1))}`;
            }
          } else {
            curPath = `${parentRouter.path}/${getMenusFullPath(recentChildRouters)}`;
          }
          breadcrumbList.unshift({
            path: curPath,
            name: menu.title,
          });
        });
      }
      if (currentRouter.name !== "Home") {
        breadcrumbList.unshift({
          path: "/",
          name: projectSetting.homeTitle,
        });
      }
      this.breadcrumbList = breadcrumbList;
    },
    fullscreen() {
      screenfull.toggle();
    },
    fullscreenChange() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    handleCommand(command) {
      switch (command) {
        case "home":
          this.$router.push("/home");
          break;
        case "setting":
          this.$router.push({
            name: "PersonalCenter",
          });
          break;
        case "logout":
          this.$store.dispatch("FedLogOut");
          this.$router.push("/sign-in");
          break;
        default:
          break;
      }
    },
    toggleCollapse() {
      this.setShrink(!this.shrink);
    },
  },
};
</script>

<style scoped lang="scss">
.top-toolbar {
  height: $g-top-toolbar-height;
  background-color: $g-top-toolbar-bg;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  transition: height 0.3s;
  transform: translateZ(0);

  .top-toolbar-left {
    padding-right: 50px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
    mask: linear-gradient(to left, transparent, #000 100px);

    .sidebar-collapse {
      height: 100%;
      padding: 0 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
      flex-shrink: 0;

      &:hover {
        background-image: linear-gradient(to right, #ddd, transparent);
      }

      ::v-deep .svg-icon {
        transition: transform 0.3s;
      }

      &.is-collapse ::v-deep .svg-icon {
        transform: rotateZ(-180deg);
      }
    }

    .el-breadcrumb {
      flex-shrink: 0;
    }

    // 面包屑动画
    .breadcrumb-enter-active {
      transition: all 0.25s;
    }

    .breadcrumb-enter,
    .breadcrumb-leave-active {
      opacity: 0;
      transform: translateX(30px) skewX(-50deg);
    }
  }

  .top-toolbar-right {
    display: flex;
    align-items: center;
    padding: 0 18px;
    flex-shrink: 0;

    .tools {
      margin-right: 20px;

      .item {
        padding: 6px 8px;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
      }

      @keyframes reload-animation {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }

      .reload:focus {
        display: inline-block;
        animation: reload-animation 0.3s linear;
      }

      .reload:active {
        animation: none;
      }
    }

    .user-container {
      .user-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;

        .el-avatar {
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
