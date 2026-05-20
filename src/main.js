import Vue from "vue";
import App from "./App.vue";

// Import Stylesheets
import "@/assets/css/styles.css";
import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
