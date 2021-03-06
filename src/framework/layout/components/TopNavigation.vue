<template>
  <div class="top-navigation">
    <el-tabs
      ref="tabs"
      v-model="currentTabPath"
      class="top-navigation-tabs top-navigation-tabs--smooth"
      type="card"
      @tab-remove="$tabs.closeTab"
      @tab-click="tabClick"
      @contextmenu.native="contextMenu"
      @dblclick.native="dblClick">
      <el-tab-pane
        v-for="(item, index) in showTabs"
        :key="item.path"
        :label="item.name"
        :name="item.path"
        :closable="index !== 0">
      </el-tab-pane>
    </el-tabs>
    <el-dropdown
      v-show="showTabs.length > 1"
      class="top-navigation-tool"
      size="small"
      @visible-change="toolVisibleChange"
      @command="handleCommand">
      <span class="top-navigation-tool--icon" :class="{ 'top-navigation-tool-show': isToolShow }">
        <i class="box box-t"></i>
        <i class="box"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-close" command="closeOther" :disabled="dropdownOtherDis">
          关闭其他
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-right" command="closeRight" :disabled="dropdownRightDis">
          关闭右侧
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-back" command="closeLeft" :disabled="dropdownLeftDis">
          关闭左侧
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-close" command="closeAll">关闭全部</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { uniq } from "lodash-es";
import projectSetting from "@/project-setting";

