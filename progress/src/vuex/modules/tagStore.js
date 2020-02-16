export default {
	namespaced: true,
	state: {
		tags: null
	},
	mutations: {
		SET_TAGS(state, tags) {
			state.tags = tags;
		}
	},
	actions: {
		/**
		 * Fetches a user's tags from the database
		 * @param id the ID of the user's tags being fetched
		 * @returns a list of tags (strings)
		 */
		async fetchTags({ commit, rootState, rootGetters }) {
			const userId = rootGetters['account/user']._id;
			const path = `users/${userId}/tags`;
			const tagsRef = await rootState.db.ref(path);
			const snap = await tagsRef.once('value');
			const tags = snap.val();
			commit('SET_TAGS', tags);
			return tags;
		},
		async addTag({ dispatch, rootState, rootGetters }, tag) {
			const userId = rootGetters['account/user']._id;
			const path = `users/${userId}/tags`;
			const tagsRef = await rootState.db.ref(path);
			await tagsRef.push(tag);
			const tags = await dispatch('fetchTags');
			return tags;
		},
		async removeTag({ state, dispatch, rootState, rootGetters }, tag) {
			const userId = rootGetters['account/user']._id;
			const tagId = Object.keys(state.tags).find(k => state.tags[k] === tag);
			const path = `users/${userId}/tags/${tagId}`;
			const tagsRef = await rootState.db.ref(path);
			await tagsRef.set(null);
			const tags = await dispatch('fetchTags');
			return tags;
		}
	},
	getters: {
		tags: state => state.tags
	}
};
