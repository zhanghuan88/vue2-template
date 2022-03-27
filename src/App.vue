<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
  methods: {},
  metaInfo() {
    return {
      title: this.$store.state.settings.title,
      titleTemplate: title => title ? `${title} - ${process.env.APP_TITLE}` : process.env.APP_TITLE
    }
  }
};
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
