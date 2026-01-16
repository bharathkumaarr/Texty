import React from 'react'
import { useState } from 'react'

function Landing({onCreateRoom, onJoinRoom}) {
    const [roomCode, setRoomCode] = useState('')
  return (
    <div className='font-mono min-h-screen flex flex-col items-center justify-center bg-gray-200 text-neutral-900 p-4 selection:bg-gray-400 select-none'>
        <h1 className='sm:text-6xl text-4xl font-bold mb-2 text-cente'>Texty</h1>
        {/* <h6 className='text-lg'>------------------------------------------------------------</h6> */}
        <h1 className='sm:text-3xl text-xl mb-2 text-center'>Create instant chat rooms with Texty.</h1>
        <h1 className='text-lg sm:text-xl text-center'>Generate a unique code, share it, and chat!</h1>
        <h1 className='text-lg sm:text-xl mb-4 text-center'>Rooms vanish when everyone leaves, no sign-up needed.</h1>
        <h6 className='text-sm sm:text-lg text-center select-none'>---------------------------------------------</h6>
        <button
            onClick={onCreateRoom}
            className='bg-gray-200 hover:bg-gray-300 h-11 w-full max-w-xs rounded-xl text-lg font-semibold mb-2 border border-neutral-900 mt-4 cursor-pointer select-none'
        >
            Create New Room
        </button>
        <h6 className='text-lg select-none'>----------or----------</h6>
        <div className='flex flex-col items-center'>
            <input 
                type="text" 
                placeholder='Enter Room Code'
                value = {roomCode}
                onChange={(e)=> setRoomCode(e.target.value.toUpperCase())}
                className='p-2 text-neutral-900 border border-neutral-900 mt-2 rounded-xl mb-2 h-11 w-56 outline-none text-lg select-none'
                />
            <button onClick={()=>onJoinRoom(roomCode)}
                disabled={!roomCode}
                className='bg-neutral-900 hover:bg-neutral-800 h-11 w-56 rounded-xl border font-semibold disabled:opacity-50 text-slate-200 text-lg cursor-pointer select-none'> Join Room
            </button>
        </div>
        <h6 className='select-none text-xs mt-2 text-red-500'>If backend isn't responding, <a href="https://texty-hdnc.onrender.com" target='_blank' className='underline'>Click here</a> and try again.</h6>
        <h3 className='absolute top-3 border p-2 rounded-3xl pl-4 pr-4'>NEW: Instant Video Chat Room Coming Soon!</h3>

        <div className='flex flex-col items-center mt-48 text-xs text-neutral-900 select-none'>
            <h1>Give it a ⭐️ on github</h1>
            <a href="https://github.com/bharathkumaarr/Texty" className='flex border rounded-full p-1 items-center hover:scale-102 border-neutral-900 transition-transform duration-300 ease-in-out hover:bg-gray-300 mt-1' target='_blank'>
                <img className='h-8 mr-2 rounded-full' src="/bharathkumaarr-github.jpeg" alt=""/>
                <h5 className='text-xs text-neutral-900'>@bharathkumaarr</h5>

            </a>
            
        </div>
    </div>
  )
}

export default Landing
