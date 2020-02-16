// USED BY TAMIAT CMS

import firebase from 'firebase';
import { mediaRef } from '../../admin/firebase_config';

export default {
	methods: {
		async uploadImage(e) {
			const file = e.target.files[0];
			const storageRef = firebase.storage().ref(`images/${file.name}`);

			const snapshot = await storageRef.put(file);

			this.createNewMedia(snapshot);
			this.insertImageIntoDOM(snapshot.downloadURL);
		},
		createNewMedia(snapshot) {
			mediaRef.push({
				src: snapshot.downloadURL,
				path: snapshot.ref.fullPath,
				name: snapshot.metadata.name
			});
		},
		insertImageIntoDOM(url) {
			const img = document.createElement('img');
			img.src = url;
			document.getElementsByClassName('ql-editor')[0].appendChild(img);
		}
	}
};
