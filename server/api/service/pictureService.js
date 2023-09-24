const axios = require('axios');
const AWS = require("aws-sdk");

const { resizeImageFromBuffer, rotateImage, flipImage, tintImage } = require("../../lib/processImageSharp");
const uploadFileFromBufferToS3 = require("../../lib/uploadFileFromBufferToS3");

// Setup the AWS
AWS.config.region = "eu-west-1";
AWS.config.signatureVersion = "v4";

// Define s3 bucket login info
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_ID,
});

exports.pictureService = {

  async rotatePicture(url, numberOfQuarterTurnToTheRight) {
    const key = url.split('.com/')[1];
    // increment version counter
    let version = 1;
    if (key.includes("-")) {
      version = key.split('-')[1];
    }
    const nameImageThumb = "t_" + key;
    const nameImageMedium = "m_" + key;
    // download picture
    const originalImageBuffer = (
      await axios({
        url: url,
        responseType: 'arraybuffer'
      })
    ).data
    // rotate picture
    const rotationInDegrees = numberOfQuarterTurnToTheRight * 90;
    const rotatedImageBuffer = await rotateImage(originalImageBuffer, rotationInDegrees)
    // resize picture
    const [thumbBufferLocal, mediumBufferLocal] = await Promise.all([
      resizeImageFromBuffer(rotatedImageBuffer, 240),
      resizeImageFromBuffer(rotatedImageBuffer, 750),
    ]);
    // delete old pictures
    const params = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: key
    };
    const paramsThumb = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: "t_" + key,
    };
    const paramsMedium = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: "m_" + key,
    };
    await Promise.all([
      s3.deleteObject(params, function (err, data) { }),
      s3.deleteObject(paramsThumb, function (err, data) { }),
      s3.deleteObject(paramsMedium, function (err, data) { }),
    ]);
    // upload new pictures
    const [UrlOriginalS3, UrlThumbS3, UrlMediumbS3] = await Promise.all([
      uploadFileFromBufferToS3(rotatedImageBuffer, `${key}-${version}`),
      uploadFileFromBufferToS3(thumbBufferLocal, `${nameImageThumb}-${version}`),
      uploadFileFromBufferToS3(mediumBufferLocal, `${nameImageMedium}-${version}`),
    ]);
    // return new Picture Url
    return ({ UrlOriginalS3, UrlThumbS3, UrlMediumbS3 })
  },

  async tintPicture(url, red, green, blue) {
    return true
  },

  async flipPicture(url) {
    return true
  },

}
