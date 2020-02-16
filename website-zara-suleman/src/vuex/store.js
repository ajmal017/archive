import firebase from 'firebase';
import pageStore from './modules/pageStore';
import postStore from './modules/postStore';
import menuStore from './modules/menuStore';

const firebaseConfig = {
	apiKey: 'AIzaSyBJ9e8sQ78dKNroWWjFVbuDwk-FtlFTjIA',
	authDomain: 'zahrasuleman-62957.firebaseapp.com',
	databaseURL: 'https://zahrasuleman-62957.firebaseio.com',
	projectId: 'zahrasuleman-62957',
	storageBucket: 'zahrasuleman-62957.appspot.com',
	messagingSenderId: '963569278667'
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.database();

const store = {
	state: {
		data: db
	},
	modules: {
		page: pageStore,
		post: postStore,
		menu: menuStore
	}
};

export default store;
