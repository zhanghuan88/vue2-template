<template functional>
  <div class="bottom-action-bar">
    <copyright></copyright>
    <div class="position-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomActionBar",
};
</script>

<style scoped lang="scss">
.bottom-action-bar {
  width: 100%;
  height: 80px;
  overflow: hidden;

  .position-bar {
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 2px #ccc;
    background-color: #fff;
    height: 80px;
  }
}
</style>
