const { get, list, count, create } = require('../lib/crud');

const build = (payment, request) => {
	const user = request.user;

	if (typeof payment.amount !== 'number') throw new Error('Payments must have a number "amount" property');

	return {
		authorId: user.user_id,
		createdAt: new Date().toISOString(),
		amount: payment.amount
	};

};

module.exports = (expressApp) => {

	expressApp.get('/payment/:id', get('payments'));
	expressApp.get('/payments/count', count('payments'));
	expressApp.get('/payments', list('payments'));
	expressApp.post('/payment', create('payments', build));

}
