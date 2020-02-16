import Vue from 'vue';
import Vuex from 'vuex';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import Notifications from 'vue-notification';
import VueAnalytics from 'vue-analytics';
import VueYoutube from 'vue-youtube'

import storeConfig from './vuex/store';
import router from './router';
import App from './App';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(Vuetify, {
	theme: {
		primary: '#00D5C3',
		secondary: '#ececec',
		accent: '#fbfbfb',
		error: '#dc3545',
		white: '#fff',
		grey: '#e0e0e0',
		'grey-dark': '#5A6277',
		yellow: '#eec215',
		blue: '#007bff', // bootstrap link default
		red: '#dc3545' // b
	}
});
Vue.use(Notifications);
Vue.use(VueAnalytics, {
	id: '#Todo: Replace me', // enter an id here to setup analytics
	router
});
Vue.use(VueYoutube);
Vue.component('icon', Icon)

const store = new Vuex.Store(storeConfig);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
});
