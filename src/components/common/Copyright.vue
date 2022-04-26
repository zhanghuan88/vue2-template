<template>
  <footer class="copyright">
    Copyright © {{ copyrightDates }}
    <a v-if="copyrightWebsite" :href="copyrightWebsite" target="_blank" rel="noopener">{{ copyrightCompany }}</a>
    <span v-else>{{ copyrightCompany }}</span>
  </footer>
</template>

<script>
import projectSetting from '@/project-setting'

export default {
  name: "Copyright",
  data() {
    return {
      copyrightDates: projectSetting.copyrightDates,
      copyrightWebsite: projectSetting.copyrightWebsite,
      copyrightCompany: projectSetting.copyrightCompany
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
footer {
  margin: 40px 0 20px 0;
  line-height: 20px;
  text-align: center;
  color: #808695;
  font-size: 14px;

  a {
    text-decoration: none;
    color: #808695;

    &:hover {
      color: #3d4047;
    }
  }
}
</style>
