const { resizeImageFromBuffer, rotateImage, flipImage, tintImage } = require("../../lib/processImageSharp");
const uploadFileFromBufferToS3 = require("../../lib/uploadFileFromBufferToS3");

exports.uploadService = {

  async flipPicture(url) {
    return true
  },

  async rotatePicture(url, numberOfQuarterTurnToTheRight) {
    const key = url.split('.com/')[1];
    console.log("key", key);
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
      uploadFileFromBufferToS3(thumbBufferLocal, nameImageThumb),
      uploadFileFromBufferToS3(thumbBufferLocal, nameImageThumb),
      uploadFileFromBufferToS3(mediumBufferLocal, nameImageMedium),
    ]);
    // return new Picture Url
    return ({ UrlOriginalS3, UrlThumbS3, UrlMediumbS3 })
  },

  async tintPicture(url, red, green, blue) {
    return true
  }
}
