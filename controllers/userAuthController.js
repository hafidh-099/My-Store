const Users = require('../models/users')

exports.renderSignUp = (req,res)=>{
    res.render('sign-up')
};
exports.registerUser=(req,res)=>{
    //distracture value object
    const{userName,passwd,ConfirmPassword}=req.body;
    console.log()
    const users = new Users(null,userName,passwd);

    users.insertUser().then(()=>{
        res.redirect('/')
    })
}
exports.renderLogin=(req,res)=>{
    res.render('login')
}