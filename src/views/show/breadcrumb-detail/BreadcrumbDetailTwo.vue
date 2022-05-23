<template>
  <div class="breadcrumb-detail-two">
    同级页面 启用详情页缓存
    <br />
    query传参
    <el-button @click="showDetails(1)">详情id:1</el-button>
    <el-button @click="showDetails(2)">详情id:2</el-button>
  </div>
</template>

<script>
export default {
  name: "BreadcrumbDetailTwo",
  methods: {
    showDetails(id) {
      this.$router.push({
        name: "HierarchyDetail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.breadcrumb-detail-two {
}
</style>
