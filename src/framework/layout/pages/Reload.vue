<template>
  <div/>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.addKeepAliveExclude(from.name)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.removeKeepAliveExclude(to.name);
    next()
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.redirect) {
        this.$router.replace(this.$route.query.redirect)
      } else {
        this.$router.push("/")
      }
    })

  },
  methods: {
    ...mapMutations({
      addKeepAliveExclude: 'ADD_KEEP_ALIVE_EXCLUDE',
      removeKeepAliveExclude: 'REMOVE_KEEP_ALIVE_EXCLUDE'
    })
  }
}
</script>
