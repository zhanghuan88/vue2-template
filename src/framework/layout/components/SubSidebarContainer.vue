<template>
  <div class="sub-sidebar-container" :class="{'sub-sidebar-container--collapse':sidebarCollapse}">
    <div v-if="!sidebarCollapse" class="sub-sidebar-container__header" :class="{'shadow':headerShowShadow}">
      {{ title }}
    </div>
    <div class="sub-sidebar-container__content" @scroll="onSidebarScroll">
      <el-menu class="menu" :collapse-transition="false" :default-active="defaultActive" :collapse="sidebarCollapse"
               @select="menuClick">
        <transition-group enter-active-class="content_animated">
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
import {mapState} from 'vuex'
import localforage from 'localforage'

export default {
  name: "SubSidebarContainer",
  components: {SidebarItem},
  data() {
    return {
      title: process.env.APP_TITLE,
      headerShowShadow: false,
      subMenu: [],
      // 顶部菜单和对应子菜单的缓存
      topMenuSide: {},
      defaultActive: '' // 默认选中的菜单
    }
  },
  computed: {
    ...mapState({
      activeMainSidebarId: state => state.menu.activeMainSidebarId,
      sidebarCollapse: state => state.menu.sidebarCollapse
    })
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
      }
    },
    onSidebarScroll(e) {
      this.headerShowShadow = e.target.scrollTop > 0;
    },
    // 处理子菜单没有文件路径并且没有子菜单的路由
    handleSubMenu(routers) {
      return routers.filter(router => {
        if (!isEmpty(router.children)) {
          router.children = this.handleSubMenu(router.children)
        }
        return !isEmpty(router.children) || router.filePath || regex.url.test(router.path)
      });
    },
    setSubMenu(topMenuId, routers) {
      this.subMenu = this.handleSubMenu(routers);
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
    // 侧边栏进入动画
    .content_animated {
      animation: fadeInUp 0.3s ease;
    }

    // 收缩后样式
    ::v-deep .el-menu--collapse {
      width: $g-sub-sidebar-container-collapse-width;

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
