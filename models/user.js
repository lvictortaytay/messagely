
const db = require("../db")
const bcrypt = require("bcrypt")
const ExpressError = require("../expressError")




class User {


  //this creates a new user , and should return all of that information when passed in info
  static async register({username, password, first_name, last_name, phone}) {
    const pass = bcrypt.hash(password , 12)
    const results = await db.query(`INSERT INTO users (username , ${pass} , first_name, last_name , phone) VALUES($1,$2,$3,$4,$5)`)
    return results.rows[0]
   }
    
  

  //method checks to see if the username and password is valid then returns a boolean ( should throw an error if user not found )
  static async authenticate(username, password) {
    const userPass = await db.query(`SELECT password FROM users WHERE username = $1`, [username])
    const res = bcrypt.compare(password , userPass)
    if(res){
      return true;
    }
   }


  //this method will update the last login time for a specified user  ( should throw an error if user not found )
  static async updateLoginTimestamp(username) { 
    if(username){
      const timeStamp = `::NOW()`
      await db.query(`UPDATE users SET last_loggedin_at = $1`, [timeStamp])
    }else{
      return new ExpressError(`user not found` , 404)
    }
  }


  //this method gets all of the basic information on all users `[{username , firstname , last_name ,phone} , ...]
  static async all() { 
    const userInfo = await db.query(`SELECT * FROM users`)
    return userInfo
  }


  //this will be a SELECT * query from users by using the username , should return info in json format ( should throw an error if user not found )
  static async get(username) {
    if(username){
      const info = await db.query(`SELECT * FROM users WHERE username =$1`, [username])
      return {user_info: info}
    }else{
      return new ExpressError(`user not found`, 404)
    }
   }





  //this will get all of the messages from a particular user , usign the username ( should throw an error if user not found )
  static async messagesFrom(username) { 
    if(username){
      const res = await db.query(`SELECT body , sent_at , read_at FROM messages WHERE from_username = $1)` , [username])
      return res.rows[0]
    }else{
      return new ExpressError(`user not found` , 404)
    }
  }



  //this will get all the messages that are sent to a particular user , using the username ( should throw an error if user is not found )
  static async messagesTo(username) { }
}


module.exports = User;