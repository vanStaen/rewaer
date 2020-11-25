const jimp = require('jimp');
const { v1: uuidv1 } = require('uuid');

const createThumbnail = (originalImageUrl) => {

    return jimp.read(originalImageUrl, (err, img) => {

        const tempPath = './public/uploads/';
        const tempFileName = uuidv1();
        const tempURL = tempPath + tempFileName;

        if (err) {
            console.log(err);
            return;
        }
        img.resize(120, 120)
            .quality(60)
            .writeAsync(tempURL);

        console.log('Image was resized', tempURL);

    })
        .then(thumbPicUrl => {
            console.log('Thumb pic was generated', resolve(thumbPicUrl));
        }).catch(console.error);


}

module.exports = createThumbnail;

//createThumbnail('https://upload.wikimedia.org/wikipedia/en/9/95/Test_image.jpg');

