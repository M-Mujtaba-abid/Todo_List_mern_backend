// import mongoose from "mongoose";

//  const mongoDbConnection=async()=>{
//    try {
//     const makeConnection=await mongoose.connect(process.env.MONGO_DB)
//     console.log("data base connect ho gya he " , makeConnection.connection.host)
//    } catch (error) {
//       console.log("ye err he db connect krty time database file ",error)
//    }

// }

// export default mongoDbConnection




import mongoose from "mongoose";
import chalk from "chalk";
const mongoDbConnection=async()=>{
   try {
      const connected=await mongoose.connect(process.env.MONGO_DB)
      // console.log("mongo db chal gya he ",connected.connection.host)
      console.log(chalk.green.bold("mongo db chal gya he "))
   } catch (error) {
      console.log(chalk.red.bold( "mogno db me ye err arha he connecting ke time pr "),error)
      process.exit(1)
   }

}
export default mongoDbConnection