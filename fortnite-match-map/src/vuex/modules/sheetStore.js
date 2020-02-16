import axios from 'axios';

// https://docs.google.com/spreadsheets/d/1PbaDtpUbvGf8zI2yySUF9nOq5LakPdVkryrxScW9diQ/edit#gid=0
const SpreadSheetId = '1PbaDtpUbvGf8zI2yySUF9nOq5LakPdVkryrxScW9diQ';

export default {
	namespaced: true,
	state: {
		sheet: null
	},
	mutations: {
		SET_SHEET(state, sheet) {
			state.sheet = sheet;
		}
	},
	actions: {
		async fetchSheet({ commit, rootGetters }, range) {
			const accessToken = rootGetters['auth/accessToken'];
			const url = `https://sheets.googleapis.com/v4/spreadsheets/${SpreadSheetId}/values/${range}`;
			const config = {
				headers: {
					authorization: `Bearer ${accessToken}`
				}
			};
			const response = await axios.get(url, config);
			const sheet = response.data;
			commit('SET_SHEET', sheet);
			return sheet;
		}
	},
	getters: {
		sheet: state => state.sheet
	}
};
