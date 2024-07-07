import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./database.js";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { v4 as uuidV4 } from "uuid"; // Import UUID
import {
  companiesRouter,
  jobRouter,
  userRouter,
  cvRouter,
  industryRouter,
  jobAppliedRouter,
} from "./router/index.js";
import cookieParser from "cookie-parser";
import http from "http"; // Import http to create an HTTP server

dotenv.config();
// Định nghĩa 1 webserver
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Kích hoạt middleware cho phép Express đọc json từ body của request
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(
  fileUpload({
    createParentPath: true,
  })
);
// app.use('/uploads', express.static('uploads'));

//define uri couter
app.use("/company", companiesRouter);
app.use("/job", jobRouter);
app.use("/cv", cvRouter);
app.use("/user", userRouter);
app.use("/industry", industryRouter);
app.use("/appliedjobs", jobAppliedRouter);

// Home route redirects to a unique room
app.get("/meeting", (req, res) => {
  const roomId = uuidV4();
  res.json({ roomId });
});

// Room route renders the room view
app.get("/meeting/:roomID", (req, res) => {
  res.json({ roomId: req.params.roomID });
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Socket.IO connection
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});


const port = process.env.PORT || 3000;

app.listen(port, async () => {
  connectDB();
  console.log(`Webserver is running at http://localhost:${port}`);
});
