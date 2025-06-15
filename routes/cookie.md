//note cookie is created on server and send to client by using url
const express =require('express')
const router = express.Router();

router.get('/',(req,res)=>{
    //create and send cookie to browser and the give value
    //res.setHeader('Set-Cookie','isLoggedIn=true') also
    //res.cookie('isLoggedIn','true')
    // res.send('cookie sent')
    //to read cookie we 
    // const cookie = req.get('cookie')
    // console.log(cookie)
    //const expDate = new Date(Date.now()+5e3).toUTCString()//expre after 5 sec (5(milisec)e3=5^3=5sec)
    // res.setHeader('Set-Cookie','isLoggedIn=true; expires='+expDate)
    //for this format we dont need .toUTCString() anymore
    // const expDate = new Date(Date.now()+5e3)
    // res.cookie('isLoggedIn','true',{expires:expDate})
    //using max-age
    const expDate = new Date(Date.now()+5e3)//expre after 5 sec (5(milisec)e3=5^3=5sec)
    // res.setHeader('Set-Cookie','isLoggedIn=true; max-age=5')
    res.cookie('isLoggedIn','true',{
        //this is security of cookies depend on site requirement
        maxAge:5000,
        httpOnly:true,
        //secure:true not work bcs we dont have https
        sameSite:'strict'//prevent xsrf
    })
    res.send(expDate)
});