const express = require("express")
const ExpressError = require("../expressError")
const userRoutes = new express.Router()
const db = require("../db")
const path = require("path")



userRoutes.get("/" , async function(req,res,next){
    //get list of users
    try{
        const usersList = await db.query("SELECT * FROM users")
        const list = []
        for(let i = 0 ; i < usersList.length ; i++){
            list.push({usersList})
        }
        return res.json(list);
    }catch(e){
        return next(e)
    }
})




userRoutes.get("/:username" , async function(req , res , next){
    try{
        const username = req.body.username
        const userRes = await db.query("SELECT * FROM users WHERE username = $1" , [username] )
        if(userRes[0].rows){
            return res.json(userRes)
        }
        throw new ExpressError("user not found" , 404)
        
    }catch(err){
        return next(err)
    }
})




userRoutes.get("/:username/to" , async function(req , res , next ){
    // stuck 
})

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/




userRoutes.get("/username/from" , async function(req , res , next){
    //stuck 
})


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

module.exports = userRoutes