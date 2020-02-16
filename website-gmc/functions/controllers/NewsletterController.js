const functions = require('firebase-functions');
const express = require('express');
const MailchimpAPI = require('mailchimp-api-v3');

const API_KEY = functions.config().mailchimp.key;
const mailchimp = new MailchimpAPI(API_KEY);

const getNewsletters = async (req, res, next) => {
	try {
		const { campaigns } = await mailchimp.get('/campaigns', { status: 'sent' });
		const contentPromises = campaigns.map(campaign => mailchimp.get(`/campaigns/${campaign.id}/content`, { fields: 'html' }));
		const results = await Promise.all(contentPromises);
		const response = results.map((result, i) => {
			return {
				id: campaigns[i].id,
				title: campaigns[i].settings.title || campaigns[i].settings.preview_text || campaigns[i].settings.subject_line,
				sentAt: campaigns[i].send_time,
				html: result.html
			}
		});
		return res.send(response);
	} catch (err) {
		return next(err);
	}
};

const signUp = async (req, res, next) => {
	try {
		const { email } = req.body;
		if (!email) throw new Error('"email" is required in the request body');

		const mailchimpListId = 'ac16b84344';

		const request = {
			email_address: email,
			status: 'subscribed'
		};
		try {
			const result = await mailchimp.post(`/lists/${mailchimpListId}/members/`, request);
			return res.send(result);
		} catch (err) {
			if (err.title === 'Member Exists') return res.send('Member Exists');
			throw err;
		}
	} catch (err) {
		return next(err);
	}
};

const router = express.Router();
router.get('/', getNewsletters);
router.post('/sign-up', signUp);

module.exports = router;