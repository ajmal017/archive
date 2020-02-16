import accountRoutes from '../containers/Account';
import landingRoutes from '../containers/Landing';
import paymentRoutes from '../containers/Payments';


const routes = [
	...accountRoutes,
	...landingRoutes,
	...paymentRoutes,
	{
		path: '*',
		redirect: { name: 'landing.page' }
	}
];

export default routes;
