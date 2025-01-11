const express = require("express");
const main = require("../db/mongo")
main()
const app = express();



// routes
const user_route= require("../route/user_route")
const error= require("../middleware/error")

app.use(express.json())
app.use(error)
app.use("/api/v1/user",user_route)


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`port is on @ ${port}`);
});
