import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import VueRouter from "vue-router";

// 3rd Party Plugins
import '@/libs/toastification'

// Import Stylesheets
import "@/assets/css/styles.css";

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
