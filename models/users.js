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
// const sequalize = require('../utils/database');
// const { DataTypes, where } = require('sequelize');

// const Users = sequalize.define('Users',{
//   id:{
//     type:DataTypes.INTEGER,
//     autoIncrement:true,
//     allowNull:false,
//     primaryKey:true
//   },
//   userName:{
//     type:DataTypes.STRING,
//     allowNull:false
//   },
//   password:{
//     type:DataTypes.STRING,
//     allowNull:false
//   }
// },{tableName:'Users',timestamps:false,freezeTableName:true});
// //we create function to easy interact with detabase in outside  
// Users.insertUserFunc=async({userName,password})=>{
//   await Users.create({
//     userName:userName,
//     password:password
//   })
// }
// //we create this to authenticate username if is exist
// Users.fetchUserByName=async(userName)=>{
//   return Users.findOne({
//     where:{userName:userName},
//   })
// }

// module.exports = Users;

//mongodb
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  userName:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,

  }
});
//we need custom method to add username and password collection
userSchema.statics.insertUser=async function({userName,password}){//statics is used to define custom method or function for mongoose model
  const user = new this({userName,password})//this keyword is refer the model
  return user.save()
}
//another method
userSchema.statics.fetchUserByUserName = async function (userName) {//this method will receive userName
  //this username will be compare to login credential
  return this.findOne({userName})//we suppose to pass({userName:userName})but due to similarity we pass ({userName})
};
const User = mongoose.model('Users',userSchema)
//note mongo will create schema with all associated method firts i.e static method before creating the model
module.exports = User;