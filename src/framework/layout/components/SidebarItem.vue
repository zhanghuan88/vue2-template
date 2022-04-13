<template>
  <component :is="component" :title="item.title" :index="basePath" class="sidebar-item">
    <template v-if="component==='el-submenu'" slot="title">
      <svg-icon v-if="item.icon" :name="item.icon"/>
      <span>{{ item.title }}</span>
    </template>
    <template v-if="component==='el-submenu'">
      <SidebarItem v-for="menu in item.children" :key="menu.path" :item="menu" :base-path="resolvePath(menu.path)"/>
    </template>
    <div v-else>
      <svg-icon :name="item.icon"/>
      <span>{{ item.title }}</span>
    </div>
  </component>
</template>

<script>
import {isEmpty} from 'lodash-es'
import regex from '@/constant/regex'

export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    component() {
      return isEmpty(this.item.children) ? 'el-menu-item' : 'el-submenu'
    }
  },
  methods: {
    resolvePath(routePath) {
      if (regex.url.test(routePath)) {
        return routePath
      }
      return this.basePath + routePath
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar-item {
  .svg-icon {
    font-size: 20px;
    vertical-align: -0.25em;
    transition: all 0.2s;
  }
  ::v-deep .el-menu-item.is-active {
    color: $g-sub-sidebar-menu-active-color !important;
    background-color: $g-sub-sidebar-menu-active-bg !important;
  }

  ::v-deep .el-submenu__title, .el-menu-item {
    color: $g-sub-sidebar-menu-color;
    height: $g-sub-sidebar-menu-height;
    line-height: $g-sub-sidebar-menu-height;

    &:hover, &:focus {
      background-color: $g-sub-sidebar-menu-hover-bg;
      .svg-icon {
        transform: scale(1.2);
      }
    }
  }
}
</style>
