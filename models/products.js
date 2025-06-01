const pool = require('../utils/database')

module.exports = class Products{
    constructor(id,productName,price,image){
        this.id=id;
        this.productname=productName;
        this.productprice = price;
        this.image =image;
    }
    
    static fetchProducts(){
        return pool.execute("select * from Product")
    }

    postData(){
        return pool.execute("insert into Product (id,productName,price,image) values(?,?,?,?)",
            [this.id,this.productname,this.productprice,this.image])//? used to assign dynamic values
    }

    static fetchProductsById(id){
        return pool.execute('select * from Product where id=?',[id])
    }

    static deleteProductById(id){
        return pool.execute('delete from Product where id=?',[id])
    }

    editData(){
        return pool.execute('update Product set productName=?,price=?,image=? where id=?',
            [this.productname,this.productprice,this.image,this.id])
    }
}