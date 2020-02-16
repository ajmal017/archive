import Page from './Page';
import List from './components/List';
import Detail from './components/Detail';
import Tree from './components/Tree';

const routes = [
	{
		path: '/',
		component: Page,
		children: [
			{
				path: '/',
				redirect: '/list'
			},
			{
				name: 'family.list',
				path: '/list',
				component: List
			},
			{
				name: 'family.detail',
				path: '/detail/:id',
				component: Detail
			},
			{
				name: 'family.tree',
				path: '/tree/:id',
				component: Tree
			}
		]
	}
];

export default routes;
