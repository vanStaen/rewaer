const sharp = require('sharp')
const axios = require('axios')

module.exports = {
  async resizeImageFromUrl(originalImageUrl, size) {
    const inputImageBuffer = (
      await axios({
        url: originalImageUrl,
        responseType: 'arraybuffer'
      })
    ).data
    return await sharp(inputImageBuffer)
      .resize(size, null, {
        kernel: sharp.kernel.nearest,
        fit: 'contain'
      })
      .png()
      .toBuffer()
      .then(data => data)
      .catch(err => {
        console.error('resizeImageFromUrl :', err)
      })
  },

  async resizeImageFromBuffer(originalImageBuffer, size) {
    return await sharp(originalImageBuffer)
      .resize(size, null, {
        kernel: sharp.kernel.nearest,
        fit: 'contain'
      })
      .png()
      .toBuffer()
      .then(data => data)
      .catch(err => {
        console.error('resizeImageFromBuffer :', err)
      })
  },

  async rotateImage(originalImageBuffer, angleOfRotationInDegree) {
    return await sharp(originalImageBuffer)
      .rotate(angleOfRotationInDegree)
      .toBuffer()
      .then(data => data)
      .catch(err => {
        console.error('rotateImage :', err)
      })
  },

  async flipImage(originalImageBuffer) {
    return await sharp(originalImageBuffer)
      .flip()
      .toBuffer()
      .then(data => data)
      .catch(err => {
        console.error('rotateImage :', err)
      })
  },

  async mirrorImage(originalImageBuffer) {
    return await sharp(originalImageBuffer)
      .flop()
      .toBuffer()
      .then(data => data)
      .catch(err => {
        console.error('rotateImage :', err)
      })
  },

  async tintImage(originalImageBuffer, red, green, blue) {
    return await sharp(originalImageBuffer)
      .tint({ r: red, g: green, b: blue })
      .toBuffer()
      .then(data => data)
      .catch(err => {
        console.error('rotateImage :', err)
      })
  }
}
