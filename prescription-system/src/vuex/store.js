import firebase from 'firebase';
import VuexPersistence from 'vuex-persist';

import { firebase as firebaseConfig } from '../config';
import accountStore from './modules/AccountStore';
import templateStore from './modules/TemplateStore';
import prescriptionStore from './modules/PrescriptionStore';

// Create a persisted state cookie
const vuexCookie = new VuexPersistence({
	supportCircular: true,
	modules: [
		'account',
	],

});

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
db.settings({ timestampsInSnapshots: true });

const store = {
	state: {
		firebase,
		db
	},
	modules: {
		account: accountStore,
		template: templateStore,
		prescription: prescriptionStore
	},
	plugins: [
		vuexCookie.plugin
	]
};

export default store;

