import axios from 'axios'
import store from '@/store'
import NProgress from 'accessible-nprogress'
import router from '@/router'
import {debounce} from 'lodash-es'
import projectSetting from '@/project-setting'
import {getToken} from '@/utils/token'
import ProjectSetting from '@/project-setting'
import {Message} from 'element-ui'

let debounceShowMessage = debounce(message => {
  Message({
    message,
    type: 'error'
  })
}, 500)

const api = axios.create({
  baseURL: process.env.APP_API_ROOT,
  timeout: 2000, // 默认超时时间
  responseType: 'json',
  validateStatus: function(status) { // 返回其他状态码
    return status >= 200 && status < 500
  },
  withCredentials: true // 跨域请求，允许保存cookie
})

// http request拦截
api.interceptors.request.use(config => {
  // 开启 progress bar
  ProjectSetting.enableProgress && NProgress.start();
  if (getToken()) {
    config.headers[ProjectSetting.tokenHeader] = getToken()
  }
  return config
}, error => {
  return Promise.reject(error)
});
// http response 拦截
api.interceptors.response.use(res => {
  // 关闭 progress bar
  ProjectSetting.enableProgress && NProgress.done();
  const {data} = res;
  const meta = res.config['meta'] ?? {};
  // 获取状态码
  const status = data.code ?? res[projectSetting.resStatusKey];
  const message = data[projectSetting.resMsgKey] ?? '未知错误';
  // 如果是401则跳转到登录页面
  if (status === 401) {
    store.dispatch('FedLogOut').then();
    router.push({path: '/login'}).then();
  }
  if (!meta["handler"]) {
    if (status !== 200) {
      debounceShowMessage(message);
      return Promise.reject(new Error(message))
    } else {
      return data[projectSetting.resDataKey];
    }
  }
  return res;

}, error => {
  ProjectSetting.enableProgress && NProgress.done();
  return Promise.reject(new Error(error));
});

export default api;