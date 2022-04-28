<template>
  <div/>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
  // 刷新重置缓存的组件
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.keepAliveInclude.includes(from.name)) vm.addKeepAliveExclude(from.name);
    })
  },
  beforeRouteLeave(to, from, next) {
    if (this.keepAliveInclude.includes(to.name)) this.removeKeepAliveExclude(to.name);
    next()
  },
  computed: {
    ...mapState({
      keepAliveInclude: state => state.project.keepAliveInclude
    })
  },
  mounted() {
    const back = () => {
      this.$router.replace({
        name: this.$route.params.componentName,
        params: this.$route.params.params,
        query: this.$route.params.query
      })
    }
    if (this.$route.params.componentName) {
      if (this.keepAliveInclude.includes(this.$route.params.componentName)) {
        // 等待移除缓存
        this.$nextTick(() => {
          back();
        })
      } else {
        back();
      }

    } else {
      this.$router.push("/")
    }

  },
  methods: {
    ...mapMutations({
      addKeepAliveExclude: 'ADD_KEEP_ALIVE_EXCLUDE',
      removeKeepAliveExclude: 'REMOVE_KEEP_ALIVE_EXCLUDE'
    })
  }
}
</script>
