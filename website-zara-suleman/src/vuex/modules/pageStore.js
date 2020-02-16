export default {
	namespaced: true,
	state: {
		path: 'tblpages',
		pages: [],
		page: []
	},
	mutations: {
		SET_PAGES(state, pages) {
			state.pages = pages;
		},
		SET_PAGE(state, page) {
			state.page = page;
		}
	},
	actions: {
		async fetchList({ commit, state, rootState }) {
			const listRef = rootState.data.ref(state.path);
			const snap = await listRef.once('value');
			if (!snap.val()) return;
			const items = Object.keys(snap.val()).map((key, i) => {
				const item = snap.val()[key];
				item._id = i;
				item.seoName = key;
				return item;
			});
			commit('SET_PAGES', items);
		},
		async fetchDetail({ commit, state, rootState }, { id }) {
			const detailRef = rootState.data.ref(`${state.path}/${id}`);
			const snap = await detailRef.once('value');
			const detail = snap.val();
			commit('SET_PAGE', detail);
		}
	},
	getters: {
		pages: state => state.pages,
		page: state => state.page
	}
};
