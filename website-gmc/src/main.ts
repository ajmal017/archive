import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueYoutube from 'vue-youtube';
import VueScrollTo from 'vue-scrollto';
import theme from './styles/theme';
import App from './App.vue';
import router from './router/index';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Vuetify, { theme });
Vue.use(VueYoutube);
Vue.use(VueScrollTo, { offset: -61, duration: 800, });

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
