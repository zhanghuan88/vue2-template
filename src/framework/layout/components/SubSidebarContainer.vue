<template>
  <div class="sub-sidebar-container">
    <div class="sub-sidebar-container__header">
      {{ title }}
    </div>
    <div class="sub-sidebar-container__content">
      <el-menu class="">

      </el-menu>
    </div>
  </div>
</template>

<script>
import {debounce, isEmpty} from 'lodash-es'
import to from 'await-to-js'
import {getRouters} from '@/api/user/auth'

export default {
  name: "SubSidebarContainer",
  data() {
    return {
      title: process.env.APP_TITLE,
      subMenu: []
    }
  },
  watch: {
    '$store.state.menu.activeMainSidebarId': {
      handler: debounce(async function(val) {
        console.log(this)
        const [, res] = await to(getRouters(val))
        if (res) this.setSubMenu(res)
      }, 300),
      immediate: true
    }
  },
  methods: {
    // 处理子菜单没有文件路径并且没有子菜单的路由
    handleSubMenu(routers) {
      let subMenu = [];
      routers.forEach(router => {
        if (!isEmpty(router.children)) {
          router.children = this.handleSubMenu(router.children)
        }
        if (!isEmpty(router.children) || router.filePath) subMenu.push(router);
      })
      return subMenu;
    }
  },
  setSubMenu(routers) {
    this.subMenu = this.handleSubMenu(routers);
    console.log(this.subMenu)
  }
}

</script>

<style scoped lang="scss">
.sub-sidebar-container {
  width: $g-sub-sidebar-container-width;
  box-shadow: 10px 0 10px -10px #c7c7c7;
  background-color: $g-sub-sidebar-bg;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  @include hide-scrollbar();
  position: relative;

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $g-sub-sidebar-container-header-height;
    line-height: $g-sub-sidebar-container-header-height;
    text-align: center;
    padding: 0 10px;
    cursor: pointer;
    font-weight: 700;
    color: #37414b;
    @include text-overflow();
  }
}
</style>
