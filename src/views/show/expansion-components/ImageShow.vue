<template>
  <div class="image-show">
    <page-header title="图片" content="图片显示"></page-header>
    <el-card style="margin: 20px" header="正常加载">
      <div style="height: 100px; width: 100px">
        <my-image src="https://s1.ax1x.com/2020/07/03/NOeqld.jpg" />
      </div>
    </el-card>
    <el-card style="margin: 20px" header="加载错误">
      <div style="height: 100px; width: 100px">
        <my-image src="" />
      </div>
    </el-card>
    <el-card style="margin: 20px" header="服务方式调用预览图片">
      <div style="height: 100px; width: 100px">
        <el-button @click="showPreviewImage">预览</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ImageShow",
  methods: {
    showPreviewImage() {
      this.$previewImages([
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg",
      ]);
    },
  },
};
</script>

<style scoped lang="scss">
.image-show {
}
</style>
