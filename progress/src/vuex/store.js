import firebase from 'firebase';
import Cookies from 'js-cookie';
import VuexPersistence from 'vuex-persist';

import accountStore from './modules/accountStore';
import tagStore from './modules/tagStore';
import postStore from './modules/postStore';
import commentStore from './modules/commentStore';

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
	restoreState: key => Cookies.getJSON(key),
	saveState: (key, state) => Cookies.set(key, state, {
		expires: 3
	}),
	modules: [
		'account'
	]
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
		account: accountStore,
		post: postStore,
		comment: commentStore,
		tag: tagStore
	},
	plugins: [
		vuexCookie.plugin
	]
};

export default store;

