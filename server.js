/** Server startup for Message.ly. */


const app = require("./app");
const { DB_URI } = require("./server")



app.listen(3000, function () {
  console.log("Listening on 3000");
});