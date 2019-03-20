import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '../static/css/base.css';
import '../static/css/index.css';
import '../static/js/common.js';
import VueJsonp from 'vue-jsonp';
Vue.config.devtools = true;
Vue.config.productionTip = false;
Vue.use(VueJsonp);
Vue.prototype.Url = 'http://127.0.0.1/';


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
