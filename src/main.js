import Vue from 'vue'
import App from './App.vue'

// manter estrutura
import axios from 'axios';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  store.state.interfacectrl.isLoading++;

  // não modificar se for acesso à outros servidores
  if(config.url.includes("http")){
    return config;
  }

  // tratamento de requisições autentificadas
  config.url = process.env.VUE_APP_API_URL+config.url;
  if(localStorage.token) {
    config.headers.common["Token"] = localStorage.token;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

//Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  store.state.interfacectrl.isLoading--;
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  store.state.interfacectrl.isLoading--;
  return Promise.reject(error);
});

Vue.config.productionTip = false;

import 'babel-polyfill';
import store from './store';

// import EditaMixins from "./mixed/vue-mix/EditaMixin";
import Routes from './router';

import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;

import Popper from 'popper.js';
window.Popper = window.Popper = Popper;

import moment from "moment";
window.moment = window.moment = moment;

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/material-dashboard.css';
import './assets/css/demo.css';
import './assets/css/theme.css';
import './assets/css/spinner.css';
import './assets/css/dumper.css';
import './assets/css/mensagens.css';

import './mixed/bootstrap-material-design';
import './mixed/bootstrap-notify';
import './mixed/bootstrap-datetimepicker';

moment.updateLocale('pt-br', {
  weekdaysMin : ["D", "S", "T", "Q", "Q", "S", "S"],
  weekdaysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
});

new Vue({
  render: h => h(App),
  router: Routes,
  store: store,
  mounted: function() {
    $('body').bootstrapMaterialDesign();

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

    //    Activate bootstrap-select
    $(".select").dropdown({
      "dropdownClass": "dropdown-menu",
      "optionClass": ""
    });

    $('.form-control').on("focus", function() {
      $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function() {
      $(this).parent(".input-group").removeClass("input-group-focus");
    });

    // remove class has-error for checkbox validation
    $('input[type="checkbox"][required="true"], input[type="radio"][required="true"]').on('click', function() {
      if ($(this).hasClass('error')) {
        $(this).closest('div').removeClass('has-error');
      }
    });
  },
  watch: {
    $route(to) {
      if(to.name !== "error") this.$store.commit('showMessages');
      if(to.name === "logout") {
        // temporario enquanto não crio uma tabela de sessões
        // para controlar multiplas conexões
        delete localStorage.token;
        Routes.push({ name: "login"});
      }
    }
  },
}).$mount('#app')

// lembrete: return Promise.resolve(Math.floor((price * taxRate) / 100));
