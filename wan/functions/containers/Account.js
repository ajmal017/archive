const createAccount = async (req, res) => {
	let body = req.body;
	console.log(`Account create called with:`, body);
	try {

		if (typeof body.firstName !== 'string') throw new Error('Accounts must have a string "firstName" property');
		if (typeof body.lastName !== 'string') throw new Error('Accounts must have a string "lastName" property');
		if (typeof body.email !== 'string') throw new Error('Accounts must have a string "email" property');

		const account = {
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email
		}

		const collection = admin.firestore().collection(collectionName);
		const result = await collection.doc(user.user_id).set(account);
		return res.set('Access-Control-Allow-Origin', '*').send(JSON.stringify(result.id));
	} catch (err) {
		return res.set('Access-Control-Allow-Origin', '*').status(400).send(err.message);
	}

};

module.exports = (expressApp) => {
	// unused as all endpoints require authorization currently
	expressApp.post('/account/create', create('users', build));

};
