<template>
  <div class="sub-sidebar-container">
    <div class="sub-sidebar-container__header">
      {{ title }}
    </div>

  </div>
</template>

<script>
export default {
  name: "SubSidebarContainer",
  data() {
    return {
      title: process.env.APP_TITLE
    }
  }
}
</script>

<style scoped lang="scss">
.sub-sidebar-container {
  width: $g-sub-sidebar-container-width;
  box-shadow: 10px 0 10px -10px #c7c7c7;
  background-color: $g-sub-sidebar-bg;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  @include hide-scrollbar();
  position: relative;

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $g-sub-sidebar-container-header-height;
    line-height: $g-sub-sidebar-container-header-height;
    text-align: center;
    padding: 0 10px;
    cursor: pointer;
    font-weight: 700;
    color: #37414b;
    @include text-overflow();
  }
}
</style>
