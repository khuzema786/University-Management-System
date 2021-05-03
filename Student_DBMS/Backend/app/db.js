const mysql = require('mysql');

// Create a connection to the database
// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PWD,
//   database: process.env.DATABASE,
//   insecureAuth: true // Why ? Because 8.0 didn't allow secure auth when using password
// });

const connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12380098',
  password: 'v5HuphtQFN',
  database: 'sql12380098',
  port: 3306,
  insecureAuth: true // Why ? Because 8.0 didn't allow secure auth when using password
});

// open the MySQL connection
connection.connect((error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    console.log('Successfully connected to the database.');
  }
});

module.exports = connection;
