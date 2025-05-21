const express = require("express");
const http = require("http");
const socketIo =  require("socket.io");
const cors = require("cors");


const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server,{
    cors:{
        origin:"*",
    },
});

io.on("connetion",(socket)=>{
    console.log("New client connected:", socket.id);

    socket.on("message",(data) =>{
        io.emit("message",data);
});
socket.on("disconnect",()=>{
    console.log("Client disconnected:",socket.id)
});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log(`Server running onn port ${PORT}`)
})