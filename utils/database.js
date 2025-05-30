const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'12345678',
    database:'MyStore',
    port:3306,
    multipleStatements:true
})

module.exports = pool.promise();//promise to make query state thenable which make it easier to have async process