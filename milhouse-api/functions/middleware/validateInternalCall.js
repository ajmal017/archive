const validateInternaCall = async (req) => {

	const serviceIds = [];

	if (!serviceIds.incluce(req.user.user_id)) throw new Error('> not authorized');
	return;

};

exports.validateInternaCall = validateInternaCall;