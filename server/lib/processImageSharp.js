import sharp from "sharp";

export const resizeImageFromUrl = async (originalImageUrl, size) => {
  const response = await fetch(originalImageUrl);
  const inputImageBuffer = Buffer.from(await response.arrayBuffer());
  return await sharp(inputImageBuffer)
    .resize(size, null, {
      kernel: sharp.kernel.nearest,
      fit: "contain",
    })
    .png()
    .toBuffer()
    .then((data) => data)
    .catch((err) => {
      console.error("resizeImageFromUrl :", err);
    });
};

export const resizeImageFromBuffer = async (originalImageBuffer, size) => {
  return await sharp(originalImageBuffer)
    .resize(size, null, {
      kernel: sharp.kernel.nearest,
      fit: "contain",
    })
    .png()
    .toBuffer()
    .then((data) => data)
    .catch((err) => {
      console.error("resizeImageFromBuffer :", err);
    });
};

export const rotateImage = async (
  originalImageBuffer,
  angleOfRotationInDegree,
) => {
  return await sharp(originalImageBuffer)
    .rotate(angleOfRotationInDegree)
    .toBuffer()
    .then((data) => data)
    .catch((err) => {
      console.error("rotateImage :", err);
    });
};

export const flipImage = async (originalImageBuffer) => {
  return await sharp(originalImageBuffer)
    .flip()
    .toBuffer()
    .then((data) => data)
    .catch((err) => {
      console.error("rotateImage :", err);
    });
};

export const mirrorImage = async (originalImageBuffer) => {
  return await sharp(originalImageBuffer)
    .flop()
    .toBuffer()
    .then((data) => data)
    .catch((err) => {
      console.error("rotateImage :", err);
    });
};

export const tintImage = async (originalImageBuffer, red, green, blue) => {
  return await sharp(originalImageBuffer)
    .tint({ r: red, g: green, b: blue })
    .toBuffer()
    .then((data) => data)
    .catch((err) => {
      console.error("rotateImage :", err);
    });
};

export const blurImage = async (originalImageBuffer, blurValue) => {
  return await sharp(originalImageBuffer)
    .blur(blurValue)
    .toBuffer()
    .then((data) => data)
    .catch((err) => {
      console.error("blurImage :", err);
    });
};

export const cropImage = async (
  originalImageBuffer,
  left,
  top,
  width,
  height,
) => {
  return await sharp(originalImageBuffer)
    .extract({ left, top, width, height })
    .toBuffer()
    .then((data) => data)
    .catch((err) => {
      console.error("cropImage :", err);
    });
};

export const autoCorrectImage = async (originalImageBuffer) => {
  try {
    const metadata = await sharp(originalImageBuffer).metadata();
    const originalWidth = metadata.width;
    const originalHeight = metadata.height;
    const originalAspectRatio = originalWidth / originalHeight;

    // Normalize colors/white balance and flatten to white background
    const normalizedBuffer = await sharp(originalImageBuffer)
      .normalize()
      .flatten({ background: "#ffffff" })
      .png()
      .toBuffer();

    // Trim uniform background to isolate the main subject
    let trimmedBuffer, trimmedWidth, trimmedHeight;
    try {
      const trimResult = await sharp(normalizedBuffer)
        .trim({ threshold: 10 })
        .toBuffer({ resolveWithObject: true });
      trimmedBuffer = trimResult.data;
      trimmedWidth = trimResult.info.width;
      trimmedHeight = trimResult.info.height;
    } catch {
      // If trim fails (e.g. fully uniform image), use normalized buffer as-is
      trimmedBuffer = normalizedBuffer;
      trimmedWidth = originalWidth;
      trimmedHeight = originalHeight;
    }

    // Restore original aspect ratio by adding white padding around the subject
    let targetWidth, targetHeight;
    if (trimmedWidth / trimmedHeight > originalAspectRatio) {
      targetWidth = trimmedWidth;
      targetHeight = Math.round(trimmedWidth / originalAspectRatio);
    } else {
      targetHeight = trimmedHeight;
      targetWidth = Math.round(trimmedHeight * originalAspectRatio);
    }

    // Use floor so any odd pixel remainder goes to right/bottom, keeping the subject centered
    const paddingLeft = Math.floor((targetWidth - trimmedWidth) / 2);
    const paddingTop = Math.floor((targetHeight - trimmedHeight) / 2);

    return await sharp(trimmedBuffer)
      .extend({
        left: paddingLeft,
        right: targetWidth - trimmedWidth - paddingLeft,
        top: paddingTop,
        bottom: targetHeight - trimmedHeight - paddingTop,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()
      .toBuffer();
  } catch (err) {
    console.error("autoCorrectImage :", err);
    throw err;
  }
};
