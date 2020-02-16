import accountRoutes from '../containers/account';

const routes = [
	...accountRoutes,
	{
		path: '*',
		redirect: { name: 'account.page' },
	},
];

export default routes;
