const Jimp = require('jimp');

const resizeImage = async (originalImageUrl, randomName, size, quality) => {

    const tempPath = './public/uploads/';
    const tempURL = tempPath + randomName;

    return Jimp.read(originalImageUrl)
        .then(image => {
            if (image.bitmap.width > image.bitmap.length) {image.rotate(270)}
            return image
                .resize(size, Jimp.AUTO, Jimp.RESIZE_BILINEAR)
                .quality(quality)
                .writeAsync(tempURL)
                .then(() => tempURL)
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports = resizeImage;