export default {
  name: "TopNavigation",
  inject: ["reload"],
  data() {
    return {
      currentTabPath: undefined,
      isToolShow: false,
      activeContextMenuIndex: 0,
    };
  },
  computed: {
    ...mapState({
      tabs: (state) => state.menu.tabs,
    }),
    ...mapGetters(["activeMainSidebarId"]),
    dropdownOtherDis() {
      return (
        (this.$route.fullPath !== "/home" && this.showTabs.length === 2) ||
        (this.$route.fullPath === "/home" && this.showTabs.length === 1)
      );
    },
    dropdownRightDis() {
      const currentIndex = this.showTabs.findIndex((item) => item.path === this.$route.fullPath);
      return currentIndex === this.showTabs.length - 1;
    },
    dropdownLeftDis() {
      const currentIndex = this.showTabs.findIndex((item) => item.path === this.$route.fullPath);
      return [0, 1].includes(currentIndex);
    },
    showTabs() {
      const tabs = [
        {
          name: projectSetting.homeTitle,
          componentName: "Home",
          path: "/home",
        },
        ...this.tabs,
      ];
      const cacheList = [];
      tabs.forEach((item) => {
        if (!item.disPageCache && item.componentName) cacheList.push(item.componentName);
      });
      this.setKeepAliveInclude(uniq(cacheList));
      return tabs;
    },
    tabContextMenu() {
      const currentTab = this.showTabs[this.activeContextMenuIndex];
      const isDisableReload = currentTab.path !== this.$route.fullPath;
      const isDisableCloseCurrent = this.activeContextMenuIndex === 0;
      const isDisableCloseOther =
        (this.activeContextMenuIndex === 1 && this.showTabs.length === 2) ||
        (this.activeContextMenuIndex === 0 && this.showTabs.length === 1);
      const isDisableCloseRight = this.activeContextMenuIndex === this.showTabs.length - 1;
      const isDisableCloseLeft = [0, 1].includes(this.activeContextMenuIndex);
      return [
        {
          label: "重新加载",
          icon: "el-icon-refresh",
          disabled: isDisableReload,
          onClick: () => {
            this.reload();
          },
        },
        {
          label: "关闭标签页",
          icon: "el-icon-close",
          disabled: isDisableCloseCurrent,
          divided: true,
          onClick: () => {
            this.$tabs.closeTab(currentTab.path);
          },
        },
        {
          label: "窗口最大化",
          icon: "el-icon-rank",
          disabled: isDisableReload,
          divided: true,
          onClick: () => {
            this.setPageMaximized(true);
          },
        },
        {
          label: "关闭其他",
          icon: "el-icon-close",
          disabled: isDisableCloseOther,
          onClick: () => {
            this.$tabs.closeOther(currentTab.path);
          },
        },
        {
          label: "关闭右侧",
          icon: "el-icon-right",
          disabled: isDisableCloseRight,
          onClick: () => {
            this.$tabs.closeRight(currentTab.path);
          },
        },
        {
          label: "关闭左侧",
          icon: "el-icon-back",
          disabled: isDisableCloseLeft,
          onClick: () => {
            this.$tabs.closeLeft(currentTab.path);
          },
        },
      ];
    },
  },
  watch: {
    $route: {
      handler() {
        if (this.$route.name === "Reload") return; // 刷新页面时不切换tab
        this.currentTabPath = this.$route.fullPath;
        if (this.$route.name === "Home") return; // 首页不新增tab
        // 当前tab不存在时新增tab
        const isTabInAll = this.tabs.some((item) => item.path === this.currentTabPath);
        if (!isTabInAll) {
          this.addTab();
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations({
      setActiveMainSidebarId: "SET_ACTIVE_MAIN_SIDEBAR_ID",
      setTabs: "SET_TABS",
      setPageMaximized: "SET_PAGE_MAXIMIZED",
      setKeepAliveInclude: "SET_KEEP_ALIVE_INCLUDE",
    }),
    tabEventIndex(e) {
      let { target } = e;
      let flag = false;
      if (target.className.indexOf("el-tabs__item") > -1) flag = true;
      else if (target.parentNode.className.indexOf("el-tabs__item") > -1) {
        target = target.parentNode;
        flag = true;
      }
      if (flag) {
        e.preventDefault();
        e.stopPropagation();
        let i = 0; // 当前元素的索引;
        while (target.previousSibling != null) {
          i += 1;
          target = target.previousSibling;
        }
        return [flag, i];
      }
      return [flag, null];
    },
    contextMenu(e) {
      const [flag, i] = this.tabEventIndex(e);
      if (flag) {
        this.activeContextMenuIndex = i;
        this.$contextmenu({
          items: this.tabContextMenu,
          event: e,
          customClass: "tab-contextmenu",
          minWidth: 40,
          zIndex: 3,
        });
      }
    },
    dblClick(e) {
      const [flag] = this.tabEventIndex(e);
      if (flag) {
        this.setPageMaximized(true);
      }
    },

    handleCommand(command) {
      switch (command) {
        case "closeOther":
          this.$tabs.closeOther();
          break;
        case "closeRight":
          this.$tabs.closeRight();
          break;
        case "closeLeft":
          this.$tabs.closeLeft();
          break;
        case "closeAll":
          this.$tabs.closeAll();
          break;
        default:
          break;
      }
    },
    toolVisibleChange(visible) {
      this.isToolShow = visible;
    },
    tabClick() {
      this.$router.push(this.currentTabPath);
      const currentTab = this.tabs.find((item) => item.path === this.currentTabPath);
      if (currentTab?.topMenuId) {
        this.setActiveMainSidebarId(currentTab.topMenuId);
      }
    },
    addTab() {
      const tabs = [...this.tabs];
      tabs.push({
        name: this.$route.meta.title,
        componentName: this.$route.name,
        path: this.$route.fullPath,
        topMenuId: this.activeMainSidebarId,
        disPageCache: this.$route.meta.disPageCache,
      });
      this.setTabs(tabs);
    },
  },
};
</script>
<style lang="scss">
.tab-contextmenu {
  .menu_item_expand_icon {
    display: none;
  }
}
</style>
<style scoped lang="scss">
.top-navigation {
  position: relative;
  box-sizing: border-box;
  display: flex;
  height: $g-top-tabs-height;
  padding: 0 20px;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  background-color: $g-top-tabs-bg;
  transition: height 0.3s;
  transform: translateZ(0);

  .top-navigation-tabs {
    width: 0;
    flex: 1;

    ::v-deep .el-tabs__header {
      margin-bottom: 0;
      border-bottom: none;

      .el-tabs__nav-wrap {
        margin-bottom: 0;
      }

      .el-tabs__nav {
        border: none;

        .el-tabs__item {
          box-shadow: none;
          border: none;
        }
      }
    }
  }

  .top-navigation-tabs--smooth {
    align-self: stretch;

    ::v-deep .el-tabs__header {
      .el-tabs__item {
        margin-top: calc(#{$g-top-tabs-height} - 35px);
        height: 35px;
        margin-right: -15px;
        padding: 0 25px;

        &:not(.is-active):hover {
          color: inherit;
          background-color: #dee1e6;
          mask: url("~@/assets/image/framework/tab-mask.png");
          mask-size: 100% 100%;
        }
      }

      .is-active {
        background-color: #e8f4ff;
        mask: url("~@/assets/image/framework/tab-mask.png");
        mask-size: 100% 100%;
      }
    }
  }

  .top-navigation-tool {
    flex: none;
    margin-left: 20px;

    .top-navigation-tool-show {
      transform: rotate(90deg);

      .box-t:before {
        transform: rotate(45deg);
      }

      .box:before,
      .box:after {
        background-color: #1890ff !important;
      }
    }

    .top-navigation-tool--icon {
      display: inline-block;
      color: #9a9a9a;
      cursor: pointer;
      transition: transform 0.3s ease-out;

      &:hover {
        @extend .top-navigation-tool-show;
      }

      .box-t:before {
        transition: transform 0.3s ease-out;
      }

      .box {
        position: relative;
        display: block;
        width: 18px;
        height: 8px;

        &:before {
          position: absolute;
          top: 2px;
          left: 0;
          width: 7px;
          height: 7px;
          content: "";
          background: #9a9a9a;
        }

        &:after {
          position: absolute;
          top: 2px;
          left: 8px;
          width: 7px;
          height: 7px;
          content: "";
          background: #9a9a9a;
        }
      }
    }
  }
}
</style>
