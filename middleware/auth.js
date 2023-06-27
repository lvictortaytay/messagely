//MIDDLEWARE
const jwt = require("jsonwebtoken"); //this is the JSON webtokens ( needed for authentication )
const { SECRET_KEY } = require("../config"); //using the config to obtain constant variables







//middleware that AUTHENTICATES USER-----------------------------------------------------------------------------------------------------------------
function authenticateJWT(req, res, next) {
  try {
    const tokenFromBody = req.body._token;
    const payload = jwt.verify(tokenFromBody, SECRET_KEY);
    req.user = payload; 
    return next()
  } catch (err) {
    return next()
  }
}


// works , implemented with data , but is throwing an error











//middleware that checks if USER us AUTHENTICATED ( LOGGED IN )------------------------------------------------------------------------------------------
function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.send("okay")
  } else {
    return res.send("random")
  }
}














//middleware that makes sure the current USER is browsing the pages!------------------------------------------------------------------------------------------
function ensureCorrectUser(req, res, next) {
  try {
    if (req.user.username === req.params.username) {
      return res.send("random")
    } else {
      return res.send("lol")
    }
  } catch (err) {
    // if a username is not authenticated , then should not autherize a user 
    return res.send("okay")
  }
}










//this is exporting the three middlewares for authentication 
module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser
};
