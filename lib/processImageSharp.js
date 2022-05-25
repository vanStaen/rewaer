const sharp = require('sharp')
const axios = require('axios')

export const resizeImage = async (originalImageUrl, size) => {
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
      console.error('resizeImage :', err)
    })
}

export const rotateImage = async (
  originalImageUrl,
  angleOfRotationInDegree
) => {
  const inputImageBuffer = (
    await axios({
      url: originalImageUrl,
      responseType: 'arraybuffer'
    })
  ).data
  return await sharp(inputImageBuffer)
    .rotate(angleOfRotationInDegree)
    .toBuffer()
    .then(data => data)
    .catch(err => {
      console.error('rotateImage :', err)
    })
}

export const flipImage = async originalImageUrl => {
  const inputImageBuffer = (
    await axios({
      url: originalImageUrl,
      responseType: 'arraybuffer'
    })
  ).data
  return await sharp(inputImageBuffer)
    .flip()
    .toBuffer()
    .then(data => data)
    .catch(err => {
      console.error('rotateImage :', err)
    })
}

export const tintImage = async (originalImageUrl, red, green, blue) => {
  const inputImageBuffer = (
    await axios({
      url: originalImageUrl,
      responseType: 'arraybuffer'
    })
  ).data
  return await sharp(inputImageBuffer)
  .tint({ r: red, g: green, b: blue })
    .toBuffer()
    .then(data => data)
    .catch(err => {
      console.error('rotateImage :', err)
    })
}
