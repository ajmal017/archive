const admin = require('firebase-admin');
// const validateInternalCall = require('../middleware/validateInternalCall');

exports.get = (collectionName, modifier) => {
	return async (req, res) => {
		// console.log(`> ${collectionName} get called with:`, req);

		const id = req.params.id;

		const item = await admin.firestore()
			.collection(collectionName)
			.doc(id)
			.get();

		let result = item.data();
		if (!result) res.set('Access-Control-Allow-Origin', '*').status(404).send(result);

		result = {
			...result,
			_id: id,
		}

		if (modifier) result = await modifier(result, req);

		return res.set('Access-Control-Allow-Origin', '*').send(result);

	}

};

exports.list = (collectionName, modifier) => {
	return async (req, res) => {
		// console.log(`> ${collectionName} list called with:`, req);

		const limit = parseInt(req.parsed.query.limit) || 10;
		const skip = parseInt(req.parsed.query.skip) || 0;
		const sortBy = req.parsed.query.sortBy || 'createdAt';


		const ref = admin.firestore().collection(collectionName);
		if (!ref) return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify([]));
		let shallow = ref.select(sortBy);
		shallow = shallow.orderBy(sortBy, "desc")
		shallow = await shallow.get();
		const keys = shallow.docs.map(doc => doc.data()[sortBy]);

		if (keys.length === 0) return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify([]));

		let collection = admin.firestore().collection(collectionName)
		collection = collection.orderBy(sortBy, "desc")
		collection = collection.startAt(keys[skip])
		collection = collection.limit(limit)
		collection = await collection.get();

		let results = [];
		for (let i=0; i<collection.docs.length; i++) {
			const doc = collection.docs[i];
			let result = doc.data();
			if (modifier) result = await modifier(result, req);
			results.push({
				...result,
				_id: doc.id
			});
		}

		return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify(results));
	};
};

exports.count = (collectionName) => {
	return async (req, res) => {
		// console.log(`> ${collectionName} count called with:`, req)
		let ref = admin.firestore().collection(collectionName);
		if (!ref) return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify(0));
		const shallow = await ref.select().get();
		const count = shallow.size;
		return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify(count));
	};
};

exports.create = (collectionName, modifier) => {
	return async (req, res) => {
		let body = req.body;
		// console.log(`> ${collectionName} create called with:`, req, body);
		try {
			if (modifier) body = await modifier(body, req);
			const collection = admin.firestore().collection(collectionName);
			const result = await collection.add({
				...body,
				_createdAt: new Date().toISOString(),
				// _authorId: req.user.user_id
			});
			return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify(result.id));
		} catch (err) {
			return res.set('Access-Control-Allow-Origin', '*').status(400).send(err.message);
		}
	};
};

exports.update = (collectionName, modifier) => {
	return async (req, res) => {
		// validateInternalCall(req);
		let body = req.body;
		const id = req.params.id;
		// console.log(`> ${collectionName} update called with:`, body);
		try {
			if (modifier) body = await modifier(body, req);
			const doc = admin.firestore().collection(collectionName).doc(id);
			await doc.update({
				body,
				_updatedAt: newDate().toISOString()
			});
			return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify(body));
		} catch (err) {
			return res.set('Access-Control-Allow-Origin', '*').status(400).send(err.message);
		}
	};
};

exports.remove = (collectionName, modifier) => {
	return async (req, res) => {
		// validateInternalCall(req);
		const id = req.params.id;
		// console.log(`> ${collectionName} update called with:`, req);
		try {
			if (modifier) await modifier(req);
			const doc = admin.firestore().collection(collectionName).doc(id);
			await doc.delete();
			return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify(id));
		} catch (err) {
			return res.set('Access-Control-Allow-Origin', '*').status(400).send(err.message);
		}
	};
};