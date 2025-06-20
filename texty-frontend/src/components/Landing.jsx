import React from 'react'
import { useState } from 'react'

function Landing({onCreateRoom, onJoinRoom}) {
    const [roomCode, setRoomCode] = useState('')
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-slate-200 text-neutral-900 p-4'>
        <h1 className='text-6xl font-bold mb-2'> Texty</h1>
        <h1 className='text-3xl mb-2'>Create instant chat rooms with Texty</h1>
        <h1 className='text-xl'>generate a unique code, share it, and chat!</h1>
        <h1 className='text-xl mb-4'>Rooms vanish when everyone leaves, no sign-up needed.</h1>
        <button
            onClick={onCreateRoom}
            className='bg-slate-200 hover:bg-gray-300 h-11 w-56 rounded-2xl text-lg font-semibold mb-2 border border-neutral-900'
        >
            Create New Room
        </button>
        <div className='flex flex-col items-center'>
            <input 
                type="text" 
                placeholder='Enter Room Code'
                value = {roomCode}
                onChange={(e)=> setRoomCode(e.target.value.toUpperCase())}
                className='p-2 text-neutral-900 border border-neutral-900 rounded-2xl mb-2 h-11 w-56 outline-none text-lg'
                />
            <button onClick={()=>onJoinRoom(roomCode)}
                disabled={!roomCode}
                className='bg-neutral-900 hover:bg-neutral-800 h-11 w-56 rounded-2xl border font-semibold disabled:opacity-50 text-slate-200 text-lg'> Join Room
            </button>
        </div>
    </div>
  )
}

export default Landing
