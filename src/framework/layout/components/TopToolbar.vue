<template>
  <div class="top-toolbar">
    <div class="top-toolbar-left">
      <div class="sidebar-collapse" :class="{'is-collapse':sidebarCollapse}" @click="toggleCollapse">
        <svg-icon name="collapse"/>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/">{{ homeTitle }}</el-breadcrumb-item>
        <el-breadcrumb-item v-for="list of breadcrumbList" :key="list.path" :to="list.path">{{ list.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import projectSetting from '@/project-setting'
import {trimSlash} from '@/utils/menu'

export default {
  name: "TopToolbar",
  data() {
    return {
      homeTitle: projectSetting.homeTitle
    }
  },
  computed: {
    ...mapState({
      sidebarCollapse: state => state.menu.sidebarCollapse,
      allMenus: state => state.menu.allMenus
    }),
    breadcrumbList() {
      let breadcrumbList = []
      const [first, last] = this.$route.matched;
      if (first.path) { // 不是单层菜单
        // 找到所有菜单最后匹配的路由
        const matched = this.allMenus.findLast(item => {
          return item.path === first.path
        });
        if (matched) {
          breadcrumbList.push({
            path: matched.path,
            name: matched['title']
          });
          const childrenPath = trimSlash(last.path.replace(first.path, ''));
          let childrenList = this.findChildrenList(childrenPath.replace(/^\/*/, ""), matched.children, matched.path);
          breadcrumbList.push(...childrenList);
        }
      } else {
        // 单层菜单首页直接返回
        if (last.path === "/home") return breadcrumbList;
        breadcrumbList.push({
          path: last.path,
          name: last.meta['title']
        })
      }
      return breadcrumbList
    }
  },
  methods: {
    toggleCollapse() {
      this.$store.commit("SET_SIDEBAR_COLLAPSE", !this.sidebarCollapse);
    },
    findChildrenList(childrenPath, children, basePath = "") {
      let childrenList = [];
      children.findLast(item => {
        const re = new RegExp(`^${item.path.replace(/^\/*/, "")}`)
        if (re.test(childrenPath)) {
          // 判断剩余路径是否为空
          const remainingPath = childrenPath.replace(re, '').replace(/^\/*/, "");
          if (remainingPath === '') {
            childrenList.unshift({
              path: `/${trimSlash(basePath)}/${trimSlash(item.path)}`,
              name: item['title']
            });
            return true
          } else {
            const list = this.findChildrenList(remainingPath, item.children, `${trimSlash(basePath)}/${trimSlash(item.path)}`);
            if (list.length > 0) {
              childrenList.unshift(...list);
              childrenList.unshift({
                path: `/${trimSlash(basePath)}/${trimSlash(item.path)}`,
                name: item['title']
              });
            }
            return list.length > 0;
          }
        }
      });
      return childrenList
    }
  }
}
</script>

<style scoped lang="scss">
.top-toolbar {
  height: $g-top-toolbar-height;
  background-color: $g-top-toolbar-bg;
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  .top-toolbar-left {
    padding-right: 50px;
    display: flex;
    align-items: center;

    .sidebar-collapse {
      height: 100%;
      padding: 0 20px;
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        background-image: linear-gradient(to right, #ddd, transparent);
      }

      .svg-icon {
        transition: transform 0.3s;
      }

      &.is-collapse .svg-icon {
        transform: rotateZ(-180deg);
      }
    }
  }
}
</style>
