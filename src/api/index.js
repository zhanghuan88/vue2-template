import axios from "axios";
import NProgress from "accessible-nprogress";
import { debounce } from "lodash-es";
import { Message } from "element-ui";
import { getToken } from "@/utils/token";
import ProjectSetting from "@/project-setting";

const debounceShowMessage = debounce((message) => {
  Message({
    message,
    type: "error",
  });
}, 500);

const api = axios.create({
  baseURL: process.env.APP_API_ROOT,
  timeout: 2000, // 默认超时时间
  responseType: "json",
  validateStatus(status) {
    // 返回其他状态码
    return status >= 200 && status < 500;
  },
  withCredentials: true, // 跨域请求，允许保存cookie
});

export function initApi(store, router) {
  // http request拦截
  api.interceptors.request.use(
    (config) => {
      // 开启 progress bar
      if (ProjectSetting.enableProgress) NProgress.start();
      if (getToken()) {
        config.headers[ProjectSetting.tokenHeader] = getToken();
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  // http response 拦截
  api.interceptors.response.use(
    (res) => {
      // 关闭 progress bar
      if (ProjectSetting.enableProgress) NProgress.done();
      const { data } = res;
      const meta = res.config.meta ?? {};
      // 获取状态码
      const status = data[ProjectSetting.resStatusKey] ?? res.status;
      const message = data[ProjectSetting.resMsgKey] ?? "未知错误";
      // 如果是401则跳转到登录页面
      if (status === 401) {
        store.dispatch("FedLogOut").then();
        router.replace({
          path: "/sign-in",
          query: {
            redirect: router.currentRoute.fullPath,
          },
        });
      }
      // 自定义处理请求
      if (!meta.handler) {
        if (status !== 200) {
          debounceShowMessage(message);
          return Promise.reject(new Error(message));
        }
        return data[ProjectSetting.resDataKey];
      }
      return res;
    },
    (error) => {
      if (ProjectSetting.enableProgress) NProgress.done();
      return Promise.reject(new Error(error));
    }
  );
}

export default api;
