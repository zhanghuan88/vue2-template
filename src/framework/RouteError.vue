<template>
  <div class="route-error">
    <div class="bg"></div>
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你访问的页面不存在</div>
      <el-button type="primary" @click="goBack">{{ countdown }}秒后，返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RouteError",
  beforeRouteLeave(to, from, next) {
    clearInterval(this.inter);
    next();
  },
  data() {
    return {
      inter: null,
      countdown: 5,
    };
  },
  mounted() {
    this.inter = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown === 0) {
        clearInterval(this.inter);
        this.goBack();
      }
    }, 1000);
  },
  methods: {
    goBack() {
      this.$router.replace("/home");
    },
  },
};
</script>

<style scoped lang="scss">
.route-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .bg {
    width: 400px;
    height: 400px;
    background-image: url("~@/assets/image/framework/404.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .content {
    margin-left: 80px;

    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }

    .desc {
      margin: 20px 0 30px;
      font-size: 20px;
      color: #606266;
    }
  }
}
</style>
