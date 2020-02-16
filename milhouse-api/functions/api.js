const express = require('express');
const cors = require('cors');
const url = require('url');
const functions = require('firebase-functions');
const { validateFirebaseIdToken } = require('./middleware/authorization');
const setupChores = require('./containers/Chores');

const app = express();


app.use(cors({ origin: true }));

const parseUrl = (req, res, next) => {
	const parsed = url.parse(req.url, true);
	req.parsed = parsed;
	return next();
};

// app.use(validateFirebaseIdToken);
app.use(parseUrl);

setupChores(app);

module.exports = functions.https.onRequest(app)