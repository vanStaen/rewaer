import {
  rotateImage,
  flipImage,
  mirrorImage,
  cropImage,
} from "../../lib/processImageSharp.js";

import { deleteFileFromS3 } from "../../lib/S3/deleteFileFromS3.js";
import { getObjectFromS3 } from "../../lib/S3/getObjectFromS3.js";
import { uploadFileToS3 } from "../../lib/S3/uploadFileToS3.js";

export const pictureService = {
  async rotatePicture(path, bucket, userId, numberOfQuarterTurnToTheRight) {
    try {
      // download picture
      const originalImageBuffer = await getObjectFromS3(path, bucket);
      // rotate picture
      const rotationInDegrees = numberOfQuarterTurnToTheRight * 90;
      const rotatedImageBuffer = await rotateImage(
        originalImageBuffer,
        rotationInDegrees,
      );
      // upload new pictures
      const newPath = await uploadFileToS3(rotatedImageBuffer, bucket, userId);
      // delete old pictures
      await deleteFileFromS3(path, bucket);
      // return new Picture Url
      return newPath;
    } catch (error) {
      console.error(error);
    }
  },

  async flipPicture(path, bucket, userId, isMirror) {
    // download picture
    const originalImageBuffer = await getObjectFromS3(path, bucket);
    // const originalImageBuffer = Buffer.from(await response.arrayBuffer());
    let rotatedImageBuffer;
    if (isMirror) {
      // flip picture
      rotatedImageBuffer = await flipImage(originalImageBuffer);
    } else {
      // mirror picture
      rotatedImageBuffer = await mirrorImage(originalImageBuffer);
    }
    // upload new pictures
    const newPath = await uploadFileToS3(rotatedImageBuffer, bucket, userId);
    // delete old pictures
    await deleteFileFromS3(path, bucket);
    // return new Picture Url
    return newPath;
  },

  async tintPicture(url, red, green, blue) {
    return true;
  },

  async cropPicture(path, bucket, userId, left, top, width, height) {
    try {
      // download picture
      const originalImageBuffer = await getObjectFromS3(path, bucket);
      // crop picture
      const croppedImageBuffer = await cropImage(
        originalImageBuffer,
        left,
        top,
        width,
        height,
      );
      // upload new pictures
      const newPath = await uploadFileToS3(croppedImageBuffer, bucket, userId);
      // delete old pictures
      await deleteFileFromS3(path, bucket);
      // return new Picture Url
      return newPath;
    } catch (error) {
      console.error(error);
    }
  },
};
