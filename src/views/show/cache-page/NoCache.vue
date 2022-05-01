<template>
  <div class="no-cache">
    无缓存页面
    <br/>
    菜单配置 禁用页面缓存(disPageCache = true) (所有tab的页面会开启缓存)
  </div>
</template>

<script>
export default {
  name: "NoCache",
  mounted() {
    window.console.log("NoCache mounted");
  }
}
</script>

<style scoped lang="scss">
.no-cache {

}
</style>
