const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const { validateFirebaseIdToken } = require('./middleware/authorization');

const setupTemplates = require('./containers/Template');
const setupPrescriptions = require('./containers/Prescription');

// set express app as default export
// https://stackoverflow.com/a/21103523/9242579
const app = module.exports = express();

app.use(cors);
app.use(cookieParser);
app.use(validateFirebaseIdToken);

setupTemplates(app);
setupPrescriptions(app);
