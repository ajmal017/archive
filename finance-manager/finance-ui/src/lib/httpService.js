import axios from 'axios';
import firebase from 'firebase';

export default {
	async request(axiosConfig) {
		const token = await firebase.auth().currentUser.getIdToken();
		axios.defaults.headers.common.authorization = `Bearer ${token}`;
		const result = axios.request(axiosConfig);
		return result;
	},
};
