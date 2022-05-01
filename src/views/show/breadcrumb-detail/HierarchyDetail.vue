<template>
  <div class="hierarchy-detail">
    层级详情 ID:{{ id }}
    <br/>
    该页面启用了缓存,需要在beforeRouteEnter周期 重新获取query参数
  </div>
</template>

<script>
export default {
  name: "HierarchyDetail",
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.id !== to.query.id) vm.initData();
    })
  },
  data() {
    return {
      id: ""
    }
  },
  methods: {
    // 这里的方法可以写在组件的 `methods` 属性中
    initData() {
      this.id = this.$route.query.id;
    }
  }
}
</script>

<style scoped lang="scss">
.hierarchy-detail {

}
</style>
