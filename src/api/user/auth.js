import api from '@/api'

export const login = data => {
  return api({
    url: '/api/login',
    method: 'post',
    data
  })
}

