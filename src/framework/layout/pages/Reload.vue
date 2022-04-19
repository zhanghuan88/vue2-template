<template>
  <div/>
</template>

<script>
export default {
  mounted() {
    if (this.$route.query.redirect) {
      this.$router.replace(this.$route.query.redirect)
    } else {
      this.$router.push("/")
    }
  }
}
</script>
