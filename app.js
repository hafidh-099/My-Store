const express = require('express');
const home= require('./routes/home');
const app = express();
const path = require('path');
const addProduct = require('./routes/addProduct');
const editproduct = require('./routes/editProduct');
// Serve static files from node_modules/bootstrap
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
// Serve static files from node_modules/bootstrap-icons
app.use('/bootstrap-icons', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')));
//to make assets file used globaly
app.use(express.static(__dirname));
//configure ejs
app.set('view engine','ejs');
//set ejs folder path to look for
app.set('views','views');

app.use('/',home);
app.use('/addProduct',addProduct)//url,router
app.use('/editproduct',editproduct)

app.listen(2000,()=>{
    console.log('server is running...')
})