<template>
  <div class="flush-cache">
    刷新缓存
    <br/>
    指定页面进来刷新缓存,配置refreshPage:"Home,NoCache",表示从首页和NoCache页面进来刷新页面缓存,其他页面不刷新
    <br/>
    这个页面必须是开启缓存的,否则没有意义.
    <br/>
    功能主要用来新增页面,编辑页面返回来 重新刷新缓存.
  </div>
</template>

<script>
export default {
  name: "FlushCache",
  mounted() {
    window.console.log("FlushCache mounted");
  }
}
</script>

<style scoped lang="scss">
.flush-cache {

}
</style>
