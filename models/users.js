const pool = require('../utils/database')
module.exports=class Users{
    constructor(id,userName,passwd){
        this.id = id;
        this.userName = userName;
        this.passwd = passwd;
    }
    insertUser(){
        return pool.execute(
            'insert into Users(userName,passwd) values (?,?)',[this.userName,this.passwd]
        )
    }
}