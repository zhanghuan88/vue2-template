import api from '@/api'

export const login = data => {
  return api({
    url: '/api/login',
    method: 'post',
    data
  })
}

export const getTopMenus = () => {
  return api({
    url: '/api/getTopMenus',
    method: 'get'
  })
}

