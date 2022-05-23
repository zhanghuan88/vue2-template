<template>
  <div class="sidebar-item">
    <el-menu-item v-if="emptyChildren" :title="item.title" :index="basePath">
      <svg-icon v-if="icon" :name="icon" />
      <span>{{ item.title }}</span>
    </el-menu-item>
    <el-submenu v-else :title="item.title" :index="basePath">
      <template slot="title">
        <svg-icon v-if="icon" :name="icon" />
        <span>{{ item.title }}</span>
      </template>
      <sidebar-item v-for="menu in item.children" :key="menu.path" :item="menu" :base-path="resolvePath(menu)" />
    </el-submenu>
  </div>
</template>

<script>
import { isEmpty } from "lodash-es";
import regex from "@/constant/regex";
import { transformPath } from "@/utils/menu";

export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      icon: "",
    };
  },
  computed: {
    emptyChildren() {
      return isEmpty(this.item.children);
    },
  },
  watch: {
    $route: {
      handler() {
        if (this.$route.name === "Reload") return;
        if (this.item.activeIcon && this.$route.path.indexOf(this.basePath) === 0) {
          this.icon = this.item.activeIcon;
          return;
        }
        this.icon = this.item.icon;
      },
      immediate: true,
    },
  },
  methods: {
    resolvePath(menu) {
      if (regex.url.test(menu.path)) {
        return menu.path;
      }
      return transformPath(this.basePath) + transformPath(menu.path);
    },
  },
};
</script>

<style scoped lang="scss">
.sidebar-item {
  ::v-deep .svg-icon {
    font-size: 20px;
    vertical-align: -0.25em;
    transition: transform 0.2s;
    color: unset;
  }

  ::v-deep .el-menu-item.is-active {
    color: $g-sub-sidebar-menu-active-color !important;
    background-color: $g-sub-sidebar-menu-active-bg !important;
  }

  ::v-deep .el-submenu__title {
  }

  ::v-deep .el-submenu__title,
  ::v-deep .el-menu-item {
    color: $g-sub-sidebar-menu-color;
    height: $g-sub-sidebar-menu-height;
    line-height: $g-sub-sidebar-menu-height;

    .svg-icon {
      transition: transform 0.2s ease-in;
    }

    &:hover,
    &:focus {
      background-color: $g-sub-sidebar-menu-hover-bg;
    }

    &:hover {
      .svg-icon {
        transform: scale(1.2);
      }
    }
  }
}
</style>
