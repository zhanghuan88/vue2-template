<template>
  <div class="layout">
    <div class="warp-container">
      <main-sidebar-container></main-sidebar-container>
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

export default {
  name: "Layout",
  components: {MainSidebarContainer},
  async mounted() {
    await this.$store.dispatch("GetMenuAll");
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
