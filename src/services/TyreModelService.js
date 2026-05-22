import axios from "@/libs/axios"
import HelperService from "@/services/HelperService";

const baseURL = "/tyre-models"

export default {
  list(filters) {
    const queryString = HelperService.buildSearchQueryString(filters)
    return axios.get(`${baseURL}${queryString}`)
  },
  create(dto) {
    return axios.post(`${baseURL}`, dto)
  }
}
