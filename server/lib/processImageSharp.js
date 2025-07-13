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
