const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');

const getVideoDetails = async (req, res, next) => {
	try {

		let videoIds = req.parsed.query['videoIds[]'];
		if (typeof videoIds === 'string') videoIds = [videoIds];
		const requests = videoIds.map(id => {
			const url = `http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${id}&format=json`
			return axios.get(url);
		});
		const results = await Promise.all(requests);
		const response = results.map((r, i) => {
			return {
				title: r.data.title.trim(),
				thumbnailUrl: r.data.thumbnail_url,
				id: videoIds[i]
			}
		});
		return res.send(response);
	} catch (err) {
		return next(err);
	}
};

const router = express.Router();
router.get('/', getVideoDetails);

module.exports = router;