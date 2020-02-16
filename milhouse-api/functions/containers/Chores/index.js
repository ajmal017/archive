const { get, list, count, create, update, remove } = require('../../lib/crud');
const sqs = require('../../lib/sqs');

const build = async (data) => {

	if (!data.type) throw new Error('> not chore "type" property')

	const chore = {
		type: data.type,
		inputs: data.inputs
	};

	const queue = await sqs.sendMessage(chore);
	// console.log('queue: ', queue);

	return chore;

}


module.exports = (expressApp) => {
	expressApp.get('/chore/:id', get('chores'));
	expressApp.get('/chores/count', count('chores'));
	expressApp.get('/chores', list('chores'));
	expressApp.post('/chores', create('chores', build));
	expressApp.post('/chore/:id', update('chores'));
	expressApp.delete('/chore/:id', remove('chores'));
};