console.log('Loading event.');
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
exports.handler = function(event, context, callback) {
    let params = {
        TableName : 'Project',
	Limit: 100
    };
    docClient.scan(params, function(err, data){
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, data);
        }
    });
};