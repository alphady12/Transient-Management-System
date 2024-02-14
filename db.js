//db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'sql6.freemysqlhosting.net',
  user: 'sql6683747',
  password: 'IcKlAGGWHm',
  database: 'sql6683747'
});

db.connect((err) => {
  if (err) {
    console.error("error connecting to mysql: ", err)
  } else {
    console.log("connected to mysql")
  }
});

module.exports = db;
