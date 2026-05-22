import axios from "@/libs/axios"
import HelperService from "@/services/HelperService";

const baseURL = "/tyre-impressions"

export default {
  list(filters) {
    const queryString = HelperService.buildSearchQueryString(filters)
    return axios.get(`${baseURL}${queryString}`)
  },
  upload(file) {
    const formData = new FormData();
    formData.append("file", file)
    
    return axios.post(`${baseURL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
  }
}