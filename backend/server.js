const express = require('express')
require('dotenv').config();
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')


const connectDB = require('./config/db')


const app = express()
const server = http.createServer()
const io = new Server(server, {cors: {origin: '*'}})




app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
    res.json('hi')
})

connectDB()
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`running at port: ${process.env.PORT || 3000}`)
})