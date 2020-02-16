const { get, list, count, create } = require('../lib/crud');
const { getUserName } = require('../lib/common');

const build = (prescription, request) => {
	const user = request.user;

	if (typeof prescription.name !== 'string') throw new Error('prescriptions must have a string "name" property');
	if (typeof prescription.templateId !== 'string') throw new Error('prescriptions must have a string "templateId" property');
	if (typeof prescription.clientId !== 'string') throw new Error('prescriptions must have a string "clientId" property');

	const events = prescription.events;
	if (
		!Array.isArray(events) ||
		events.length === 0
	) throw new Error('"events" must be an array of at least one item');
	events.forEach(e => {
		if (typeof e.name !== 'string') throw new Error('each event must have a string "name" property');
		if (typeof e.datetime !== 'string') throw new Error('each event must have a string "date" property');
		if (typeof e.type !== 'string') throw new Error('each event must have a string "type" property')
	});

	return {
		authorId: user.user_id,
		createdAt: new Date().toISOString(),
		templateId: prescription.templateId,
		name: prescription.name,
		events: prescription.events || [],
		description: prescription.description || '',
		clientId: prescription.clientId
	};
};

const fetch = async (prescription, req) => {

	const userId = req.user.user_id;
	if (prescription.authorId !== userId) throw new Error('unauthorized');

	const authorName = await getUserName(prescription.authorId);
	const author = {
		name: authorName,
		id: prescription.authorId
	}
	delete prescription.authorId;

	// const clientName = await getUserName(prescription.clientId);
	// const client = {
	// 	name: clientName,
	// 	id: prescription.clientId
	// }
	// delete prescription.clientId;


	const endDate = new Date(Math.max.apply(null, prescription.events.map((e) => {
		return new Date(e.datetime);
	}))).toISOString();
	const startDate = new Date(Math.min.apply(null, prescription.events.map((e) => {
		return new Date(e.datetime);
	}))).toISOString();
	return {
		...prescription,
		author,
		// client,
		startDate,
		endDate
	}
};


module.exports = (expressApp) => {

		expressApp.get('/prescription/:id', get('prescriptions', fetch));
		expressApp.get('/prescriptions/count', count('prescriptions'));
		expressApp.get('/prescriptions', list('prescriptions', fetch));
		expressApp.post('/prescription', create('prescriptions', build));

};
