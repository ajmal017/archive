const admin = require('firebase-admin');
const { get, list, count, create, update, remove } = require('../lib/crud');
const { getUserName } = require('../lib/common');

const build = (template, request) => {
	const user = request.user;

	if (typeof template.name !== 'string') throw new Error('templates must have a string "name" property');
	if (typeof template.description !== 'string') throw new Error('templates must have a string "description" property');
	if (typeof template.durationWeeks !== 'number') throw new Error('templates must have number  "durationWeeks" property');

	// Modules property validation
	const modules = template.modules;
	if (
		!Array.isArray(modules) ||
		modules.length === 0
	) throw new Error('"modules" must be an array of at least one item');

	// Module validation
	modules.forEach(m => {
		if (typeof m.name !== 'string') throw new Error('each module must have a string "name" property');
		if (
			typeof m.repeat.value !== 'number' ||
			m.repeat.value < 0 ||
			typeof m.repeat.unit !== 'string' ) throw new Error('each module must have an object "repeat" with sub property "value" (number equal to or greater than 0), and "unit" (string)');
		if (typeof m.type !== 'string') throw new Error('each module must have a string "type" property');

		// Module type validation
		const moduleTypes = ['information', 'survey'];
		if (!moduleTypes.includes(m.type)) throw new Error(`each module type must be one of: ${moduleTypes}`);

		// Media format validation
		if (m.meta.media) {
			if (!m.meta.media.value) throw new Error(`all media objects must have a "value" property`);
			if (!m.meta.media.type) throw new Error(`all media objects must have a "type" property`);
		}
	})


	return {
		authorId: user.user_id,
		createdAt: new Date().toISOString(),
		name: template.name,
		description: template.description,
		durationWeeks: template.durationWeeks,
		modules: template.modules
	};

};

const patch = async (update, request) => {
	const id = request.params.id;
	const doc = await admin.firestore().collection('templates').doc(id).get();
	let template = doc.data();
	if (template.authorId !== request.user.user_id) throw new Error('unauthorized');
	template = { ...template, ...update };
	template = build(template, request);
	return template;
};

const validate = async (req) => {
	const id = req.params.id;
	const doc = await admin.firestore().collection('templates').doc(id).get();
	if (!doc) throw new Error('not found');
	const template = doc.data();
	if (template.authorId !== req.user.user_id) throw new Error('unauthorized');
};

const fetch = async (template) => {
	const authorName = await getUserName(template.authorId);
	const author = {
		name: authorName,
		id: template.authorId
	};
	delete template.authorId
	return {
		...template,
		author
	}
};

module.exports = (expressApp) => {

	expressApp.get('/template/:id', get('templates', fetch));
	expressApp.get('/templates/count', count('templates'));
	expressApp.get('/templates', list('templates', fetch));
	expressApp.post('/template', create('templates', build));
	expressApp.post('/template/:id', update('templates', patch));
	expressApp.delete('/template/:id', remove('templates', validate));

};
