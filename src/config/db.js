require('dotenv').config();
const mysql = require('mysql2');

//To establish the connection between the mysql and node js app;;;
exports.dbConnect = async () => {

    //Giving the data to createPool for connection
    const pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    //checking the db connection and return confirmation or failed
    async function checkDbConnectionWithPing() {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.ping();
            console.log('Database connection successful');
        } catch (error) {
            console.log('Database connection error',error);
        }
    }
    checkDbConnectionWithPing();
};