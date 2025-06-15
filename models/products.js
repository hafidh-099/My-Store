// const pool = require('../utils/database')

// module.exports = class Products{
//     constructor(id,productName,price,image){
//         this.id=id;
//         this.productname=productName;
//         this.productprice = price;
//         this.image =image;
//     }
    
//     static fetchProducts(){
//         return pool.execute("select * from Product")
//     }

//     postData(){
//         return pool.execute("insert into Product (id,productName,price,image) values(?,?,?,?)",
//             [this.id,this.productname,this.productprice,this.image])//? used to assign dynamic values
//     }

//     static fetchProductsById(id){
//         return pool.execute('select * from Product where id=?',[id])
//     }

//     static deleteProductById(id){
//         return pool.execute('delete from Product where id=?',[id])
//     }

//     editData(){
//         return pool.execute('update Product set productName=?,price=?,image=? where id=?',
//             [this.productname,this.productprice,this.image,this.id])
//     }
// }

//sequelize

//now we convert code below to sequelize(note:sequalize is auto sync or auto migratin(i.e can generate table by using code defined by it own self without you re create manualy))
// const { DataTypes } = require('sequelize');
// const sequalize = require('../utils/database');

// const Product = sequalize.define('Product',{
//     id:{
//         type:DataTypes.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     productName:{
//         type:DataTypes.STRING,
//         allowNull:false
//     },
//     price:{
//         type:DataTypes.INTEGER,
//         allowNull:false
//     },
//     image:{
//         type:DataTypes.STRING,
//         allowNull:false
//     }
    
// },{tableName:'Product',timestamps:false,freezeTableName: true})//time stamp is prevent automatic createdAt and updatedAt column in the table
// module.exports =Product;

//mongodb

const mongoose = require('mongoose');
const mySchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});
const Product = mongoose.model('Product',mySchema);
module.exports = Product;