const AWS = require('aws-sdk');
const fs = require('fs');

const uploadLocalFileS3 = async (fileUrlLocal, key) => {

    // Define S3 bucket login info
    const s3 = await new AWS.S3({
        accessKeyId: process.env.AWS_IAM_KEY,
        secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
        Bucket: process.env.S3_BUCKET_ID
    });

    const file = await fs.readFileSync(fileUrlLocal);

    const params = {
        Bucket: process.env.S3_BUCKET_ID,
        Key: key,
        Body: file
    };

    // Uploading files to the bucket
    const url = await s3.upload(params, function (err, data) {
        if (err) { throw err; }
        //console.log(`File uploaded successfully. ${data.Location}`);
        return data.Location;
    });

    return url;

}

//module.exports = uploadLocalFileS3;

/*
### SOLUTION : THEN/CATCH ### */

uploadLocalFileS3('./public/uploads/d7894ac0-2f45-11eb-af5b-1def7dbe0c26', 'd7894ac0-2f45-11eb-af5b-1def7dbe0c26')
    .then(finalURL => {
        console.log('Wait until it happens');
        console.log(finalURL);
    });




