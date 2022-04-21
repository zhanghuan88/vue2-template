<template>
  <div class="top-navigation">
    <div class="top-navigation-tabs">
      <el-tabs v-model="currentTagPath" type="card" @tab-remove="removeTab" @tab-click="tabClick">
        <el-tab-pane v-for="(item,index) in showTags" :key="item.path" :label="item.name" :name="item.path"
                     :closable="index!==0">
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="top-navigation-tool">
      <el-dropdown>
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import projectSetting from '@/project-setting'

export default {
  name: "TopNavigation",
  data() {
    return {
      currentTagPath: undefined,
      tabIndex: 2
    }
  },
  computed: {
    ...mapState({
      tags: state => state.menu.tags,
      topMenuId: state => state.menu.activeMainSidebarId
    }),
    showTags() {
      return [
        {
          name: projectSetting.homeTitle,
          componentName: 'Home',
          path: '/home'
        }, ...this.tags
      ]
    }
  },
  watch: {
    "$route": {
      handler() {
        if (this.$route.name === 'Reload') return; // 刷新页面时不切换tab
        this.currentTagPath = this.$route.fullPath;
        if (this.$route.name === 'Home') return; // 首页不新增tab
        // 当前tag是否在所有tags中
        let isTagInAll = this.tags.some(item => item.path === this.currentTagPath);
        if (!isTagInAll) {
          this.addTab();
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setActiveMainSidebarId: 'SET_ACTIVE_MAIN_SIDEBAR_ID',
      setTags: 'SET_TAGS'
    }),
    tabClick() {
      this.$router.push(this.currentTagPath);
      let currentTag = this.tags.find(item => item.path === this.currentTagPath);
      if (currentTag?.topMenuId) {
        this.setActiveMainSidebarId(currentTag.topMenuId)
      }
    },
    addTab() {
      let tags = [...this.tags];
      tags.push({
        name: this.$route.meta['title'],
        componentName: this.$route.name,
        path: this.$route.fullPath,
        topMenuId: this.$route.name !== 'PersonalCenter' ? this.topMenuId : undefined // 个人中心页面不需要设置顶部菜单
      });
      this.setTags(tags);
    },
    removeTab(targetName) {
      let currentIndex;
      const tags = this.tags.filter((item, index) => {
        if (item.path === targetName) {
          currentIndex = index;
        }
        return item.path !== targetName
      })
      if (this.tags[currentIndex].path === this.currentTagPath) {
        this.$router.push(currentIndex + 1 < this.tags.length ? this.tags[currentIndex + 1].path : this.tags[currentIndex - 1].path);
      }
      this.setTags(tags);
    }
  }
}
</script>

<style scoped lang="scss">
.top-navigation {
  display: flex;
  height: $g-top-tabs-height;
  padding: 0 20px;

  .top-navigation-tabs {
    flex-grow: 1;
  }

  .top-navigation-tool {
    margin-left: 20px;
    flex-shrink: 0;
  }
}
</style>
