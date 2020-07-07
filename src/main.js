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
import BootstrapVue from "bootstrap-vue";
import Axios from "axios";
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import VueNotifications from 'vue-notifications';
import swal from 'sweetalert';

function toast ({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return swal(title, message, type)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(Vuelidate, Axios, BootstrapVue, VueBootstrapTypeahead, VueNotifications, options)
Vue.config.productionTip = false;
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
