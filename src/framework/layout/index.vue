<template>
  <div class="layout">
    <div class="warp-container">
      <main-sidebar-container></main-sidebar-container>
      <sub-sidebar-container></sub-sidebar-container>
      <div class="main">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>

  </div>
</template>

<script>
import MainSidebarContainer from '@/framework/layout/components/MainSidebarContainer'
import {getTopMenus} from '@/api/user/auth'
import to from 'await-to-js'
import SubSidebarContainer from '@/framework/layout/components/SubSidebarContainer'

export default {
  name: "Layout",
  components: {SubSidebarContainer, MainSidebarContainer},
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
    .main{
      flex-grow: 1;
    }
  }
}
</style>
