const express = require("express")
const db = require("../db")
const path = require("path")
const messageRoutes = new express.Router()



//this route is supposed to get details about a message
messageRoutes.get("/:id", async function (req,res){
    const id = req.params.id
    try{
        const results = await db.query("SELECT * FROM messages WHERE id = $1", [id])
        if(results.rows[0]){
            const message = results.rows[0]
            return res.json({message:{id:message.id,
                body:message.body ,
                 sent_at:message.sent_at, 
                 read_at:message.read_at}})
        }else{
            return " nah work "
        }
    }catch(e){
        return "blah"
    }
    
})



/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/






messageRoutes.get("/", async function(req,res){
    const username = (req.query.username)
    if(username === "lvictor"){
        return res.sendFile("./templates/home.html", {root: path.dirname(__dirname)})
    }else{
        return res.send("error invalid username ")
    }

    
    
})




messageRoutes.post("/", async function(req,res){
    return res.send("P O S T    R O U T E ")
})
/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/





messageRoutes.get("/:id/read" , async function(req , res){
    return res.send("random")
})
/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

module.exports = {
    messageRoutes
}