import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  withCredentials: false,
  baseURL: 'http://api.localtyrematch.com:7788'
})

Vue.prototype.$http = axiosIns

export default axiosIns
