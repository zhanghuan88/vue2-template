<template>
  <div class="main-sidebar-container">
    <logo class="sidebar-logo"></logo>
  </div>
</template>

<script>
import Logo from '@/framework/layout/components/Logo'

export default {
  name: "MainSidebarContainer",
  components: {Logo},
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang="scss">
.main-sidebar-container {
  width: $g-main-sidebar-container-width;
  background-color: $g-main-sidebar-bg;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  @include hide-scrollbar();
  position: relative;

  .sidebar-logo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

  }
}
</style>
