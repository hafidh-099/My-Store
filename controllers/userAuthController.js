const Users = require("../models/users");
const JWT = require('jsonwebtoken');
const { tokenSignature } = require("../utils/gloabal");
const bcrypt = require('bcrypt')



exports.renderSignUp = (req, res) => {
    // const cookie = req.cookies; now instead of sending normal cookie we send session cookes
    //const cookie = req.session.isLoggedIn;
  //res.render("sign-up",{isLoggedIn:cookie.isLoggedIn});//this is work for cookie
  res.render("sign-up",{isLoggedIn:global.isLoggedIn});//this work for session
};
exports.registerUser = async(req, res) => {
    
  //distracture value object
  const { userName, passwd, ConfirmPassword } = req.body;
  try {
    const hashPassword = await bcrypt.hash(passwd,10)
    //const users = new Users(null, userName, hashPassword);//this data go to the database
  await Users.insertUserFunc({userName,password:hashPassword})
    // users.insertUser().then(() => {
      res.redirect("/");
    // });
  } catch (error) {
    console.error('error occure during register user',error);
    res.status(500).redirect('/error')
  }
};
exports.renderLogin = (req, res) => {
    const cookie = req.session.isLoggedIn;
  // res.render("login",{isLoggedIn:cookie});
  res.render("login",{isLoggedIn:global.isLoggedIn});
};
// now we create function to validate
exports.validateLogin = async(req, res) => {
  const { userName, password } = req.body;

  Users.fetchUserByName(userName)
    .then((userCredentials) => {
      
        if(!userCredentials){
            //res.cookie("isLoggedIn", "invalidUsername");this is not better uproach for security reason
            //now instead of use cookie flag(true,false,invalidusername,invalidpassword)to validate we use token to do so
            //req.session.isLoggedIn='invalid username'
               return res.redirect("/login");
        }else{
          const isMatch = bcrypt.compareSync(password,userCredentials.password);
          // console.log(userCredentials.password)
          // console.log(password)
          // console.log(isMatch)
            if (isMatch) {
              //if user is success login we generate token else will redirect to login
              const token = JWT.sign(//this token will be used along with every request in server we need middleware to validate it
                {userName},
                tokenSignature)
              //now we send token as cookie
              req.session.token =token;//note jwt is enought to work with session(we dont need session any more). but for this project we implment both for easier task
              //let set cookie value with session and send to the client
              //  res.cookie("isLoggedIn", "true");//this is not good for security
             // req.session.isLoggedIn='true'//now we use session 
                res.redirect("/");
              } else {
                 //req.session.isLoggedIn="invalidPassword"
                res.redirect("/login");
              }
        }
    })
};
//functionality for log out
exports.logout=(req,res)=>{
  //req.session.isLoggedIn ='false' when user log out we must delte cookies
  req.session.destroy(req.session.id);
  res.redirect('/')
}