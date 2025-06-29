const express =require('express')
const app = express()
require('dotenv').config()

const generateRoomCode = require('./utils/generateRoomCode')
const cors=require('cors')
const corsOptions = require('./config/corsOptions')

const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer(app)

app.use(cors(corsOptions));
const rooms={} // { roomCode: Set(socketIds) }

const io = new Server(server, {
    cors: {
        origin: "https://usetexty.vercel.app",
        methods: ["GET", "POST"]
    }
})

app.use(express.json())
app.get('/', (req,res)=>{
    res.send('texty backend activated on render')
})


const socketHandler = require('./sockets/chatHandler');
socketHandler(io);

const PORT = process.env.PORT
server.listen(PORT, ()=>{
    console.log(`server running at ${PORT}`)
})
