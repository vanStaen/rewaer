// npm install mysql

var CONFIG = require('../config.json');
var dbHost = CONFIG.host;
var dbUser = CONFIG.user;
var dbPwd = CONFIG.password;
var dbName = CONFIG.database;

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 's3kreee7',
    database: 'my_db'
})

connection.connect()

connection.query('SELECT * FROM ', function (err, rows, fields) {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
})

connection.end()