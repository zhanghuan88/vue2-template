<template>
  <div class="top-navigation">
    <el-tabs v-model="currentTagPath" type="card" @tab-remove="removeTab" @tab-click="tabClick">
      <el-tab-pane v-for="(item,index) in tags" :key="item.path" :label="item.name" :name="item.path"
                   :closable="index!==0">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

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
    })
  },
  watch: {
    "$route": {
      handler() {
        if (this.$route.name === 'Reload') return;
        this.currentTagPath = this.$route.fullPath;
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
      if (currentTag.topMenuId) {
        this.setActiveMainSidebarId(currentTag.topMenuId)
      }
    },
    addTab() {
      let tags = [...this.tags];
      tags.push({
        name: this.$route.meta['title'],
        componentName: this.$route.name,
        path: this.$route.fullPath,
        topMenuId: this.$route.name !== 'PersonalCenter' ? this.topMenuId : undefined
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
  width: 100%;
}
</style>
