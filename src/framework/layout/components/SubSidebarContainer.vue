<template>
  <div class="sub-sidebar-container">
    <div class="sub-sidebar-container__header" :class="{'shadow':headerShowShadow}">
      {{ title }}
    </div>
    <div class="sub-sidebar-container__content" @scroll="onSidebarScroll">
      <el-menu @select="menuClick">
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
import {getRouters} from '@/api/user/auth'
import regex from '@/constant/regex'
import SidebarItem from '@/framework/layout/components/SidebarItem'
import {mapState} from 'vuex'

export default {
  name: "SubSidebarContainer",
  components: {SidebarItem},
  data() {
    return {
      title: process.env.APP_TITLE,
      headerShowShadow: false,
      subMenu: []
    }
  },
  computed: {
    ...mapState({
      topMenuSide: state => state.menu.topMenuSide
    })
  },
  watch: {
    '$store.state.menu.activeMainSidebarId': {
      async handler(val) {
        if (this.topMenuSide[val]) {
          this.subMenu = this.topMenuSide[val];
          return;
        }
        const [, res] = await to(getRouters(val))
        if (res) this.setSubMenu(val, res);
      },
      immediate: true
    }
  },
  methods: {
    menuClick(path) {
      if (!regex.url.test(path)) {
        this.$router.push(path);
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
      this.$store.commit("SET_TOP_MENU_SIDE", {
        topMenuId: topMenuId,
        sideMenu: this.subMenu
      })
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
      animation: fadeInUp;
      animation-duration: 0.2s;
    }

    ::v-deep .el-menu {
      background-color: $g-sub-sidebar-bg;
      border-right: none;
    }
  }

}
</style>
