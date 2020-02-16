import firebase from 'firebase';
import { IEXClient } from 'iex-api';
import * as _fetch from 'isomorphic-fetch';

// iex integrations inspired by: https://github.com/bilalq/iex-api
const iex = new IEXClient(_fetch);

const firebaseConfig = {
	apiKey: 'AIzaSyBztQ_DLKTJg_EGYv0aUpMxKOGjKTkrfLk',
	authDomain: 'bitcoininfo-82465.firebaseapp.com',
	databaseURL: 'https://bitcoininfo-82465.firebaseio.com',
	projectId: 'bitcoininfo-82465',
	storageBucket: 'bitcoininfo-82465.appspot.com',
	messagingSenderId: '777926831'
};
const app = firebase.initializeApp(firebaseConfig);
const db = app.database();
const emailsRef = db.ref('emails');

const store = {
	state: {
		iex,
		emailsRef,
		submitted: false
	},
	mutations: {
		SET_SUBMITTED(state, submitted) {
			state.submitted = submitted;
		}
	},
	actions: {
		async pushEmail({ state, commit }, email) {
			console.warn(`Submitting ${email} to firebase...`);	// eslint-disable-line no-console
			if (!email) return null;
			const response = await state.emailsRef.push(email);
			commit('SET_SUBMITTED', true);
			return response;
		},
		async getCompany({ state }, companyName) {
			const result = await state.iex.stockCompany(companyName);
			return result;
		}
	},
	getters: {
		submitted: state => state.submitted
	}
};

export default store;
