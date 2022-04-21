<template>
  <div class="main-top">
    <top-toolbar></top-toolbar>
    <!--<top-navigation></top-navigation>-->
  </div>
</template>

<script>
import TopToolbar from '@/framework/layout/components/TopToolbar'
import TopNavigation from '@/framework/layout/components/TopNavigation'

export default {
  name: "MainTop",
  // eslint-disable-next-line vue/no-unused-components
  components: {TopToolbar, TopNavigation}

}
</script>

<style scoped lang="scss">
.main-top {

}
</style>
