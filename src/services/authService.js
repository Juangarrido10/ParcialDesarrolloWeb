import api from './api'

const RESOURCE = '/users' 

export default {
  async login(username, password) {
    
    const res = await api.get(`${RESOURCE}?username=${encodeURIComponent(username)}`)
    const users = res.data
    const user = users.find(u => u.password === password)
    if (user) {
      
      const token = btoa(`${user.username}:${Date.now()}`)
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      return { token, user }
    } else {
      throw new Error('Credenciales inválidas')
    }
  },
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || 'null')
  }
}
