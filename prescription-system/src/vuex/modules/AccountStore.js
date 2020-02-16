const MODULE_NAME = 'users'

export default {
	namespaced: true,
	state: {
		auth: null,
		account: null,
		token: null
	},
	mutations: {
		SET_AUTH(state, data) {
			if (!data) {
				state.auth = null;
			} else {
				state.auth = data;
			}
		},
		SET_ACCOUNT(state, account) {
			if (!account) {
				state.account = null;
			} else {
				state.account = account;
			}
		},
		SET_TOKEN(state, result) {
			state.token = result;
		}
	},
	actions: {
		async signUp({ commit, dispatch, rootState }, { username, password, title, firstName, lastName }) {
			let result = await rootState.firebase.auth()
				.createUserWithEmailAndPassword(username, password);
			commit('SET_AUTH', result);
			const user = await rootState.db.collection(MODULE_NAME)
				.doc(result.user.uid)
				.set({
					title,
					firstName,
					lastName,
					email: username
				});
			dispatch('logIn', { username, password });
			return user;
		},
		/**
		 * Logs in with given credentials and stores these credentials.
		 * Call with {} to log in with last used credentials
		 * @param {String} username the user's username (email)
		 * @param {String} password the user's password
		 */
		async logIn({ commit, state, rootState }, { username, password }) {
			if (!username) username = state._username;
			if (!password) password = state._password;
			const result = await rootState.firebase.auth()
				.signInWithEmailAndPassword(username, password);
			state._username = username;
			state._password = password;
			commit('SET_AUTH', result);
			const accountRef = rootState.db.collection(MODULE_NAME)
				.doc(result.user.uid);
			const [snap, token] = await Promise.all([
				accountRef.get(),
				rootState.firebase.auth().currentUser.getIdToken()
			]);
			const account = { ...snap.data(), _id: result.user.uid };
			commit('SET_ACCOUNT', account);
			commit('SET_TOKEN', token);
			return account;
		},
		async logOut({ commit, rootState }) {
			const result = await rootState.firebase.auth()
				.signOut();
			commit('SET_AUTH', null);
			commit('SET_ACCOUNT', null);
			commit('SET_TOKEN', null);
			localStorage.clear();
			return result;
		}
	},
	getters: {
		account: state => state.account
	}
};
