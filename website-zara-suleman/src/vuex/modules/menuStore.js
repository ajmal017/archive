export default {
	namespaced: true,
	state: {
		path: 'tblmenu',
		items: [],
		item: []
	},
	mutations: {
		SET_ITEMS(state, items) {
			state.items = items;
		},
		SET_ITEM(state, item) {
			state.item = item;
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
			commit('SET_ITEMS', items);
		},
		async fetchDetail({ commit, state, rootState }) {
			const detailRef = rootState.data.ref(state.path);
			const snap = await detailRef.once('value');
			const detail = snap.val();
			commit('SET_ITEM', detail);
		}
	},
	getters: {
		items: state => state.items,
		item: state => state.item
	}
};
