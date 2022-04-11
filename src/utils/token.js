import Cookies from 'js-cookie'
import CookieKeys from '@/constant/cookie-keys'
import ProjectSetting from '@/project-setting'
export function getToken() {
  return Cookies.get(CookieKeys.tokenKey)
}
export function setToken(token) {
  return Cookies.set(CookieKeys.tokenKey, token, { expires: ProjectSetting.tokenExpires })
}
export function removeToken() {
  return Cookies.remove(CookieKeys.tokenKey)
}

