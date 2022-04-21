<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import {debounce} from 'lodash-es'
import {mapMutations} from 'vuex'

export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
  watch: {
    '$store.state.project.mode': {
      handler() {
        document.body.setAttribute('data-mode', this.$store.state.project.mode)
      },
      immediate: true
    }
  },
  mounted() {
    this.setMode(document.body.clientWidth)
    window.onresize = debounce(() => {
      this.setMode(document.body.clientWidth)
    }, 100);
  },
  methods: {
    ...mapMutations({
      setMode: 'SET_MODE'
    })
  },
  metaInfo() {
    return {
      title: this.$store.state.project.title,
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
