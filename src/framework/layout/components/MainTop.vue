<template>
  <div class="main-top">
    <top-toolbar></top-toolbar>
    <top-navigation></top-navigation>
  </div>
</template>

<script>
import TopToolbar from '@/framework/layout/components/TopToolbar'
import TopNavigation from '@/framework/layout/components/TopNavigation'

export default {
  name: "MainTop",
  components: {TopToolbar, TopNavigation}

}
</script>

<style scoped lang="scss">
.main-top {
  box-shadow: 0 0 1px #ccc;
}
</style>
