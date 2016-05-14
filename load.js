let aws = require('aws-sdk');
let fs = require('fs');

let sermons = require('./sermons');

aws.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

let docClient = new aws.DynamoDB.DocumentClient();
console.log("Importing sermons into DynamoDB. Please wait");

sermons.forEach((sermon) => {
  let pathParts = sermon.FilePath.split('/');
  let directoryName = pathParts.splice(0, pathParts.length - 1).join('/');
  let fileName = pathParts.splice(pathParts.length - 1).join('/');

  let params = {
    TableName: "Sermons",
    Item: {
      DirectoryName: directoryName,
      FileName: fileName,
      title: sermon.title,
      pastor: sermon.pastor,
      date: sermon.date
    }
  };

  docClient.put(params, (err, data) => {
    if(err) {
      console.error("failed on ", sermon.FilePath, ". JSON: ", JSON.stringify(err, null, 2));
    } else {
      console.log("Success on ", sermon.FilePath);
    }
  });
});
