
import Edit from './Edit';
import List from './List';
import Detail from './Detail';

const routes = [
	{
		name: 'post.add',
		path: '/posts/add',
		component: Edit
	},
	{
		name: 'post.edit',
		path: '/posts/:id/edit',
		component: Edit
	},
	{
		name: 'post.detail',
		path: '/posts/:id',
		component: Detail
	},
	{
		name: 'post.list',
		path: '/posts',
		component: List
	}
];

export default routes;
