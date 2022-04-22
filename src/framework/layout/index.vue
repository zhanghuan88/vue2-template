<template>
  <div class="layout">
    <div class="warp-container">
      <main-sidebar-container></main-sidebar-container>
      <sub-sidebar-container></sub-sidebar-container>
      <div class="main">
        <main-top :class="{'main-top-shadow':headerShowShadow}"></main-top>
        <div class="main-content" @scroll="onSidebarScroll">
          <transition name="main" mode="out-in">
            <keep-alive :include="[]">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainSidebarContainer from '@/framework/layout/components/MainSidebarContainer'
import SubSidebarContainer from '@/framework/layout/components/SubSidebarContainer'
import MainTop from '@/framework/layout/components/MainTop'
import hotkeys from 'hotkeys-js'

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
      isRouterAlive: true,
      headerShowShadow: false
    }
  },
  watch: {
    $route: 'routeChange'
  },
  mounted() {
    hotkeys('f5', e => {
      e.preventDefault()
      this.reload(2)
    })
  },
  methods: {
    onSidebarScroll(e) {
      this.headerShowShadow = e.target.scrollTop > 0;
    },
    reload(type = 1) {
      if (type === 1) {
        this.isRouterAlive = false
        this.$nextTick(() => (this.isRouterAlive = true))
      } else {
        if (this.$route.name === 'Reload') return;
        this.$router.replace({
          name: 'Reload',
          query: {
            redirect: this.$route.fullPath
          }
        })
      }
    },
    routeChange(newVal, oldVal) {
      if (newVal.name === oldVal.name) {
        this.reload()
      }
    }
  }

}
</script>

<style scoped lang="scss">
.layout {
  height: 100%;

  .warp-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;

    ::v-deep .main-sidebar-container, .sub-sidebar-container {
      flex-shrink: 0;
    }

    .main {
      flex-grow: 1;
      background: $g-main-content-bg;

      .main-content {
        height: calc(100% - #{$g-top-toolbar-height} - #{$g-top-tabs-height});
        overflow: auto;
      }

      .main-top-shadow {
        box-shadow: 0 10px 10px -10px #ccc;
      }
    }
  }

  // 主页面动画
  .main-enter-active {
    transition-property: margin, opacity;
    transition-duration: 0.2s;
  }

  .main-leave-active {
    transition-property: margin, opacity;
    transition-duration: 0.2s;
  }

  .main-enter {
    opacity: 0;
    margin-left: -20px;
  }

  .main-leave-to {
    opacity: 0;
    margin-left: 20px;
  }
}
</style>
