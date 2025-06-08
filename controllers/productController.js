//it deal with request and response 
//const Products = require('../models/products');
const Product = require('../models/products');
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
exports.renderProducts= async(req,res)=>{//we add async bcs sequelize is async
    //in order to give limit feature to non login user we must read cookie 
    //we must get key value pair in order to use it so we convert by use split(split the string in every semicolon).[0] define that we want only element on index 0 which is (isLiggin) then we split again by using =. and take value in index number one
    //const cookie = req.get("Cookie").split(";")[0].split("=")[1];
    //we can void all above by using cookie parser and configure at app.js
   // const cookie = req.cookies; when pass cookie this will not work anymore
    // const cookie = req.session.isLoggedIn;
    //now instead of pass cookie we pass global variable
    try{
        // /Products.fetchProducts().then(([row,fieldData])=>{
            // console.log(row)
            // console.log(fieldData)
            const products = await Product.findAll();
            res.render('home',{
                products:products,
                //isLoggedIn:cookie.isLoggedIn//we pass cookie to home.ejs(this will not work with session)
                isLoggedIn:global.isLoggedIn
            });
        // })
    }catch(error){
        console.error(error);
        res.status(500).redirect('/error');
    }
}
//post data to database
exports.postAddProduct = async(req,res)=>{
    try {
        const {productname,productprice}=req.body;
        console.log(productname, 'and ',productprice)
        const image =req.file.filename
        const newProduct = await Product.create({
            productName:productname,
            price:productprice,
            image
        })
        console.log(newProduct);
        //const image = req.file.originalname; // use filename from multer
        // console.log(req.file.filename)
        // console.log(req.body)
        // console.log(productname, productprice, image); 
        //create instance of product
        //const products = new Products(null,productname,productprice,image); for sequalize it not work
        console.log('product added succefully',newProduct);
         res.redirect('/')
    } catch (error) {
        console.log(error);
        res.status(500).redirect('/error')
        //console.log(req.body)//give undifined so we need body parse middleware to solve this
       // console.log(req.file)//now we can have buffer .we dont configure it by it own multer can handle it
        // products.postData().then(()=>{
        //     res.redirect('/')//after isert data redirect user to home
        // });
    }
}
//add product
exports.renderAddProduct = (req,res)=>{
   // const cookie = req.cookies.isLoggedIn;
    // res.send("product add") we supose to render ejs file
    res.render('add-product',{isLoggedIn:global.isLoggedIn})

}
//edit product
exports.renderEditProduct=async(req,res)=>{
    try {
        // Products.fetchProductsById(req.params.id).then(([[productData],fieldData])=>{
           //console.log(productData)
            // res.send('edit product')
            //res.render('edit-product',{products:product[--req.params.id]})
            const product  = await Product.findByPk(req.params.id);
            if(product){
                res.render('edit-product',{
                    products:product,
                    isLoggedIn:global.isLoggedIn
                })
            }else{
                res.redirect('/')
            }
        // })
    } catch (error) {
        console.error('eror occure durig render edit Product')
        res.status(500).redirect('/error')
    }
    //const cookie = req.cookies.isLoggedIn;
}
exports.editProduct =async(req,res)=>{
    try {
        const{productname,productprice}=req.body;
        const image =req.file.filename
        const id = req.params.id;
        const product = await Product.findByPk(id);
        if(!product){
            console.log('product not found');
            return res.status(404).send('product not found');
        }else{

            product.productName = productname;
            product.price= productprice;
            product.image = image;
            //to save change
            await product.save()
            res.redirect('/')
            console.log('product is succefull edited and saved');
            // const products = new Products(id,productname,productprice,image)
            // products.editData().then(()=>{
            //     res.redirect('/')
            // })
        }
    } catch (error) {
        console.error('eror occure during render of product',error);
        res.status(500).redirect('/error')
    }
}
exports.deleteProduct = async(req,res)=>{
    try {
        //Products.deleteProductById(req.params.id).then(()=>{
            await Product.destroy({where:{id:req.params.id}})//destroy used to delete product
            console.log('product deleted succes')
            res.redirect('/');
        // })  
    } catch (error) {
        console.error('error occure during delete product',error)
        res.status(500).redirect('/error')
    }
}
//x