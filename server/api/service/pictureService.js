import {
  rotateImage,
  flipImage,
  mirrorImage,
  cropImage,
} from "../../lib/processImageSharp.js";

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
      // upload new picture and return new path
      // (deletion of the old file is handled by the updateLook/updateItem resolver,
      // which checks whether the file is the originalMediaId before deleting)
      const newPath = await uploadFileToS3(rotatedImageBuffer, bucket, userId);
      return newPath;
    } catch (error) {
      console.error(error);
    }
  },

  async flipPicture(path, bucket, userId, isMirror) {
    // download picture
    const originalImageBuffer = await getObjectFromS3(path, bucket);
    let rotatedImageBuffer;
    if (isMirror) {
      // flip picture
      rotatedImageBuffer = await flipImage(originalImageBuffer);
    } else {
      // mirror picture
      rotatedImageBuffer = await mirrorImage(originalImageBuffer);
    }
    // upload new picture and return new path
    // (deletion of the old file is handled by the updateLook/updateItem resolver,
    // which checks whether the file is the originalMediaId before deleting)
    const newPath = await uploadFileToS3(rotatedImageBuffer, bucket, userId);
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
      // upload new picture and return new path
      // (deletion of the old file is handled by the updateLook/updateItem resolver,
      // which checks whether the file is the originalMediaId before deleting)
      const newPath = await uploadFileToS3(croppedImageBuffer, bucket, userId);
      return newPath;
    } catch (error) {
      console.error(error);
    }
  },
};
