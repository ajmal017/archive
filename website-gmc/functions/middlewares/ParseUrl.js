const url = require('url');

module.exports = (req, res, next) => {
	const parsed = url.parse(req.url, true);
	req.parsed = parsed;
	return next();
};