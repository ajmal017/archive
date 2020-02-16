import Edit from './Edit';
import Detail from './Detail';

const routes = [
	{
		name: 'user.create',
		path: '/account/create',
		component: Edit
	},
	{
		name: 'user.edit',
		path: '/account/edit',
		component: Edit
	},
	{
		name: 'user.detail',
		path: '/user/:id',
		component: Detail
	}
];

export default routes;
