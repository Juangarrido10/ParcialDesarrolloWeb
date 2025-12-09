import api from './api'

const RESOURCE = '/products'

export default {
  list() {
    return api.get(RESOURCE)
  },
  get(id) {
    return api.get(`${RESOURCE}/${id}`)
  },
  create(payload) {
    return api.post(RESOURCE, payload)
  },
  update(id, payload) {
    return api.put(`${RESOURCE}/${id}`, payload)
  },
  delete(id) {
    return api.delete(`${RESOURCE}/${id}`)
  }
}
