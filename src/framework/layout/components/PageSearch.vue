<template>
  <div :class="{'searching':showSearchPop}" class="page-search" @click="close">
    测试
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import regex from '@/constant/regex'
import {trimSlash} from '@/utils/menu'
import {cloneDeep, isEmpty} from 'lodash-es'

export default {
  name: "PageSearch",
  computed: {
    ...mapState({
      showSearchPop: state => state.project.showSearchPop,
      allMenus: state => state.menu.allMenus
    }),
    searchMenuList() {
      let list = [];
      let tempPath = []; // 栈

      function getChildren(menu) {
        if (isEmpty(menu.children)) {
          if (regex.url.test(menu.path)) {
            tempPath.push({
              path: "/" + !menu['newWindow'] && menu['componentName'] ? trimSlash(menu.componentName) : trimSlash(menu.path),
              title: menu.title,
              icon: menu.icon
            })
            list.push(cloneDeep(tempPath));
            tempPath.pop();
          } else if (menu.filePath) {
            tempPath.push({
              path: "/" + trimSlash(menu.path),
              title: menu.title,
              icon: menu.icon
            })
            list.push(cloneDeep(tempPath));
            tempPath.pop();
          }
        } else {
          tempPath.push({
            path: "/" + trimSlash(menu.path),
            title: menu.title,
            icon: menu.icon
          });
          menu.children.forEach(getChildren);
          tempPath.pop();
        }
      }

      this.allMenus.forEach(getChildren);
      return list;
    }
  },
  methods: {
    ...mapMutations({
      setShowSearchPop: 'SET_SHOW_SEARCH_POP'
    }),
    close() {
      console.log(this.searchMenuList)
      this.setShowSearchPop(false)
    }
  }
}
</script>

<style scoped lang="scss">

.page-search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  transition-property: opacity, transform;
  transition-duration: 0.3s;
  transform: translateZ(0);
  opacity: 0;
  visibility: hidden;
}

.searching {
  opacity: 1;
  visibility: visible;
}
</style>
