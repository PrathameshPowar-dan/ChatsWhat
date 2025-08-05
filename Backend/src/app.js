import express from "express"
import userRouter from "../src/routes/user.route.js";
import messageRouter from "../src/routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import path from "path";

const app = express()

// Middleware setup
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

// Routes
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
// In app.js
app.get('/health', (req, res) => res.status(200).send('OK'));

// Production setup
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}


app.use(errorHandler);

export default app;

// No need to export app since it's exported from socket.js