<template>
  <div class="tabs-page">
    标签全局功能测试页面,首页不支持关闭
    <br>
    <el-button @click="closeCurrent">关闭当前页面</el-button>
    <el-button @click="closeAll">关闭全部</el-button>
    <el-button @click="closeOther">关闭其他</el-button>
    <el-button @click="closeRight">关闭右侧</el-button>
    <el-button @click="closeLeft">关闭左侧</el-button>
  </div>
</template>

<script>
export default {
  name: "TabsPage",
  methods: {
    closeCurrent() {
      this.$tabs.closeTab();
    },
    closeAll() {
      this.$tabs.closeAll();
    },
    closeOther() {
      this.$tabs.closeOther();
    },
    closeRight() {
      this.$tabs.closeRight();
    },
    closeLeft() {
      this.$tabs.closeLeft();
    }
  }
}
</script>

<style scoped lang="scss">
.tabs-page {

}
</style>
