import axios from "axios";
import { uploadFileToS3 } from "../../lib/S3/uploadFileToS3.js";
import {
  resizeImageFromBuffer,
  rotateImage,
  flipImage,
  mirrorImage,
  tintImage
} from "../../lib/processImageSharp.js";

// TODO

export const pictureService = {
  async rotatePicture(url, numberOfQuarterTurnToTheRight) {
    const key = url.split('.com/')[1];
    // increment version counter
    let version = 1;
    if (key.includes("-")) {
      version = parseInt(key.split('-')[1]) + 1;
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

  async flipPicture(url, isMirror) {
    const key = url.split('.com/')[1];
    // increment version counter
    let version = 1;
    if (key.includes("-")) {
      version = parseInt(key.split('-')[1]) + 1;
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
    let rotatedImageBuffer;
    if (isMirror) {
      // flip picture
      rotatedImageBuffer = await flipImage(originalImageBuffer)
    } else {
      // flip picture
      rotatedImageBuffer = await mirrorImage(originalImageBuffer)
    }
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

}
