<template>
  <div class="layout">
    <div class="warp-container">
      <main-sidebar-container></main-sidebar-container>
      <sub-sidebar-container></sub-sidebar-container>
      <div class="main">
        <main-top></main-top>
        <transition enter-active-class="main-enter" leave-active-class="main-leave" mode="out-in">
          <keep-alive :include="[]">
            <router-view></router-view>
          </keep-alive>
        </transition>
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
      isRouterAlive: true
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
    reload(type = 1) {
      if (type === 1) {
        this.isRouterAlive = false
        this.$nextTick(() => (this.isRouterAlive = true))
      } else {
        this.$router.replace({
          path: '/reload',
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
    }
  }

  // 主页面动画
  .main-enter {
    animation: fadeInUp 0.2s ease-in;
  }

  .main-leave {
    animation: fadeOutDown 0.2s ease-in;
  }
}
</style>
