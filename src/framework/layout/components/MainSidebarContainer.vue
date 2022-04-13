<template>
  <div class="main-sidebar-container">
    <logo class="sidebar-logo"></logo>
    <div class="nav">
      <div v-for="top of topMenus" :key="top.id" class="item"
           :class="{'active':top.id===$store.state.menu.activeMainSidebarId}"
           @click="$store.commit('SET_ACTIVE_MAIN_SIDEBAR_ID', top.id)">
        <svg-icon :name="top.icon"></svg-icon>
        <div class="title">{{ top.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/framework/layout/components/Logo'
import {mapState} from 'vuex'

export default {
  name: "MainSidebarContainer",
  components: {Logo},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      topMenus: state => state.menu.topMenus
    })
  },
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.main-sidebar-container {
  width: $g-main-sidebar-container-width;
  background-color: $g-main-sidebar-bg;
  height: 100%;
  display: flex;
  flex-direction: column;

  .sidebar-logo {
    flex-shrink: 0;
  }

  .nav {
    color: $g-main-sidebar-menu-color;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    @include hide-scrollbar();

    .active {
      background-color: $g-main-sidebar-menu-active-bg;
      color: $g-main-sidebar-menu-active-color;

      &:before {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -7px;
        width: 0;
        height: 0;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-right: 7px solid #fafafa;
      }
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      height: 60px;
      padding: 0 5px;
      cursor: pointer;
      position: relative;
      transition: all 0.3s;

      &:hover {
        background-color: $g-main-sidebar-menu-active-bg;
        color: $g-main-sidebar-menu-active-color;
      }

      .svg-icon {
        margin: 0 auto;
        font-size: 24px;
      }

      .title {
        text-align: center;
        font-size: 14px;
        width: 100%;
        @include text-overflow();
      }
    }
  }
}
</style>
