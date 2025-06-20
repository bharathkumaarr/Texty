const generateRoomCode = require('../utils/generateRoomCode')
const rooms = {};

function socketHandler(io) {
    io.on('connection', (socket)=>{
    console.log('new user connected: ', socket.id)

    socket.on('disconnect', ()=>{
        console.log('user disconnected: ', socket.id)

        // Loop through all rooms
        for (const [roomCode, users] of Object.entries(rooms)) {
            if (users.has(socket.id)) {
                users.delete(socket.id);

                // Notify others
                socket.to(roomCode).emit('user-left', socket.id);

                // Delete room if empty
                if (users.size === 0) {
                    delete rooms[roomCode];
                    console.log(`🧹 Room ${roomCode} deleted (empty)`);
                }
            }
        }
    })
    socket.on('create-room', ()=>{
        const roomCode  =generateRoomCode();
        socket.join(roomCode);

        rooms[roomCode]=new Set()
        rooms[roomCode].add(socket.id)
        console.log(`Room ${roomCode} created by ${socket.id}`);
        socket.emit('room-created', roomCode)
    })
    socket.on('join-room', (roomCode)=>{
        if (!rooms[roomCode]) {
            rooms[roomCode] = new Set();
        }
        socket.join(roomCode);
        rooms[roomCode].add(socket.id)

        console.log(`${socket.id} joined room ${roomCode}`)
        socket.to(roomCode).emit('user-joined', socket.id)
    })
    socket.on('send-message', ({roomCode, message})=>{
        console.log(`Message in ${roomCode} from ${socket.id}: `, message)

        io.in(roomCode).emit('receive-message', {
            sender: socket.id,
            message,
        }) 
    })

})
}

module.exports = socketHandler