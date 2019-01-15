import Vue from 'vue';
import App from './App';
import store from './store';

import api from './utils/api';
import util from './utils/util';

Vue.config.productionTip = false;

Vue.prototype.$store = store;
Vue.prototype.API = api;
Vue.prototype.Util = util;

App.mpType = 'app';
const app = new Vue({
    store,
    ...App
})
app.$mount()