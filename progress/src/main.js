import Vue from 'vue';
import Vuex from 'vuex';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import Notifications from 'vue-notification';
import VueMq from 'vue-mq';

import storeConfig from './vuex/store';
import router from './router';
import App from './App';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(Notifications);
Vue.use(VueMq, {
	breakpoints: {
		mobile: 768,
		tablet: 1024,
		desktop: Infinity
	}
});

const store = new Vuex.Store(storeConfig);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
});
