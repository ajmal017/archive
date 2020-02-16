import Vue from 'vue';
import axios from 'axios';

// #TODO: remove below import and remove development locig in the getCompaniesSearch action
import stubData from './stubData.json';

const store = {
	state: {
		apiBase: 'https://api.companieshouse.gov.uk/',
		searchCompaniesApi: {
			url: 'search/companies',
			items: [],
			perPage: 20,
			total: 0,
			page: 1
		}
	},
	mutations: {
		SET_COMPANIES_SEARCH_API(state, update) {
			// Use Vue.set to assign properties to searchCompanies API since
			// property changes do not force vue to update the value globally
			Vue.set(state.searchCompaniesApi, 'items', update.items);
			Vue.set(state.searchCompaniesApi, 'total', update.total);
		}
	},
	actions: {
		async getCompaniesSearch({ state, dispatch, commit }, searchTerm) {
			const request = {
				url: state.searchCompaniesApi.url,
				params: {
					q: searchTerm,
					items_per_page: state.searchCompaniesApi.perPage,
					start_index: state.searchCompaniesApi.page
				}
			};

			// Development logic (to be removed when deployed to production)
			if (window.location.href.includes('localhost')) {
				commit('SET_COMPANIES_SEARCH_API', stubData);
				return;
			}

			dispatch('makeRequest', request).then(data => {
				commit('SET_COMPANIES_SEARCH_API', data);
			});
		},
		async makeRequest({ state }, request) {
			if (!localStorage.companiesHouseApiKey) {
				// eslint-disable-next-line no-alert
				alert('Ensure you\'ve set your API key as localStorage.companiesHouseApiKey in browser console!');
			}
			const url = state.apiBase + request.url;
			const config = {
				auth: {
					username: `${localStorage.companiesHouseApiKey}:`
				},
				params: request.params
			};
			const response = await axios.get(url, config);
			return response.data;
		}
	},
	getters: {
		searchCompaniesResults: state => state.searchCompaniesApi.items
	}
};

export default store;
