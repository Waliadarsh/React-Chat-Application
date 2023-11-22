import express from 'express'
const app = express();

import http from 'http'
const server = http.createServer(app);
import cors from 'cors'
app.use(cors())

import dotenv from 'dotenv'
dotenv.config()

import { Server } from 'socket.io';
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
})

io.on("connection", (socket)=>{
    console.log("User Connected with socket Id: ",socket.id);

    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`User with Id: ${socket.id} joined room: ${data} `)
    })

    socket.on("send_message",(data)=>{
        console.log("send_message", data);
        socket.to(data.room).emit("receive_message",data);
    })
    socket.on("disconnect",()=>{
        console.log("User Disconnected", socket.id);
    })

})

const PORT = process.env.PORT;
server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
} )