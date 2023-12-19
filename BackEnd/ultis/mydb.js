require('dotenv').config();
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
    pool,
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

    add: function (table, entity) {
        return new Promise((resolve, reject) => {
            const sql = `insert into ${table} set ?`
            pool.query(sql, entity, function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    },

    update: function (table, entity, condition) {
        return new Promise((resolve, reject) => {
            const sql = `update ${table} set ? where ?`
            pool.query(sql, [entity, condition], function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    },

    updateKitchen: function (table, entity, condition) {
        return new Promise((resolve, reject) => {
            const sql = `update ${table} set ? where MaSP=${condition.MaSP} and STT=${condition.STT}`
            pool.query(sql, entity, function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    },

    delete: function (table, condition) {
        return new Promise((resolve, reject) => {
            const sql = `delete from ${table} where ?`
            pool.query(sql, condition, function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    },

    loadSingle: function (table, field, value) {
        return new Promise((resolve, reject) => {
            const sql = `select * from ${table} where ${field} = ?`
            pool.query(sql, value, function (err, results, fields) {
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