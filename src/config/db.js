require('dotenv').config();
const mysql = require('mysql2/promise');

//To establish the connection between the mysql and node js app;;;
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;