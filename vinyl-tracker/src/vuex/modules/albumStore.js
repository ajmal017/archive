import axios from 'axios';

export default {
	namespaced: true,
	state: {
		discogApiBase: 'https://api.discogs.com/',
		searchResults: [],
		albums: [],
		album: {}
	},
	mutations: {
		SET_ALBUMS(state, albums) {
			state.albums = albums;
		},
		SET_ALBUM(state, album) {
			state.album = album;
		},
		SET_SEARCH_RESULTS(state, searchResults) {
			state.searchResults = searchResults;
		}
	},
	actions: {
		async fetchAlbums({ commit, rootState, rootGetters }) {
			const albumsRef = rootState.db.ref(`users/${rootGetters['auth/user'].uid}/albums`);
			const snap = await albumsRef.once('value');
			if (!snap.val()) return;
			const items = Object.keys(snap.val()).map(key => {
				const item = snap.val()[key];
				item._id = key;
				return item;
			});
			commit('SET_ALBUMS', items);
		},
		async fetchAlbum({ commit, rootState, rootGetters }, { id }) {
			const albumRef = rootState.db.ref(`users/${rootGetters['auth/user'].uid}/albums/${id}`);
			const snap = await albumRef.once('value');
			const album = snap.val();
			if (!album) return;
			album._id = id;
			commit('SET_ALBUM', album);
		},
		async addAlbum({ rootState, rootGetters }, { album }) {
			const albumsRef = rootState.db.ref(`users/${rootGetters['auth/user'].uid}/albums`);
			const result = await albumsRef.push(album);
			return result;
		},
		async updateAlbum({ rootState, rootGetters }, { id, album }) {
			if (album) album._id = null;
			const path = `users/${rootGetters['auth/user'].uid}/albums/${id}`;
			const albumRef = rootState.db.ref(path);
			const result = await albumRef.set(album);
			return result;
		},
		async fetchSearchResults({ state, commit }, { title, artist }) {
			const url = `${state.discogApiBase}/database/search`;
			const config = {
				params: {
					key: 'beViWEwonhfOBIQawRvO',
					secret: 'ojBYzSrmHvZZOZZKSAiIpAbexeFFvBYf',
					type: 'release',
					title,
					artist
				}
			};
			const response = await axios.get(url, config);
			commit('SET_SEARCH_RESULTS', response.data.results);
			return response.data;
		}
	},
	getters: {
		albums: state => state.albums,
		album: state => state.album,
		searchResults: state => state.searchResults
	}
};
