
import Page from './Page';
import List from './components/List';
import Detail from './components/Detail';

const routes = [
	{
		path: '/albums',
		component: Page,
		children: [
			{
				path: '/',
				redirect: '/list'
			},
			{
				path: '/list',
				name: 'album.list',
				component: List
			},
			{
				path: '/:id',
				name: 'album.detail',
				component: Detail
			}
		]

	}
];

export default routes;
