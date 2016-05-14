let aws = require('aws-sdk');

aws.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

let docClient = new aws.DynamoDB.DocumentClient();

let table="Sermons";

let params = {
  TableName: table,
  Key: {
    DirectoryName: "/Trained%20to%20Follow%20Jesus",
    FileName: "2016-04-10_Sermon.mp3"
  }
};

docClient.get(params, (err, data) => {
  console.log("SOMETHING");
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
})
