import dotenv from 'dotenv'
dotenv.config()
import { Server, Socket } from "socket.io"; 
const Frontend_url = process.env.frontend_url
const port = process.env.PORT
if (!port ){
    throw new Error("port is missing")
}
const portnumber =parseInt(port)
 
if(!Frontend_url){
    throw new Error("Frontend url is missing")
}
 const io = new Server(portnumber,{
    cors:{
   origin: Frontend_url
    }
 })
io.on("connection",(socket)=>{

})
console.log(`websocket is running on ${portnumber} `)