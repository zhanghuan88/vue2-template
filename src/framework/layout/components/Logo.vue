<template>
  <div class="logo">
    <!--<img :src="logo" alt="LOGO"/>-->
  </div>
</template>

<script>
export default {
  name: "Logo",
  data() {
    return {
      // logo: require("@/assets/image/framework/vue.png")
    }
  }
}
</script>

<style scoped lang="scss">
.logo {
  display:flex;
  justify-content:center;
  align-items: center;
  height:50px;
  cursor:pointer;
  img{
    width:40px;
    height:40px;
  }
}
</style>
