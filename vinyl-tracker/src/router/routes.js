import albumsRoutes from '../containers/Albums';

const routes = [
	{
		path: '/',
		redirect: '/albums'
	},
	...albumsRoutes
];

export default routes;
