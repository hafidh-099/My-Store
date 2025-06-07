//it deal with request and response 
const Products = require('../models/products');
// let product = [
//     {
//         id:1,
//         productName:"Apple",
//         price:20,
//         image:"./apples.png"
//     },
//     {
//         id:2,
//         productName:"banana",
//         price:30,
//         image:"./bananas.png"
//     },
//     {
//         id:3,
//         productName:"pineapple",
//         price:70,
//         image:"./pineapple.png"
//     },
// ]

//to fetch data from the database
exports.renderProducts=(req,res)=>{
    //in order to give limit feature to non login user we must read cookie 
    //we must get key value pair in order to use it so we convert by use split(split the string in every semicolon).[0] define that we want only element on index 0 which is (isLiggin) then we split again by using =. and take value in index number one
    //const cookie = req.get("Cookie").split(";")[0].split("=")[1];
    //we can void all above by using cookie parser and configure at app.js
   // const cookie = req.cookies; when pass cookie this will not work anymore
    // const cookie = req.session.isLoggedIn;
    //now instead of pass cookie we pass global variable

    Products.fetchProducts()
    .then(([row,fieldData])=>{
        // console.log(row)
        // console.log(fieldData)
        res.render('home',{
            products:row,
            //isLoggedIn:cookie.isLoggedIn//we pass cookie to home.ejs(this will not work with session)
            isLoggedIn:global.isLoggedIn
        });
    })
}
//post data to database
exports.postAddProduct = (req,res)=>{
    //console.log(req.body)//give undifined so we need body parse middleware to solve this
    const {productname,productprice}=req.body;
    const image =req.file.filename
    //const image = req.file.originalname; // use filename from multer
    // console.log(req.file.filename)
    // console.log(req.body)
    // console.log(productname, productprice, image); 
    //create instance of product
    const products = new Products(null,productname,productprice,image);
   // console.log(req.file)//now we can have buffer .we dont configure it by it own multer can handle it
    products.postData().then(()=>{
        res.redirect('/')//after isert data redirect user to home
    });
}
//add product
exports.renderAddProduct = (req,res)=>{
   // const cookie = req.cookies.isLoggedIn;
    // res.send("product add") we supose to render ejs file
    res.render('add-product',{isLoggedIn:global.isLoggedIn})

}
//edit product
exports.renderEditProduct=(req,res)=>{
    //const cookie = req.cookies.isLoggedIn;
    Products.fetchProductsById(req.params.id)
    .then(([[productData],fieldData])=>{
       //console.log(productData)
        // res.send('edit product')
        //res.render('edit-product',{products:product[--req.params.id]})
        res.render('edit-product',{
            products:productData,
            isLoggedIn:global.isLoggedIn
        })
    })
}
exports.editProduct =(req,res)=>{
    const{productname,productprice}=req.body;
    const image =req.file.filename
    const id = req.params.id;
    const products = new Products(id,productname,productprice,image)
    products.editData().then(()=>{
        res.redirect('/')
    })
}
exports.deleteProduct = (req,res)=>{
    Products.deleteProductById(req.params.id).then(()=>{
        res.redirect('/');
    })
}
//x