const Jimp = require('jimp');

const createThumbnail = async (originalImageUrl, randomName) => {

    const tempPath = './public/uploads/';
    const tempURL = tempPath + randomName;

    const url = await Jimp.read(originalImageUrl)
        .then(image => {
            if (image.bitmap.width > image.bitmap.length) {image.rotate(270)}
            image
                .resize(240, Jimp.AUTO, Jimp.RESIZE_BILINEAR)
                .quality(60)
                .writeAsync(tempURL)
            return tempURL;
        })
        .catch(err => {
            console.error(err);
        });

    return url;
}

module.exports = createThumbnail;