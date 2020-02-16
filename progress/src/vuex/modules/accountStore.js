// #Todo: look at how to best support offline funcitonality with the below import, specifically isConnected
import { isConnected, getOfflineUsers } from '../../lib/firebaseHelpers';

const ref = '/users';

export default {
	namespaced: true,
	state: {
		auth: null,		// the auth object returned from google's authentication
		user: null		// the user object from our database records
	},
	mutations: {
		SET_AUTH(state, auth) {
			state.auth = auth;
		},
		SET_USER(state, user) {
			state.user = user;
		}
	},
	actions: {
		/**
		 * Builds a user object from raw data from the database
		 * @param user the raw user object from the datatbase
		 * @param id the id of this user
		 */
		buildUserForUI(vuexParams, { user, id }) {
			if (!user) return null;
			if (!id) return null;
			user._id = id;
			return user;
		},
		/**
		 * Authorize with 3rd party authorisation and set this object to the auth object in state
		 */
		async authorize({ commit, rootState }) {
			const result = await rootState.firebase.auth().signInWithPopup(rootState.provider);
			const auth = result.user;
			commit('SET_AUTH', auth);
			return auth;
		},
		/**
		 * Authorizes with 3rd party auth then sets the loaded user object in memory
		 * @returns the authorized user object
		 */
		async logIn({ state, commit, dispatch, rootState }) {
			await dispatch('authorize');
			const path = `${ref}/${state.auth.uid}`;
			const userRef = await rootState.db.ref(path);
			const snap = await userRef.once('value');
			const userData = snap.val();
			const user = await dispatch('buildUserForUI', { user: userData, id: state.auth.uid });
			// redirect to create account page with parameter to indicate no registered error
			if (!user) window.location.replace('/account/create?notRegistered');
			commit('SET_USER', user);
			return user;
		},
		/**
		 * Logs out of 3rd party auth and sets the user and auth to null
		 */
		async logOut({ commit, rootState }) {
			const result = await rootState.firebase.auth().signOut();
			commit('SET_USER', null);
			commit('SET_AUTH', null);
			return result;
		},
		/**
		 * Creates a account after prompting authentication with google
		 * @param {*} account the account object containing the details of the new account
		 */
		async createAccount({ state, dispatch }, account) {
			await dispatch('authorize');
			const id = state.auth.uid;
			const user = await dispatch('buildUserForUI', { user: account, id });
			const result = await dispatch('updateUser', user);
			return result;
		},
		/**
		 * Updates the user with ID matching this user's ._id property in the database
		 * @param user the new user object to be uploaded
		 */
		async updateUser({ state, commit, rootState }, user) {
			const updatedUser = {
				...user,
				email: state.auth.email,
				photoURL: state.auth.photoURL
			};
			const path = `${ref}/${user._id}`;
			const result = await rootState.db.ref(path).set(updatedUser);
			commit('SET_USER', updatedUser);
			return result;
		},
		/**
		 * Fetches a user from the database
		 * @param id the ID of the user being fetched
		 * @returns a user object
		 */
		async fetchUserById({ dispatch, rootState }, id) {
			const path = `${ref}/${id}`;
			const userRef = await rootState.db.ref(path);
			const snap = await userRef.once('value');
			const userData = snap.val();
			const user = await dispatch('buildUserForUI', { user: userData, id });
			return user;
		}
	},
	getters: {
		user: state => state.user
	}
};
