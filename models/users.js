const pool = require("../utils/database");
module.exports = class Users {
  constructor(id, userName, passwd) {
    this.id = id;
    this.userName = userName;
    this.passwd = passwd;
  }
  insertUser() {
    return pool.execute("insert into Users(userName,password) values (?,?)", [
      this.userName,
      this.passwd,
    ]);
  }
  //to confirm user we must fetch it
  static fetchUserByName(userName) {
    return pool.execute("select * from Users where userName=?", [userName]);
  }
};
