import accountRoutes from '../containers/Account';
import prescriptionTemplateroutes from '../containers/Template';
import prescriptionRoutes from '../containers/Prescription';

const routes = [
	...accountRoutes,
	...prescriptionTemplateroutes,
	...prescriptionRoutes,
	{
		path: '/',
		redirect: {
			name: 'template.list'
		}
	},
	{
		path: '*',
		redirect: '/'
	}
];

export default routes;
