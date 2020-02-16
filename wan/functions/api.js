const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const { validateFirebaseIdToken } = require('./middleware/authorization');

const setupAccount = require('./containers/Account');
const setupPayments = require('./containers/Payment');

const app = module.exports = express(); // sets express app as default export: https://stackoverflow.com/a/21103523/9242579

app.use(cors);
app.use(cookieParser);
app.use(validateFirebaseIdToken);

setupPayments(app);
