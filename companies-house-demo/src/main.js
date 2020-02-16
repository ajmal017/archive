import Vue from 'vue';

import Vuex from 'vuex';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import axios from 'axios';
import VueAxios from 'vue-axios';

import storeConfig from './vuex/storeConfig';
import router from './router';
import App from './App';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);

const store = new Vuex.Store(storeConfig);

new Vue({	// eslint-disable-line no-new
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
});
