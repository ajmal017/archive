const functions = require('firebase-functions');

module.exports = {
	SQS_QUEUE: functions.config().sqs.url,
	AWS_ID: functions.config().aws.id,
	AWS_KEY: functions.config().aws.key,
	AWS_REGION: functions.config().aws.region,
	// SQS_QUEUE: process.env.SQS_QUEUE,
	// AWS_ID: process.env.AWS_ID,
	// AWS_KEY: process.env.AWS_KEY,
	// AWS_REGION:  process.env.AWS_REGION
}