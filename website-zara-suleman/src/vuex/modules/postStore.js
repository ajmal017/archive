export default {
	namespaced: true,
	state: {
		path: 'tblposts',
		posts: [],
		post: []
	},
	mutations: {
		SET_POSTS(state, posts) {
			state.posts = posts;
		},
		SET_POST(state, post) {
			state.post = post;
		}
	},
	actions: {
		async fetchList({ commit, state, rootState }) {
			const listRef = rootState.data.ref(state.path);
			const snap = await listRef.once('value');
			if (!snap.val()) return;
			const items = snap.val().map((item, i) => {
				item._id = i;
				return item;
			});
			commit('SET_POSTS', items);
		},
		async fetchDetail({ commit, state, rootState }, { id }) {
			const detailRef = rootState.data.ref(`${state.path}/${id}`);
			const snap = await detailRef.once('value');
			const detail = snap.val();
			commit('SET_POST', detail);
		}
	},
	getters: {
		posts: state => state.posts,
		post: state => state.post
	}
};
