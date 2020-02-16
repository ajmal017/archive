import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		...routes,
		{
			path: '/', redirect: '/build/create'
		},
		{
			path: '*', redirect: '/'
		}
	]
});
