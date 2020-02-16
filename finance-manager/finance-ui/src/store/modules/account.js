/* eslint-disable no-param-reassign */
import config from '../../config';
import httpService from '../../lib/httpService';

export default {
	namespaced: true,
	state: {
		account: null,
		user: null,
		token: null,
	},
	mutations: {
		SET_ACCOUNT(state, data) {
			if (!data) {
				state.account = null;
			} else {
				state.account = data;
			}
		},
		SET_USER(state, result) {
			state.user = result;
		},
		SET_TOKEN(state, result) {
			state.token = result;
		},
	},
	actions: {
		async createAccount({ state, commit, rootState }) {
			const result = await rootState.firebase.auth().signInWithPopup(rootState.provider);
			commit('SET_ACCOUNT', result);
			const token = await rootState.firebase.auth().currentUser.getIdToken();
			commit('SET_TOKEN', token);
			const user = await httpService.request({
				url: `${config.apiBase}/account`,
				method: 'POST',
				data: state.account,
			});
			commit('SET_USER', user);
			return user;
		},
		async logIn({ commit, rootState }) {
			const result = await rootState.firebase.auth()
				.signInWithPopup(rootState.provider);
			commit('SET_ACCOUNT', result);
			const token = await rootState.firebase.auth().currentUser.getIdToken();
			commit('SET_TOKEN', token);
			const user = await httpService.request({
				url: `${config.apiBase}/account`,
				method: 'GET',
			});
			if (!user) throw new Error('no user found');
			commit('SET_USER', user);
			return user;
		},
		async logOut({ commit, rootState }) {
			const success = await rootState.firebase.auth().signOut();
			commit('SET_ACCOUNT', null);
			commit('SET_TOKEN', null);
			commit('SET_USER', null);
			localStorage.clear();
			window.location.reload();
			return success;
		},
	},
	getters: {
		account: state => state.account,
		token: state => state.token,
		user: state => state.user,
	},
};
