const deleteFileFromS3 = require('../lib/deleteFileFromS3');
const jsonitems = require('./db_backup_items.json');
const jsonlooks = require('./db_backup_looks.json');

let itemFileDoneCounter = 0;
const itemFileTotal = jsonitems.length;
let lookFileDoneCounter = 0;
const lookfileTotal = jsonlooks.length;

const runDeleteAllFile = async () => {
    for (const data of jsonitems) {
        const name = data.mediaUrl.split('/')[3];
        await deleteFileFromS3(name);
        await deleteFileFromS3(`m_${name}`);
        await deleteFileFromS3(`t_${name}`);
        itemFileDoneCounter++;
        console.log(`${itemFileDoneCounter} / ${itemFileTotal}`);
    }
    for (const data of jsonlooks) {
        const name = data.mediaUrl.split('/')[3];
        await deleteFileFromS3(name);
        await deleteFileFromS3(`m_${name}`);
        await deleteFileFromS3(`t_${name}`);
        lookFileDoneCounter++;
        console.log(`${lookFileDoneCounter} / ${lookfileTotal}`);
    }
}

runDeleteAllFile();