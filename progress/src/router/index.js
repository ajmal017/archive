import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

export default new Router({
	mode: 'history',	// this removes # from the url
	routes: [
		...routes,
		{
			path: '/', redirect: '/posts'
		},
		{
			path: '*', redirect: '/'
		}
	]
});
