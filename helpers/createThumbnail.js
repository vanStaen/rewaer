const { LexRuntime } = require('aws-sdk');
const Jimp = require('jimp');
const { v1: uuidv1 } = require('uuid');

const createThumbnail = async (originalImageUrl) => {

    const tempPath = './public/uploads/';
    const tempFileName = uuidv1();
    const tempURL = tempPath + tempFileName;

    const url = await Jimp.read(originalImageUrl)
        .then(image => {
            image
                .resize(120, 120)
                .quality(60)
                .writeAsync(tempURL);
            //console.log('Pic was resized and saved', image);
            return tempURL;
        })
        .catch(err => {
            console.error(err);
        });

    return url;
}

module.exports = createThumbnail;

/*
### SOLUTION 1 : ASYNC/AWAIT ###
async function testrun() {
    const finalURL = await createThumbnail('https://upload.wikimedia.org/wikipedia/en/9/95/Test_image.jpg');
    console.log('Wait until it happens');
    console.log(finalURL);
}
testrun();

### SOLUTION 2 : THEN/CATCH ###
createThumbnail('https://upload.wikimedia.org/wikipedia/en/9/95/Test_image.jpg')
    .then(finalURL => {
        console.log('Wait until it happens');
        console.log(finalURL);
    });
*/
