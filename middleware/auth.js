const JWT = require('jsonwebtoken');
const { tokenSignature } = require('../utils/gloabal');

//for conditional rendering we make condition global
global.isLoggedIn = 'init';

exports.auth = (req,res,next)=>{//take three paramiter
    const token = req.session.token//we fetch token
    //console.log(token);
    if(req.path==='/logout'){
        global.isLoggedIn = 'init';
        next()
    }else{
        try{
            const decodeToken = JWT.verify(token,tokenSignature)
            console.log(decodeToken) 
            global.isLoggedIn = 'true';//when is succefull login global be true
            next()//this continue sent request so may couse error
        }catch(error){
            if(global.isLoggedIn==='init'){
                next()//to make un registed access home
            }else{
                global.isLoggedIn = 'false';
                res.redirect('/login')
            }
        }    
    }
    //we will uply this middleware to route (edit product,add product,delete,logout)
}