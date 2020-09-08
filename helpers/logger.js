const uuid = require('uuid');
const moment = require('moment');
const path = require('path');
const fs = require("fs");

const logger = (req, res, next) => {

    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const logLine = uuid.v4() + ' - ' + moment().format("DD/MM/YYYY, H:mm:ss") + ' > GET: ' + url + '\r\n';

    fs.appendFile(path.join(__dirname, '../', 'log.txt'), logLine, 'utf8', err => {
        if (err) throw err;
    });

    next();

};

module.exports = logger;