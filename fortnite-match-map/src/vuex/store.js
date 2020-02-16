import firebase from 'firebase';
import Cookies from 'js-cookie';
import VuexPersistence from 'vuex-persist';
import authStore from './modules/authStore';
import sheetStore from './modules/sheetStore';
import matchStore from './modules/matchStore';

// Firebase connection. Since this info is public it's important to have security rules set.
const firebaseConfig = {
	apiKey: 'AIzaSyC7lG9ERSVMObPfFpw0n5Ooe3CkhczEzC4',
	authDomain: 'fortnite-tracker-89f5f.firebaseapp.com',
	databaseURL: 'https://fortnite-tracker-89f5f.firebaseio.com',
	projectId: 'fortnite-tracker-89f5f',
	storageBucket: 'fortnite-tracker-89f5f.appspot.com',
	messagingSenderId: '402824196922'
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets.readonly');

// Create a persisted state cookie
const vuexCookie = new VuexPersistence({
	restoreState: key => Cookies.getJSON(key),
	saveState: (key, state) => Cookies.set(key, state, {
		expires: 3
	}),
	modules: ['auth'] // only save user module
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
		auth: authStore,
		sheet: sheetStore,
		match: matchStore
	},
	plugins: [
		vuexCookie.plugin
	]
};

export default store;

