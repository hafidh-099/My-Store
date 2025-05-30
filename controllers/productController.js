//it deal with request and response 
const Products = require('../models/products');
let product = [
    {
        id:1,
        productName:"Apple",
        price:20,
        image:"./apples.png"
    },
    {
        id:2,
        productName:"banana",
        price:30,
        image:"./bananas.png"
    },
    {
        id:3,
        productName:"pineapple",
        price:70,
        image:"./pineapple.png"
    },
]

//to fetch data from the database
exports.renderProducts=(req,res)=>{
    Products.fetchProducts()
    .then(([row,fieldData])=>{
        // console.log(row)
        // console.log(fieldData)
        res.render('home',{products:row});
    })
}
//post data to database
exports.postAddProduct = (req,res)=>{
    //console.log(req.body)//give undifined so we need body parse middleware to solve this
    const {productname,productprice,image}=req.body;
    // console.log(req.body)
    // console.log(productname, productprice, image); 
    //create instance of product
    const products = new Products(null,productname,productprice,image);
    products.postData().then(()=>{
        res.redirect('/')//after isert data redirect user to home
    });
}
//add product
exports.renderAddProduct = (req,res)=>{
    // res.send("product add") we supose to render ejs file
    res.render('add-product')

}
//edit product
exports.renderEditProduct=(req,res)=>{
    // res.send('edit product')
    res.render('edit-product',{products:product[--req.params.id]})
}