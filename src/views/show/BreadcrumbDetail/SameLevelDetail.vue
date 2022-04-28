<template>
  <div class="same-level-detail">
    同级详情 ID: {{ id }}
  </div>
</template>

<script>
export default {
  name: "SameLevelDetail",
  data() {
    return {
      id: ""
    }
  },
  mounted() {
    this.id = this.$route.params.id;
  }
}
</script>

<style scoped lang="scss">
.same-level-detail {

}
</style>
