import _ from 'lodash';
import { contentsRef, routesRef } from '../../admin/firebase_config/index';
import contentFetch from '../../admin/mixins/contentFetch';

export default {
	mixins: [contentFetch],
	firebase: {
		routes: routesRef,
		contents: contentsRef
	},
	computed: {
		content() {
			const params = this.$route.params;
			let path = this.$route.path;
			if (params) {
				_.forIn(params, (value, key) => {
					path = path.replace(value, `:${key}`);
				});
			}
			const currentRoute = this.routes.filter(route => route.path === path)[0];
			const contentType = currentRoute.contentType;
			let contentId = null;
			if (currentRoute.content !== 'none' && currentRoute.content !== undefined) {
				if (_.has(params, 'id')) {
					contentId = params.id;
				} else {
					contentId = 'none';
				}
			}
			return this.selectContentByTypeAndId(contentType, contentId);
		}
	}
};
