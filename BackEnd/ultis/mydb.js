require ('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HORT,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = {
    load: function (sql) {
        return new Promise((resolve, reject) => {
            pool.query(sql, function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    },

    add: function(table, entity){
        return new Promise((resolve, reject) => {
            const sql = `insert into ${table} set ?`
            pool.query(sql, entity, function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    }

    // load: async function (sql) {
    //     try {
    //         const result = await pool.query(sql);
    //         return result;
    //     } catch (error) {
    //         throw error
    //     }
    // }
}