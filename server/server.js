import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

// Allow requests from React
app.use(cors());

// Create an HTTP server from the Express app
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "https://collabrative-white-bord.vercel.app",
  },
});

// Test API
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


io.on("connection", (socket) => {
  console.log("user connected..", socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} wants to join ${roomId}`)
  })
  socket.on("drawing", (data) => {

    socket.to(data.roomId).emit("drawing", data)

  });

  socket.on("start-drawing", (data) => {

    socket.to(data.roomId).emit("start-drawing", data);

  });

  socket.on("stop-drawing", (data) => {

    socket.to(data.roomId).emit("stop-drawing");

  });
  socket.on("clear-board", (data) => {
      io.to(data.roomId).emit("clear-board");
  });
  
  //CAHT MESSAGE EVENT 

  socket.on("send-message",(data)=>{
    
    socket.to(data.roomId).emit("receive-message",data)
  })


  socket.on("disconnect", () => {
    console.log("user disconnected..", socket.id)
  });
});


// Start the server
httpServer.listen(5000, () => {
  console.log("Server started on port 5000");
});