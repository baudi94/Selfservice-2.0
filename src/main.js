import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/axios";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from 'vuelidate';
import VueSweetalert2 from 'vue-sweetalert2'
import BootstrapVue from "bootstrap-vue";
import Axios from "axios";

Vue.use(Vuelidate, Axios, BootstrapVue, VueSweetalert2)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
