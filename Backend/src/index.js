import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { server } from "./utils/socket.js";

dotenv.config({
  path: "./.env"
});

const port = process.env.PORT || 7000;

connectDB()
.then(() => {
  server.listen(port, () => {
    console.log('Server listening at port:', port);
  });
})
.catch(error => {
  console.log('Database connection error:', error);
  process.exit(1);
});