import axios from 'axios'

const BASE_URL = 'https://693875594618a71d77d05788.mockapi.io/mi-proyecto/v1/' 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
