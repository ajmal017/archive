/* Adds webhooks for the buttons to hook onto and effect the firebase database */

const express = require('express');
const cors = require('cors');
const NewsletterController = require('./controllers/NewsletterController');
const YoutubeController = require('./controllers/YoutubeController');
const ParseUrl = require('./middlewares/ParseUrl');
const ErrorHandler = require('./middlewares/ErrorHandler');

const app = express();

app.use(cors({ origin: true }));
app.use(ParseUrl);

app.use('/newsletters', NewsletterController);
app.use('/youtube-info', YoutubeController);

app.use(ErrorHandler);

module.exports = app;