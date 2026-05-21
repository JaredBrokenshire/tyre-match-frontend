import axios from "@/libs/axios"
import HelperService from "@/services/HelperService";

const baseURL = "/tyre-impressions"

export default {
  list(filters) {
    const queryString = HelperService.buildSearchQueryString(filters)
    return axios.get(`${baseURL}${queryString}`)
  }
}