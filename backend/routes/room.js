const express = require('express')
const router = express.Router()
const {v4: uuidv4} = require('uuid')

const Room = require('../models/Room')



router.post('/create', async(req,res)=>{
    try {
        const roomId = uuidv4()
        const room = new Room({roomId, users: [], messages: [] });
        await room.save()
        res.json({roomId})
    }
    catch (error) {

        res.status(500).json({message: 'Error creating room'})
    }
})


router.get('/:roomId', async (req,res)=>{
    try {
        const room = await Room.findOne({roomId: req.params.roomId})
        if (!room) {
            return res.status(404).json({message: 'Room not found'})
        }
        res.json({roomId: room.roomId, users: room.users})
    } catch (error) {
        res.status(500).json({message: 'Error fetching room'})
    }
})

module.exports = router