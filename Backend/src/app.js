import express from "express"
import userRouter from "../src/routes/user.route.js"
const app = express()

app.use("./api/user", userRouter)

export { app }