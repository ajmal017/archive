import { routesRef } from '../admin/firebase_config/index';

const dynamicRoutes = {
	routes: [],
	getRoutes() {
		return new Promise(resolve => {
			routesRef.on('value', snapshot => {
				const routesObj = snapshot.val();
				const routesArr = [];
				Object.values(routesObj).forEach(route => {
					routesArr.push({
						path: route.path,
						component: route.template
					});
				});
				resolve([...routesArr]);
			});
		});
	},

	addDynamicComponents() {
		this.routes.forEach(route => {
			const template = route.component;
			route.component = () => import(`../app/templates/${template}.vue`);
		});
	},

	async addDynamicRoutesTo(router) {
		const loadedRoutes = await this.getRoutes();
		this.routes = [...loadedRoutes];
		this.addDynamicComponents();
		router.addRoutes(this.routes);
	}
};

export default dynamicRoutes;
