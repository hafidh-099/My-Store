// const mysql = require('mysql2')

// const pool = mysql.createPool({
    //     host:'localhost',
    //     user:'root',
    //     password:'12345678',
    //     database:'MyStore',
    //     port:3306,
    //     multipleStatements:true
    // })
    
    // module.exports = pool.promise();//promise to make query state thenable which make it easier to have async process
    
    // now we convert it to sequelize
    
const Sequalize = require('sequelize')
const sequelize = new Sequalize({
        dialect:'mysql',
        host:'localhost',
        port:3306,
        database:'MyStoreSequelize',
        username:'root',
        password:'12345678',
        pool:{//for manage database connection
            max:10,//determinine max number of connection that pool can meke simuteniously(prevent database from too many concaration)
            min:0,
            acquire:30000,//specify minimum time(in milisecond) that conection request should wait for connection to become available before through error
            idle:10000//it take time that allow connection to remain idle(not in action or at work) in the pool for time being before it get terminated or removed by sequalize
        }
    });
module.exports = sequelize;