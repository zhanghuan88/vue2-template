<template>
  <div class="page-header-page">
    <page-header title="页面标题" content="page-header">
    </page-header>
    <page-header title="页面标题" content="page-header">
      <div>
        <el-button icon="el-icon-back" type="text">返回</el-button>
      </div>
      <template #content>
        <div>内容插槽和左侧插槽</div>
      </template>
    </page-header>
  </div>
</template>

<script>
export default {
  name: "PageHeaderPage"
}
</script>

<style scoped lang="scss">
.page-header-page {

}
</style>
