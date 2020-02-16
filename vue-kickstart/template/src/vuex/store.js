import firebase from 'firebase';
import VuexPersistence from 'vuex-persist';

import accountStore from './modules/accountStore';

// Firebase connection. Since this info is public it's important to have security rules set.
const firebaseConfig = {
	apiKey: 'AIzaSyC5e-Fl6TwKI30gdujH9PWjV1YxeG6xug8',
	authDomain: 'progress-7fe72.firebaseapp.com',
	databaseURL: 'https://progress-7fe72.firebaseio.com',
	projectId: 'progress-7fe72',
	storageBucket: 'progress-7fe72.appspot.com',
	messagingSenderId: '205321402463'
};

// Set Google as our authentication provider
const provider = new firebase.auth.GoogleAuthProvider();

// Create a persisted state cookie
const vuexCookie = new VuexPersistence({
	modules: [
		'account',	]
});

const app = firebase.initializeApp(firebaseConfig);
const db = app.database();

const store = {
	state: {
		firebase,
		db,
		provider
	},
	modules: {
		account: accountStore
	},
	plugins: [
		vuexCookie.plugin
	]
};

export default store;

