// npm install mysql

var CONFIG = require("../config.json");
var dbHost = CONFIG.host;
var dbUser = CONFIG.user;
var dbPwd = CONFIG.password;
var dbName = CONFIG.database;

var mysql = require("mysql");
var con = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPwd,
  database: dbName,
});

const query = "SELECT * FROM rewaer_objects";

// make to connection to the database.
con.connect(function (err) {
  if (err) throw err;

  // if connection is successful
  con.query(query, (err, result, fields) => {
    // if any error while executing above query, throw error
    if (err) throw err;

    // if there is no error, you have the result
    console.log(result);
  });
});
