const admin = require('firebase-admin');

module.exports.getUserName = async (userId) => {
	const authorData = await admin.firestore()
		.collection('users')
		.doc(userId)
		.get();
	const author = authorData.data();
	const authorName = `${author.title}. ${author.firstName} ${author.lastName}`;
	return authorName;
};
