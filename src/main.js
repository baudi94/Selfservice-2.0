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
//import VueNotifications from 'vue-notifications';
import VueSweetalert2 from 'vue-sweetalert2';
import VueSwal from 'vue-swal';
Vue.config.productionTip = false


Vue.use(Vuelidate, Axios, BootstrapVue, VueBootstrapTypeahead, VueSwal, VueSweetalert2)
Vue.config.productionTip = false;
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
