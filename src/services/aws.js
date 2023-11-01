const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});
const dynamoDB = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
var dynamoDBClient = new AWS.DynamoDB();

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
});

module.exports = { dynamoDBClient, dynamoDB, s3, AWS };
