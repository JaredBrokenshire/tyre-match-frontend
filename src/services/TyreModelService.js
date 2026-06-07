import axios from "@/libs/axios"
import HelperService from "@/services/HelperService";

const baseURL = "/tyre-models"

export default {
  list(filters) {
    const queryString = HelperService.buildSearchQueryString(filters)
    return axios.get(`${baseURL}${queryString}`)
  },
  get(id) {
    return axios.get(`${baseURL}/${id}`)
  },
  create(dto) {
    return axios.post(`${baseURL}`, dto)
  },
  uploadImage(id, file) {
    const formData = new FormData()
    formData.append('file', file)

    return axios.post(`${baseURL}/${id}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  },
  update(id, dto) {
    return axios.patch(`${baseURL}/${id}`, dto)
  },
  delete(id) {
    return axios.delete(`${baseURL}/${id}`)
  }
}
