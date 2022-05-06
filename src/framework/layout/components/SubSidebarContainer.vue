<template>
  <div class="sub-sidebar-container" :class="{'sub-sidebar-container--collapse':menuCollapse}">
    <div v-if="!menuCollapse" class="sub-sidebar-container__header" :class="{'shadow':headerShowShadow}">
      {{ title }}
    </div>
    <div class="sub-sidebar-container__content" @scroll="onSidebarScroll">
      <el-menu class="menu" :collapse-transition="false" :default-active="defaultActive" :collapse="menuCollapse"
               :unique-opened="sidebarUniqueOpened" @select="menuClick">
        <transition-group name="sidebar" mode="in">
          <sidebar-item v-for="menu in subMenu" :key="menu.path" :item="menu" :base-path="menu.path"/>
        </transition-group>
      </el-menu>
    </div>
  </div>
</template>

<script>
import {isEmpty} from 'lodash-es'
import to from 'await-to-js'
import {getMenus} from '@/api/user/auth'
import regex from '@/constant/regex'
import SidebarItem from '@/framework/layout/components/SidebarItem'
import StoreKeys from '@/constant/store-keys'
import {mapGetters} from 'vuex'
import localforage from 'localforage'
import projectSetting from '@/project-setting'

export default {
  name: "SubSidebarContainer",
  components: {SidebarItem},
  data() {
    return {
      title: process.env.APP_TITLE,
      sidebarUniqueOpened: projectSetting.sidebarUniqueOpened,
      headerShowShadow: false,
      subMenu: [],
      // 顶部菜单和对应子菜单的缓存
      topMenuSide: {},
      defaultActive: '' // 默认选中的菜单
    }
  },
  computed: {
    ...mapGetters(['shrink', 'isMobile', 'activeMainSidebarId']),
    menuCollapse() {
      if (this.isMobile) {
        return false
      }
      return this.shrink
    }
  },
  watch: {
    "$route": {
      handler() {
        if (this.$route.name === 'Reload') return; // 刷新页面时不切换tab
        this.defaultActive = this.$route.fullPath
      },
      immediate: true
    },
    'activeMainSidebarId': {
      async handler(val) {
        if (!val) return
        if (this.topMenuSide[val]) {
          this.subMenu = this.topMenuSide[val];
          return;
        }
        const [, res] = await to(getMenus(val))
        if (res) this.setSubMenu(val, res);
      },
      immediate: true
    }
  },
  methods: {
    menuClick(path) {
      if (!regex.url.test(path)) {
        this.$router.push(path);
        localforage.setItem(StoreKeys.lastOpenRouteTopMenuId, this.activeMainSidebarId)
      } else {
        window.open(path);
      }
    },
    onSidebarScroll(e) {
      this.headerShowShadow = e.target.scrollTop > 0;
    },
    // 处理子菜单没有文件路径并且没有子菜单的路由
    handleSubMenu(menus) {
      return menus.filter(menu => {
        // 路由设置隐藏 菜单 不显示
        if (menu['hideMenu']) return false
        if (!isEmpty(menu.children)) {
          menu.children = this.handleSubMenu(menu.children)
        }
        if (regex.url.test(menu.path) && !menu['newWindow'] && menu['componentName']) {
          menu.path = menu.componentName;
          return true;
        }
        return !isEmpty(menu.children) || menu.filePath || regex.url.test(menu.path);
      });
    },
    setSubMenu(topMenuId, menus) {
      this.subMenu = this.handleSubMenu(menus);
      this.topMenuSide[topMenuId] = this.subMenu;
    }
  }
}

</script>

<style scoped lang="scss">
.sub-sidebar-container {
  width: $g-sub-sidebar-container-width;
  box-shadow: 10px 0 10px -10px #c7c7c7;
  background-color: $g-sub-sidebar-bg;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1;
  transition: width 0.3s;
  transform: translateZ(0);

  &__header {
    height: $g-sub-sidebar-container-header-height;
    line-height: $g-sub-sidebar-container-header-height;
    flex-shrink: 0;
    text-align: center;
    padding: 0 10px;
    cursor: pointer;
    font-weight: 700;
    color: #37414b;
    z-index: 1;
    @include text-overflow();
  }

  .shadow {
    box-shadow: 0 10px 10px -5px #c7c7c7;
  }

  &__content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    @include hide-scrollbar();
    // 侧边栏动画
    .sidebar-enter-active {
      transition-property: transform, opacity;
      transition-duration: .3s;
      transform-origin: left;
    }

    .sidebar-enter {
      opacity: 0;
      transform: skewY(10deg);
    }

    // 收缩后样式
    ::v-deep .el-menu--collapse {
      width: $g-sub-sidebar-container-collapse-width;

      .is-active > .el-submenu__title {
        background-color: $g-sub-sidebar-menu-active-bg;

        &:hover {
          background-color: $g-sub-sidebar-menu-active-bg;
        }

        svg {
          color: white;
        }
      }

      .el-submenu__title {
        i {
          right: 7px;
        }

        span {
          display: none;
        }
      }
    }

    .menu {
      background-color: $g-sub-sidebar-bg;
      border-right: none;

      ::v-deep .el-menu {
        background-color: $g-sub-sidebar-next-bg;
      }

    }
  }

}

.sub-sidebar-container--collapse {
  width: $g-sub-sidebar-container-collapse-width;
}
</style>
