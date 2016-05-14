let aws = require('aws-sdk');

aws.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

let docClient = new aws.DynamoDB.DocumentClient();

let table = "Sermons";

let 
