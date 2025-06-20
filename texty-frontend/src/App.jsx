import {useState, useEffect} from 'react'

import './App.css'
import Landing from './components/Landing'
import {io} from 'socket.io-client'

const socket = io('http://localhost:3000')
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

  const handleJoinRoom =() =>{
    socket.emit('join-room', code);
    setRoomCode(code)
  }

  if (!roomCode) {
    return <Landing onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />
  }

  return (
    <div className='min-h-screen bg-slate-200 text-neutral-900 flex items-center justify-center'>
      <h2 className='text-3xl'> Joined Room: {roomCode}</h2>
    </div>
  ) 
}

export default App
