<template>
  <div class="page-action-bar">
    <page-header title="底部操作栏" content="bottom-action-bar" />
    <el-card style="margin: 20px"> 固定底部操作栏会遮住版权信息组件,底部组件会补个版权组件,但是不能固定在底部 </el-card>
    <bottom-action-bar>
      <el-button type="primary">提交</el-button>
      <el-button>取消</el-button>
    </bottom-action-bar>
  </div>
</template>

<script>
export default {
  name: "PageActionBar",
};
</script>

<style scoped lang="scss">
.page-action-bar {
}
</style>
