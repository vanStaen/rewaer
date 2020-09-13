const uuid = require('uuid');
const moment = require('moment');
const path = require('path');
const fs = require("fs");

const logger = (req, res, next) => {

    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const logLine = moment().format("DD/MM/YYYY, H:mm:ss") + ' > ' + req.method + ': ' + url + ' (id: ' + uuid.v4() + ')\r\n';

    fs.appendFile(path.join(__dirname, '../', 'routes.log'), logLine, 'utf8', err => {
        if (err) throw err;
    });

    next();

};

module.exports = logger;