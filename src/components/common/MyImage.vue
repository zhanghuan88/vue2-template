<template>
  <el-image :src="src" fit="cover" :preview-src-list="[src]" class="my-image">
    <div slot="error" class="image-slot">
      <colors-icon name="imageLoadFail" />
    </div>
  </el-image>
</template>

<script>
export default {
  name: "MyImage",
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.my-image {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: #ebeef5;
  box-shadow: 0 0 5px 1px #ccc;

  ::v-deep .el-image__inner {
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }
  }

  ::v-deep .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #909399;
    font-size: 30px;
  }
}
</style>
