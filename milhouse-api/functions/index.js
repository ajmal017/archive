// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const api = require('./api');

// initialise the database
admin.initializeApp(functions.config().firebase);

exports.api = functions.https.onRequest(api);