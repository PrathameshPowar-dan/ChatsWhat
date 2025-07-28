import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
  path: "./.env"
})

var port = process.env.PORT || 7000

connectDB()
.then(()=>{
  app.listen(port,()=>{
    console.log('Listening at port: ',port);
  })
})
.catch(error=>{
  console.log('Catch Connection Error: ',error);
})