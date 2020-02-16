import firebase from 'firebase';
import Cookies from 'js-cookie';
import VuexPersistence from 'vuex-persist';
import authStore from './modules/authStore';

// Firebase connection. Since this info is public it's important to have security rules set.
const firebaseConfig = {
	apiKey: 'AIzaSyALC3EbbJlOwUDEDGXV13dk3bjzgC7Rz_g',
	authDomain: 'food-blog-36e6d.firebaseapp.com',
	databaseURL: 'https://food-blog-36e6d.firebaseio.com',
	projectId: 'food-blog-36e6d',
	storageBucket: 'food-blog-36e6d.appspot.com',
	messagingSenderId: '650543859673'
};

// Set Google as our authentication provider
const provider = new firebase.auth.GoogleAuthProvider();

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
		auth: authStore
	},
	plugins: [
		vuexCookie.plugin
	]
};

export default store;

