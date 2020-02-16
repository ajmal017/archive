import firebase from 'firebase';
import Cookies from 'js-cookie';
import VuexPersistence from 'vuex-persist';
import authStore from './modules/authStore';
import familyStore from './modules/familyStore';

// Firebase connection. Since this info is public it's important to have security rules set.
const firebaseConfig = {
	apiKey: 'AIzaSyDzTRBLcx0RbB7k-oJC8Y0vPP8B4leStb0',
	authDomain: 'family-tree-ad356.firebaseapp.com',
	databaseURL: 'https://family-tree-ad356.firebaseio.com',
	projectId: 'family-tree-ad356',
	storageBucket: 'family-tree-ad356.appspot.com',
	messagingSenderId: '918093315714'
};

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
		db,
		firebase
	},
	modules: {
		auth: authStore,
		family: familyStore
	},
	plugins: [
		vuexCookie.plugin
	]
};

export default store;

