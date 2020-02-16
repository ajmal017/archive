const aws = require('aws-sdk');
const config = require('../config');

aws.config.update({ accessKeyId: config.AWS_ID, secretAccessKey: config.AWS_KEY, region: config.AWS_REGION });
aws.config.update({ region: config.AWS_REGION });
const sqs = new aws.SQS({apiVersion: '2012-11-05'});

exports.sendMessage = async (data) => {
	const result = await sqs.sendMessage({
		MessageBody: JSON.stringify(data),
		QueueUrl: config.SQS_QUEUE
	},
	(err, data) => {
		if (err) console.log(err, err.stack); // an error occurred
		else console.log(data);           // successful response
	}
	);

	return result;

};