import Vue from 'vue'
import {camelCase, upperFirst} from 'lodash-es'

// 自动注册组件
const componentsContext = require.context('@/components', true, /\.vue$/)
componentsContext.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = componentsContext(fileName)
  // 获取组件的 PascalCase 命名
  const componentName = componentConfig?.default?.name ?? upperFirst(camelCase(fileName.split('/').pop().replace(/\.\w+$/, '')))
  // 全局注册组件
  Vue.component(componentName, componentConfig.default ?? componentConfig)
})
