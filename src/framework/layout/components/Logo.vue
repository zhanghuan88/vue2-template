<template>
  <div class="logo" @click="goHome()">
    <img :src="logo" alt="LOGO" />
  </div>
</template>

<script>
const logo = require("@/assets/image/framework/vue.png");

export default {
  name: "Logo",
  data() {
    return {
      logo,
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
  }
}
</style>
