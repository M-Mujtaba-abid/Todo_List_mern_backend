import dotenv from "dotenv"
import mongoDbConnection from "./src/db/dataBase.js"
import app from "./src/app.js"
// dotenv.config()

dotenv.config({
    path:"./.env"
})  

const PORT = process.env.PORT || 5000;

mongoDbConnection()

app.listen(PORT,()=>{
    console.log("server running on the port",PORT)
})