const functions = require('firebase-functions');
const admin = require('firebase-admin');
const api = require('./api');

admin.initializeApp(functions.config().firebase);

exports.api = functions.https.onRequest(api);