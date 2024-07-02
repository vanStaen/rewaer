const fs = require("fs");
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const path = require("path");
const jsonitems = require('./db_backup_items.json');
const jsonlooks = require('./db_backup_looks.json');

let itemFileDoneCounter = 0;
const itemFileTotal = jsonitems.length;
let lookFileDoneCounter = 0;
const lookfileTotal = jsonlooks.length;


const downloadFile = (async (url, fileName) => {
    const res = await fetch(url);
    const destination = path.resolve(fileName);
    const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
    await finished(Readable.fromWeb(res.body).pipe(fileStream));
});

const runDownloadAllFile = async () => {
    for (const data of jsonitems) {
        await downloadFile(data.mediaUrl, `server/ressources/items/${data._id}.jpg`);
        itemFileDoneCounter++;
        console.log(`${itemFileDoneCounter} / ${itemFileTotal}`);
    }
    for (const data of jsonlooks) {
        await downloadFile(data.mediaUrl, `server/ressources/looks/${data._id}.jpg`);
        lookFileDoneCounter++;
        console.log(`${lookFileDoneCounter} / ${lookfileTotal}`);
    }
}

runDownloadAllFile();