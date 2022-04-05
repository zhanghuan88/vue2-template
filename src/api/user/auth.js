import api from '@/api'

export const login = data => {
  return api({
    url: '/api/login',
    method: 'post',
    data
  })
}

export const getAllMenu = () => {
  return api({
    url: '/api/getAllMenu',
    method: 'get'
  })
}

