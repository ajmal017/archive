const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { validateFirebaseIdToken } = require('./middlewares/Authorization');
const ErrorHandlerMiddleware = require('./middlewares/ErrorHandler');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(validateFirebaseIdToken);

app.use('/account', routes.AccountController);

app.use(ErrorHandlerMiddleware);

module.exports = app;