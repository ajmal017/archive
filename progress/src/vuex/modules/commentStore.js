const ref = '/comments';

export default {
	namespaced: true,
	state: {
		comments: []		// list of comments currently stored in memory
	},
	mutations: {
		SET_COMMENTS(state, comments) {
			state.comments = comments;
		}
	},
	actions: {
		/**
		 * Builds a comment object from raw data from the database
		 * @param comment the raw comment object from the datatbase
		 * @param id the id of this comment
		 */
		async buildCommentForUI({ dispatch }, { comment, id, postId }) {
			if (!comment) return null;
			comment._id = id;
			comment.postId = postId;
			let user = await dispatch('account/fetchUserById', comment.authorId, { root: true });
			if (!user) user = { username: 'Unknown' };
			comment.user = user;
			return comment;
		},
		/**
		 * Pushes a post to the post array with a generated id
		 * @param {String} postId the id of the post being commented on
		 * @param {String} comment the comment to be uploaded
		 */
		async submitComment({ rootState, rootGetters }, { postId, content }) {
			const uid = rootGetters['account/user']._id;
			const payload = {
				content,
				authorId: uid
			};
			const path = `/${ref}/${postId}`;
			const result = await rootState.db.ref(path).push(payload);
			return result;
		},
		/**
		 * Updates the comment with ID matching this comment's ._id property in the database
		 * @param comment the new comment object to be uploaded
		 */
		async updateComment({ rootState }, comment) {
			const path = `${ref}/${comment._id}`;
			// #Todo: look at using an update rather than replace endpoint for updates, so as to only send data we wish to change
			const result = await rootState.db.ref(path).set(comment);
			return result;
		},
		/**
		 * Fetches the list of comments from the database
		 * @param {String} postId the id of the post who's comments you wish to load
		 * @returns array of comment objects
		 */
		async fetchList({ commit, dispatch, rootState }, postId) {
			const path = `/${ref}/${postId}`;
			const commentsRef = rootState.db.ref(path);
			const snap = await commentsRef.once('value');
			let commentsData = snap.val();
			if (!commentsData) return [];
			commentsData = Object.keys(commentsData).map(async key => {
				const commentData = commentsData[key];
				const post = await dispatch('buildCommentForUI', { comment: commentData, id: key, postId });
				return post;
			});
			let comments = await Promise.all(commentsData);
			comments = comments.reverse();
			commit('SET_COMMENTS', comments);
			return comments;
		}
	},
	getters: {
		comments: state => state.comments
	}
};
