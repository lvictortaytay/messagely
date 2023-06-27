//MAIN SERVER
const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("./middleware/auth");
const ExpressError = require("./expressError")
const userRoutes = require("./routes/users")
const app = express();
const path = require('path')







// allow both form-encoded and json body parsing ( THESE ARE BOTH PARSING FUNCTION MIDDLEWARE )
app.use(express.json());
app.use(express.urlencoded({extended: true}));






// CORS AND JWT MIDDLEWARE 
app.use(cors());
app.use(authenticateJWT);






//ROUTES
// const userRoutes = require("./routes/users");
const {messageRoutes} = require("./routes/messages");
// const authRoutes = require("./routes/auth");
// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use(express.static('public'));
app.use("/messages", messageRoutes);
app.unsubscribe("/user" , userRoutes)





app.get("/" , async function (req , res){
  return res.sendFile(path.join(__dirname+'/templates/index.html'));
})

app.get("/register", async function(req,res){
  return res.sendFile("./templates/register.html", {root:__dirname})
})
app.get("/login", async function(req,res){
  return res.sendFile("./templates/login.html", {root:__dirname})
})
app.get("/home", async function(req,res){
  return res.sendFile("./templates/home.html", {root:__dirname})
})

// 404 ERROR HANDLER MIDDLEWARE

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});




//GENERAL ERROR HANDLER ( MIDDLEWARE )
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (process.env.NODE_ENV != "test") console.error(err.stack);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
