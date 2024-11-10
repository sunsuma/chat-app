import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectToMongoDB from "./db/db.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./sokect/sokect.js";

// const app = express()
const port = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

//middleware
app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/Client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Client", "dist", "index.html"));
});

server.listen(port, () => {
  connectToMongoDB();
  console.log(`server is running http://localhost:${port}`);
});
