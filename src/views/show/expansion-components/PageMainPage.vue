<template>
  <div class="page-main-page">
    <page-header title="页面内容" content="页面内容使用el-card组件"></page-header>
    <el-card class="box-card">
      用element自带的card组件
    </el-card>
    <el-card class="box-card" header="标题">
      可以设置标题
    </el-card>
    <div class="row">
      <el-row gutter="20" type="flex">
        <el-col :span="6">
          <el-card>
            结合col使用
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            总是展示阴影
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            hover展示阴影
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="never">
            不展示阴影
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
export default {
  name: "PageMainPage"
}
</script>

<style scoped lang="scss">
.page-main-page {
  .box-card {
    margin: 20px;
  }

  .row {
    margin: 20px;
  }
}
</style>
