import api from '@/api'

export const login = data => {
  return api({
    url: '/api/login',
    method: 'post',
    data
  })
}
/**
 * @description: 获取顶部菜单,根据用户权限获取,如果没有子菜单,则不返回该顶部菜单
 * @returns {*}
 */
export const getTopMenus = () => {
  return api({
    url: '/api/getTopMenus',
    method: 'get'
  })
}

