const AWS = require("aws-sdk");
const fs = require("fs");

const uploadFileFromUrlToS3 = async (fileBufferLocal, key) => {
  // Define S3 bucket login info
  const s3 = await new AWS.S3({
    accessKeyId: process.env.AWS_IAM_KEY,
    secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
    Bucket: process.env.S3_BUCKET_ID,
  });


  const params = {
    Bucket: process.env.S3_BUCKET_ID,
    Key: key,
    Body: fileBufferLocal,
    ACL: "public-read",
  };

  // Uploading files to the bucket
  return new Promise((resolve, reject) => {
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        //console.log(`File uploaded successfully. ${data.Location}`);
        resolve(data.Location);
      }
    });
  });
};

module.exports = uploadFileFromUrlToS3;