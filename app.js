const express = require("express");
const home = require("./routes/home");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const addProduct = require("./routes/addProduct");
const editproduct = require("./routes/editProduct");
const deleteProduct = require("./routes/deleteProduct");
const tryCookie = require("./routes/tryCookie");
const userAuth = require("./routes/userAuth");
const session = require("express-session");
const database = require("./utils/database");
const mySqlStore = require("express-mysql-session")(session); //create internal connection & pool to deal with the tabase to store session
const JWT = require("jsonwebtoken"); //for deal with JWT
app.use(express.static(__dirname));
app.use(cookieParser()); //this enable to access cookie direct into object literal and it is standard one
// Serve static files from node_modules/bootstrap
app.use(express.urlencoded({ extended: true }));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);
// Serve static files from node_modules/bootstrap-icons
app.use(
  "/bootstrap-icons",
  express.static(path.join(__dirname, "node_modules/bootstrap-icons/font"))
);
//to make assets file used globaly
//configure ejs

app.get("/jwt", (req, res) => {
  //syntax sign({body or payload},secret key(this is key used to varify token in feature),{aditional attributes})
  const token = JWT.sign(
    { isLoggedIn: "true" }, //payload
    "is secret key"
  );
  //to varify token we use jwt.vaify(token,secret key)
  res.cookie("token", token); //send token as cookie
  res.send(token);
});
app.get("/varifytoken", (req, res) => {
  //to varify token
  //const token = req.get('Cookie').split('=')[1].split(';')[0]//to get value fo cookies
  const token = req.cookies.token;//using cookies parser
  console.log(token);
  const decodeToken = JWT.verify(token,"is secret key");
  console.log(decodeToken)//{ isLoggedIn: 'true', iat: 1749125698 } iat is time created issued time

});
//now we must create store for mysql session
const options = {
  connectionLimit: 10, //number of connection can create at once
  port: 3306,
  host: "localhost",
  database: "MyStore",
  user: "root",
  password: "12345678",
  createDatabaseTable: true, //create table automatically with name session if you want to create your own you can put false but you must consider stracture of it
};
const sessionStore = new mySqlStore(options);
app.use(
  session({
    secret: "it is sectrt", //secret key for session
    resave: false, //if it true it will save session in every req but we want save only when page render
    saveUninitialized: false, //save session which is unitialized
    //configure mysql session
    store: sessionStore,
  })
);
app.get("/trySession", (req, res) => {
  //note session is unique to every user
  // console.log(req.session.id)

  res.send(req.session.isLoggedIn);
});

app.set("view engine", "ejs");
//set ejs folder path to look for
app.set("views", "views");
app.use("/", home);
app.use("/addProduct", addProduct); //url,router
app.use("/editproduct/", editproduct);
app.use("/delete-product/", deleteProduct);
app.use("/", userAuth);
app.use("/login", userAuth);
//try cookie
app.use("/tryCookie", tryCookie);

app.listen(2000, () => {
  console.log("server is running...");
});
