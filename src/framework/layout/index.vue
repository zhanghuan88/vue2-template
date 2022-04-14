<template>
  <div class="layout">
    <div class="warp-container">
      <main-sidebar-container></main-sidebar-container>
      <sub-sidebar-container></sub-sidebar-container>
      <div class="main">
        <main-top></main-top>
        <transition enter-active-class="main-enter" leave-active-class="main-leave" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
import MainSidebarContainer from '@/framework/layout/components/MainSidebarContainer'
import {getTopMenus} from '@/api/user/auth'
import to from 'await-to-js'
import SubSidebarContainer from '@/framework/layout/components/SubSidebarContainer'
import MainTop from '@/framework/layout/components/MainTop'

export default {
  name: "Layout",
  components: {MainTop, SubSidebarContainer, MainSidebarContainer},
  async mounted() {
    const [, topMenus] = await to(getTopMenus())
    if (topMenus) this.$store.commit('SET_TOP_MENUS', topMenus);

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
