const express = require("express");
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {

  socket.on("join-user",(data)=>{
    socket.join(data.room)
    socket.to(data.room).emit('user_joined', data)
  });

  socket.on("send_message",(data)=>{
    socket.to(data.room).emit("recieve_message",data)
  });


  socket.on('disconnect',()=>{
      console.log("user disconnected");
  });
});

server.listen(3001, () => {
  console.log("Server is running on the port 3001");
});
