const sharp = require("sharp");
const axios = require( "axios");

const resizeImage = async (originalImageUrl, size, quality) => {
  const inputImageBuffer = (
    await axios({
      url: originalImageUrl,
      responseType: "arraybuffer",
    })
  ).data;
  
  return await sharp(inputImageBuffer)
    .resize(200, 300, {
      kernel: sharp.kernel.nearest,
      fit: "contain",
      position: "right top",
      background: { r: 255, g: 255, b: 255, alpha: 0.5 },
    })
    .png()
    .toBuffer()
    .then((data) => data)
    .catch((err) => {
      console.error("resizeImage :", err);
    });
};

module.exports = resizeImage;
