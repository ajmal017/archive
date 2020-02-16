const { Router } = require('express');
const { getDocument, setDocument } = require('../../clients/FirebaseClient');

const router = Router();

router.post('/', async (req, res, next) => {
	try {
		const { user } = req;
		const result = await setDocument(`users/${user.uid}`, {
			_id: user.uid
		});
		return res.send(result);
	} catch (err) {
		return next(err);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const { uid } = req.user;
		const user = await getDocument(`users/${uid}`);
		if (!user) {
			throw new Error('no user found');
		}
		return res.send(user);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;