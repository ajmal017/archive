const ref = '/posts';


export default {
	namespaced: true,
	state: {
		posts: [],		// list of posts currently stored in memory
		post: null		// individual post currently stored in memory
	},
	mutations: {
		SET_POST(state, post) {
			state.post = post;
		},
		SET_POSTS(state, posts) {
			state.posts = posts;
		}
	},
	actions: {
		/**
		 * Builds a post object from raw data from the database
		 * @param post the raw post object from the datatbase
		 * @param id the id of this post
		 */
		async buildPostForUI({ dispatch }, { post, id }) {
			if (!post) return null;
			post._id = id;
			// eslint-disable-next-line prefer-const
			let [user, comments] = await Promise.all([
				dispatch('account/fetchUserById', post.authorId, { root: true }),
				dispatch('comment/fetchList', post._id, { root: true })
			]);
			if (!user) user = { username: 'Unknown' };
			post.user = user;
			post.comments = comments;
			if (!post.tags) post.tags = [];
			return post;
		},
		/**
		 * Builds a post preview object from raw data from the database
		 * @param post the raw post object from the datatbase
		 * @param id the id of this post
		 */
		async buildPostPreviewForUI({ dispatch }, { post, id }) {
			if (!post) return null;
			post._id = id;
			// eslint-disable-next-line prefer-const
			let user = await dispatch('account/fetchUserById', post.authorId, { root: true });
			if (!user) user = { username: 'Unknown' };
			post.user = user;
			if (!post.tags) post.tags = [];
			return post;
		},
		/**
		 * Pushes a post to the post array with a generated id
		 * @param {Object} post the post to be uploaded
		 * @returns {String} the new results _id value
		 */
		async submitPost({ rootState, rootGetters }, post) {
			const uid = rootGetters['account/user']._id;
			const payload = post;
			payload.authorId = uid;
			const result = await rootState.db.ref(ref).push(payload);
			return result.key;
		},
		/**
		 * Delete a post from the post array with a generated id
		 * @param {Object} post the post to be uploaded
		 */
		async deletePost({ rootState }, { id }) {
			const path = `${ref}/${id}`;
			await rootState.db.ref(path).remove();
		},
		/**
		 * Updates the post with ID matching this post's ._id property in the database
		 * @param post the new post object to be uploaded
		 */
		async updatePost({ rootState }, post) {
			const path = `${ref}/${post._id}`;
			const result = await rootState.db.ref(path).set(post);
			return result;
		},
		/**
		 * Fetches the list of posts from the database
		 * @returns array of post objects
		 *
		 * #Todo: look into warning recommending we use 'indexOn' in our security rules to save data with 'orderByChild'
		 */
		async fetchPosts({ commit, dispatch, rootState }, options) {
			let config = {
				parentId: false,
				authorId: false,
				preview: false
			};
			if (options) config = options;
			let postsData;
			const postsRef = rootState.db.ref(ref);
			let snap;
			// fetch data according to given options (#Todo: needs improvement, can't query well by order & parent or by tags at all)
			if (config.parentId) {
				if (config.authorId) {
					snap = await postsRef.orderByChild('parentId').equalTo(config.parentId)
						.orderByChild('authorId').equalTo(config.authorId)
						.once('value');
				} else {
					snap = await postsRef.orderByChild('parentId').equalTo(config.parentId)
						.once('value');
				}
			} else if (config.authorId) {
				snap = await postsRef.orderByChild('authorId').equalTo(config.authorId)
					.once('value');
			} else {
				snap = await postsRef.once('value');
			}
			postsData = snap.val();
			if (!postsData) return [];
			// cast posts into expected format
			postsData = Object.keys(postsData).map(async key => {
				const postData = postsData[key];
				let post;
				if (config.preview) {
					post = await dispatch('buildPostPreviewForUI', { post: postData, id: key });
				} else {
					post = await dispatch('buildPostForUI', { post: postData, id: key });
				}
				return post;
			});
			let posts = await Promise.all(postsData);
			posts = posts.reverse();
			commit('SET_POSTS', posts);
			return posts;
		},
		/**
		 * Fetches a post from the database
		 * @param id the ID of the post being fetched
		 * @returns a post object
		 */
		async fetchDetail({ commit, rootState, dispatch }, id) {
			const path = `${ref}/${id}`;
			const postRef = rootState.db.ref(path);
			const snap = await postRef.once('value');
			const postData = snap.val();
			const post = await dispatch('buildPostForUI', { post: postData, id });
			commit('SET_POST', post);
			return post;

		}
	},
	getters: {
		post: state => state.post,
		posts: state => state.posts
	}
};
