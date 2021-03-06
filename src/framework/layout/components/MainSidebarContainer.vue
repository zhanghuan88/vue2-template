<template>
  <div class="main-sidebar-container">
    <logo class="sidebar-logo"></logo>
    <div class="nav">
      <div
        v-for="top of topMenus"
        :key="top.id"
        class="item"
        :class="{ active: top.id === activeMainSidebarId }"
        @click="setActiveMainSidebarId(top.id)">
        <colors-icon :name="top.icon || 'default'" />
        <div class="title">{{ top.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import to from "await-to-js";
import localforage from "localforage";
import { getTopMenus } from "@/api/user/auth";
import Logo from "@/framework/layout/components/Logo";
import StoreKeys from "@/constant/store-keys";

export default {
  name: "MainSidebarContainer",
  components: { Logo },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      topMenus: (state) => state.menu.topMenus,
    }),
    ...mapGetters(["activeMainSidebarId"]),
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations({
      setTopMenus: "SET_TOP_MENUS",
      setActiveMainSidebarId: "SET_ACTIVE_MAIN_SIDEBAR_ID",
    }),
    async init() {
      // 初始化顶部菜单
      const [, topMenus] = await to(getTopMenus());
      if (topMenus) {
        this.setTopMenus(topMenus);
        // 获取最后打开页面时的顶部菜单
        const [, topMenuId] = await to(localforage.getItem(StoreKeys.lastOpenRouteTopMenuId));
        this.setActiveMainSidebarId(topMenuId || topMenus[0].id);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.main-sidebar-container {
  width: $g-main-sidebar-container-width;
  background-color: $g-main-sidebar-bg;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  transform: translateZ(0);

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
      transition-duration: 0.3s;
      transition-property: color, background-color;

      &:hover {
        background-color: $g-main-sidebar-menu-active-bg;
        color: $g-main-sidebar-menu-active-color;
      }

      ::v-deep svg {
        margin: 0 auto;
        font-size: 24px;
      }

      .title {
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        width: 100%;
        height: 20px;
        @include text-overflow();
      }
    }
  }
}
</style>
