import axios from "@/libs/axios"
import HelperService from "@/services/HelperService";

const baseURL = "/tyre-impressions"

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
  upload(id, file) {
    const formData = new FormData();
    formData.append("file", file)

    return axios.post(`${baseURL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
  }
}