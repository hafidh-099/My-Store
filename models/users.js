// const pool = require("../utils/database");
// module.exports = class Users {
//   constructor(id, userName, passwd) {
//     this.id = id;
//     this.userName = userName;
//     this.passwd = passwd;
//   }
//   insertUser() {
//     return pool.execute("insert into Users(userName,password) values (?,?)", [
//       this.userName,
//       this.passwd,
//     ]);
//   }
//   //to confirm user we must fetch it
//   static fetchUserByName(userName) {
//     return pool.execute("select * from Users where userName=?", [userName]);
//   }
// };

//sequelize
const sequalize = require('../utils/database');
const { DataTypes, where } = require('sequelize');

const Users = sequalize.define('Users',{
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  userName:{
    type:DataTypes.STRING,
    allowNull:false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  }
},{tableName:'Users',timestamps:false,freezeTableName:true});
//we create function to easy interact with detabase in outside  
Users.insertUserFunc=async({userName,password})=>{
  await Users.create({
    userName:userName,
    password:password
  })
}
//we create this to authenticate username if is exist
Users.fetchUserByName=async(userName)=>{
  return Users.findOne({
    where:{userName:userName},
  })
}

module.exports = Users;