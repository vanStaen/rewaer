const sharp = require("sharp");
const axios = require( "axios");

const resizeImage = async (originalImageUrl, size) => {
  const inputImageBuffer = (
    await axios({
      url: originalImageUrl,
      responseType: "arraybuffer",
    })
  ).data;
  
  return await sharp(inputImageBuffer)
    .resize(size, null, {
      kernel: sharp.kernel.nearest,
      fit: "contain",
    })
    .png()
    .toBuffer()
    .then((data) => data)
    .catch((err) => {
      console.error("resizeImage :", err);
    });
};

module.exports = resizeImage;
