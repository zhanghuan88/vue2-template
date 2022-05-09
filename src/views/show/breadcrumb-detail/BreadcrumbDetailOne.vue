<template>
  <div class="breadcrumb-detail-one">
    同级页面 禁用详情页缓存
    <br/>
    params传参
    <el-button @click="showDetails(1)">详情id:1</el-button>
    <el-button @click="showDetails(2)">详情id:2</el-button>
  </div>
</template>

<script>
export default {
  name: "BreadcrumbDetailOne",
  methods: {
    showDetails(id) {
      this.$router.push({
        name: 'SameLevelDetail',
        params: {
          id: id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.breadcrumb-detail-one {

}
</style>
