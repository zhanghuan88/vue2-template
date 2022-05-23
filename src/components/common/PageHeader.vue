<template functional>
  <div class="page-header">
    <div class="left">
      <div class="title">{{ props.title }}</div>
      <div class="content">
        <slot name="content">{{ props.content }}</slot>
      </div>
    </div>
    <div class="right">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: #fff;
  border-bottom: 1px solid #e8eaec;

  .left {
    .title {
      font-size: 22px;
    }

    .content {
      color: #909399;
      font-size: 14px;
      margin-top: 10px;

      &:empty {
        display: none;
      }
    }
  }

  .right {
    flex: none;
    margin-left: 20px;
  }
}
</style>
