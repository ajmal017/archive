/**
 * Script.js is a file to allow easily modifying the entire existing database
 * This way we can populate new fields for data that has already been added
 * to the database.
 */

const firebase = require('firebase');
const firebaseConfig = require('../src/config').firebase;

const run = async () => {

	try {

		const app = firebase.initializeApp(firebaseConfig);
		const db = app.firestore();
		db.settings({ timestampsInSnapshots: true });

		await firebase.auth().signInWithEmailAndPassword(
			'',
			''
		);

		const collection = await db.collection('prescriptions').get(); // Highlight collection name (singular!) and press Ctrl+D to change all occurences

		const prescriptions = collection.docs.map(d => {
			return {
				...d.data(),
				_id: d.id
			}
		});

		prescriptions.forEach(prescription => {
			if (!prescription.clientId) prescription.clientId = 'dummy-data-1';
		});

		for (let i=0; i<prescriptions.length; i++) {
			const item = prescriptions[i];
			const id = item._id;
			delete item._id;
			await db.collection('prescriptions').doc(id).set(item);
		};

	} catch (err) {
		console.log('err: ', err);
	}

};

run();
