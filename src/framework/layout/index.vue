<template>
  <div class="layout" :class="{'page-maximized':pageMaximized}">
    <!--侧边部分-->
    <div class="warp-sidebar" :class="{'warp-sidebar-mobile-show':showMobileSidebar}">
      <main-sidebar-container></main-sidebar-container>
      <sub-sidebar-container></sub-sidebar-container>
    </div>
    <div class="main">
      <!--顶部栏-->
      <main-top :class="{'main-top-shadow':headerShowShadow}"></main-top>
      <!--页面-->
      <div class="main-content" @scroll="onSidebarScroll">
        <transition name="main-page" mode="out-in">
          <keep-alive :include="keepAliveInclude" :exclude="keepAliveExclude" :max="keepAliveMax">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <el-backtop target=".main-content" :bottom="20">
        </el-backtop>
      </div>
    </div>
    <!--移动端遮罩层-->
    <div v-show="showMobileSidebar" class="warp-sidebar-mobile-mask" @click="hideMobileSidebar"></div>
    <!--主页最大化退出按钮-->
    <div v-show="pageMaximized" class="page-maximized-exit" @click="setPageMaximized(false)">
      <svg-icon name="exit"></svg-icon>
    </div>
  </div>
</template>

<script>
import MainSidebarContainer from '@/framework/layout/components/MainSidebarContainer'
import SubSidebarContainer from '@/framework/layout/components/SubSidebarContainer'
import MainTop from '@/framework/layout/components/MainTop'
import hotkeys from 'hotkeys-js'
import projectSetting from '@/project-setting'
import {mapGetters, mapMutations, mapState} from 'vuex'

export default {
  name: "Layout",
  components: {MainTop, SubSidebarContainer, MainSidebarContainer},
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      keepAliveMax: projectSetting.keepAliveMax,
      headerShowShadow: false
    }
  },
  computed: {
    ...mapState({
      pageMaximized: state => state.project.pageMaximized,
      keepAliveInclude: state => state.project.keepAliveInclude,
      keepAliveExclude: state => state.project.keepAliveExclude
    }),
    ...mapGetters(['shrink', 'isMobile']),
    showMobileSidebar() {
      return this.isMobile && this.shrink
    }
  },
  watch: {
    $route: 'routeChange'
  },
  mounted() {
    hotkeys('f5', e => {
      e.preventDefault()
      this.reload()
    })
  },
  methods: {
    ...mapMutations({
      setShrink: "SET_SHRINK",
      setPageMaximized: "SET_PAGE_MAXIMIZED"
    }),
    hideMobileSidebar() {
      this.setShrink(false)
    },
    onSidebarScroll(e) {
      this.headerShowShadow = e.target.scrollTop > 0;
    },
    reload() {
      if (this.$route.name === 'Reload') return;
      this.$router.replace({
        name: 'Reload',
        query: {
          redirect: this.$route.fullPath
        }
      })
    },
    routeChange(newVal, oldVal) {
      if (this.isMobile) this.setShrink(false);// 打开新页面，把收缩状态关闭
      if (newVal.name === oldVal.name) {
        this.reload()
      }
    }
  }

}
</script>

<style scoped lang="scss">
[data-mode=mobile] {
  .layout {
    .warp-sidebar-mobile-show {
      transform: translateX(0) !important;
    }

    .warp-sidebar {
      transform: translateX(-100%);
      position: absolute;
      transition: transform 0.3s ease-in-out;
      z-index: 3;
    }
  }
}

.layout {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;

  .warp-sidebar {
    height: 100%;
    display: flex;

    ::v-deep .main-sidebar-container, .sub-sidebar-container {
      flex-shrink: 0;
    }

  }

  .main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .main-content {
      background: $g-main-content-bg;
      overflow-x: hidden;
      overflow-y: auto;
      flex: 1;
    }

    .main-top-shadow {
      box-shadow: 0 10px 10px -10px #ccc;
    }

    // 主页面动画切换
    .main-page-enter-active {
      transition-property: margin, opacity;
      transition-duration: 0.2s;
    }

    .main-page-leave-active {
      transition-property: margin, opacity;
      transition-duration: 0.2s;
    }

    .main-page-enter {
      opacity: 0;
      margin-left: -20px;
    }

    .main-page-leave-to {
      opacity: 0;
      margin-left: 20px;
    }

  }

  .warp-sidebar-mobile-mask {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000080;
    backdrop-filter: blur(2px);
  }

  .page-maximized-exit {
    position: fixed;
    z-index: 4;
    right: -40px;
    top: -40px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: .3s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.7);

      ::v-deep .svg-icon {
        fill: #fff;
      }
    }

    ::v-deep .svg-icon {
      position: absolute;
      bottom: 16px;
      left: 16px;
      transition: .3s;
    }
  }
}

.page-maximized {
  .warp-sidebar > div {
    width: 0;
    transition: width 0.3s;
  }

  ::v-deep .main-top {
    overflow: hidden;

    & > div {
      height: 0;
      transition: height 0.3s;
    }
  }
}
</style>
