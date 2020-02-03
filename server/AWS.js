require('dotenv').config();
const AWS = require('aws-sdk');

exports.notifications = (details, email) => {
  console.log("DETAILS:", details, "EMAIL:", email);

  return new Promise((resolve, reject) => {

    console.log("Notifications", details.name);

    AWS.config.getCredentials((err) => {
      if (err) console.log(err.stack);
      else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
        console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
      }
    });

    AWS.config.update({ region: process.env.AWS_REGION });

    var params = {
      TopicArn: process.env.AWS_TOPIC_ARN,
      Message: `You have a reminder : ${details.name} and title : ${details.index}`,
      // MessageStructure: 'json' 

    };
    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS().publish(params).promise();

    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(
      function (data) {
        console.log("Message ${params.Message} send sent to the topic ${params.TopicArn}");
        console.log("MessageID is " + data.MessageId);
      }).catch(
        function (err) {
          console.error(err, err.stack);
        })
  })
}