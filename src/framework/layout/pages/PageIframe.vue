<template>
  <div v-loading="loading" class="page_iframe">
    <iframe ref="iframe" :src="url"></iframe>
  </div>
</template>

<script>
export default {
  name: "PageIframe",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    this.iframeInit();
  },
  methods: {
    iframeInit() {
      const { iframe } = this.$refs;
      if (iframe.attachEvent) {
        iframe.attachEvent("onload", () => {
          this.loading = false;
        });
      } else {
        iframe.onload = () => {
          this.loading = false;
        };
      }
    },
  },
};
</script>

<style scoped lang="scss">
.page_iframe {
  height: 100%;
  overflow: hidden;

  iframe {
    border: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
