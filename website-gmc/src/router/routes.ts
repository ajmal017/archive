
import landingRoutes from '../containers/Landing';
import strategyRoutes from '../containers/Strategy';
import newsetterRoutes from '../containers/Newsletter';
import aboutRoutes from '../containers/About';
/* tslint-disable */

const routes = [
	...landingRoutes,
	...strategyRoutes,
	...newsetterRoutes,
	...aboutRoutes,
	{
		path: '*',
		redirect: { name: 'landing.page' }
	},

];

export default routes;
/* tslint-enable */
