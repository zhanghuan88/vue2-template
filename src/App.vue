<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import {debounce} from 'lodash-es'

export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
  watch: {
    '$store.state.settings.mode': {
      handler() {
        document.body.setAttribute('data-mode', this.$store.state.settings.mode)
      },
      immediate: true
    }
  },
  mounted() {
    window.onresize = debounce(() => {
      this.$store.commit('SET_MODE', document.body.clientWidth)
    }, 100)
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
