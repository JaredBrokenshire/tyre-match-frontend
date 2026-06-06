import axios from "@/libs/axios";

const baseURL = "/files"

export default {
  get(id) {
    return axios.get(`${baseURL}/${id}`, {
      responseType: "blob"
    })
  },
}