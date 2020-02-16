import postRoutes from '../containers/Post';
import userRoutes from '../containers/User';

const routes = [
	...postRoutes,
	...userRoutes
];

export default routes;
