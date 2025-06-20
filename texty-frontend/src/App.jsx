import {useState, useEffect} from 'react'

import './App.css'
import Landing from './components/Landing'
import ChatRoom from './components/ChatRoom'
import {io} from 'socket.io-client'

const socket = io('https://texty-hdnc.onrender.com/')
function App() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(()=>{
    socket.on('room-created', (newRoomCode)=>{
      setRoomCode(newRoomCode)
    })
  }, [])

  const handleCreateRoom =()=>{
    socket.emit('create-room');
  };

  const handleJoinRoom =(code) =>{
    socket.emit('join-room', code);
    setRoomCode(code)
  }

  return (
    <>
      {!roomCode ? (
        <Landing onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />
      ) : (
        <ChatRoom socket={socket} roomCode={roomCode} />
      )}
    </>
  ) 
}

export default App
