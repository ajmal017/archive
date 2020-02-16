import familyRoutes from '../containers/Family';

const routes = [
	...familyRoutes,
	{
		path: '*',
		redirect: '/'
	}
];

export default routes;
