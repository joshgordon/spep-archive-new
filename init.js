let aws = require('aws-sdk');

aws.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

let db = new aws.DynamoDB();

let params = {
  TableName: "Sermons",
  KeySchema: [
    { AttributeName: "DirectoryName", KeyType: "HASH" },
    { AttributeName: "FileName", KeyType: "RANGE" }
  ],
  AttributeDefinitions: [
    { AttributeName: "DirectoryName", AttributeType: "S" },
    { AttributeName: "FileName", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

db.createTable(params, (err, data) => {
  if (err) {
    console.error(JSON.stringify(err, null, 2));
  } else {
    console.log("Created table", JSON.stringify(data, null, 2));
  }
})

