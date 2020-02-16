const admin = require('firebase-admin');
const url = require('url');

const getAuthorName = async (authorId) => {
	const authorData = await admin.firestore()
		.collection('users')
		.doc(authorId)
		.get();
	const author = authorData.data();
	const authorName = `${author.firstName} ${author.lastName}`
	return authorName;
}

const get = (collectionName) => {
	return async (req, res) => {
		const request = url.parse(req.url, true);
		console.log(`${collectionName} get called with:`, request);

		const user = req.user;
		const id = req.params.id;

		const item = await admin.firestore()
			.collection(collectionName)
			.doc(id)
			.get();

		let result = item.data();
		if (!result) res.set('Access-Control-Allow-Origin', '*').status(404).send(result);

		if (result.authorId !== user.user_id) throw new Error('Unauthorized');
		const authorName = await getAuthorName(result.authorId);

		result = {
			...result,
			id,
			authorName
		}
		return res.set('Access-Control-Allow-Origin', '*').send(result);

	}

};
exports.get = get;

const list = (collectionName) => {
	return async (req, res) => {
		const request = url.parse(req.url, true);
		console.log(`${collectionName} list called with:`, request);

		const user = req.user;
		const limit = parseInt(request.query.limit) || 10;
		const skip = parseInt(request.query.skip) || 0;
		const sortBy = request.query.sortBy || 'createdAt';

		const ref = admin.firestore().collection(collectionName);
		if (!ref) return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify([]));
		const shallow = await ref.select(sortBy)
			.where("authorId", "==", user.user_id)
			.orderBy(sortBy, "desc")
			.get();
		const keys = shallow.docs.map(doc => doc.data()[sortBy]);

		if (keys.length === 0) return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify([]));

		const collection = await admin.firestore().collection(collectionName)
			.where("authorId", "==", user.user_id)
			.orderBy(sortBy, "desc")
			.startAt(keys[skip])
			.limit(limit)
			.get();

		const promises = collection.docs.map(async doc => {
			let result = doc.data();
			const authorName = await getAuthorName(result.authorId);

			return {
				...doc.data(),
				id: doc.id,
				authorName
			};
		});

		const result = await Promise.all(promises);

		return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify(result));
	};
};
exports.list = list;

const count = (collectionName) => {
	return async (req, res) => {
		console.log(`${collectionName} count called with:`, req)
		const ref = admin.firestore().collection(collectionName)
			.where("authorId", "==", req.user.user_id);
		if (!ref) return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify(0));
		const shallow = await ref.select().get();
		const count = shallow.size;
		return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify(count));
	};
};
exports.count = count;

const create = (collectionName, modifier) => {
	return async (req, res) => {
		let body = req.body;
		console.log(`${collectionName} create called with:`, body);
		try {
			if (modifier) body = modifier(body, req);
			const collection = admin.firestore().collection(collectionName);
			const result = await collection.add(body);
			return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify(result.id));
		} catch (err) {
			return res.set('Access-Control-Allow-Origin', '*').status(400).send(err.message);
		}

	};
};
exports.create = create
