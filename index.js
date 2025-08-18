import dotenv from "dotenv"
import mongoDbConnection from "./src/db/dataBase.js"
import app from "./src/app.js"
// dotenv.config()

dotenv.config({
    path:"./.env"
})



mongoDbConnection()

app.listen(process.env.PORT,()=>{
    console.log("server running on the port",process.env.PORT)
})