import firebase from 'firebase';
import Cookies from 'js-cookie';
import VuexPersistence from 'vuex-persist';
import authStore from './modules/authStore';
import albumStore from './modules/albumStore';

const firebaseConfig = {
	apiKey: 'AIzaSyAWGnEqKaHhssg77KA9K8M-JeEQt7vesFk',
	authDomain: 'vinyl-tracker.firebaseapp.com',
	databaseURL: 'https://vinyl-tracker.firebaseio.com',
	projectId: 'vinyl-tracker',
	storageBucket: 'vinyl-tracker.appspot.com',
	messagingSenderId: '399670249918'
};

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
		db
	},
	modules: {
		album: albumStore,
		auth: authStore
	},
	plugins: [
		vuexCookie.plugin
	]
};

export default store;
