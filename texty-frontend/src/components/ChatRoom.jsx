import React from 'react'
import { useState, useEffect } from 'react';

function ChatRoom({socket, roomCode}) {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const handleSend = () => {
        if (message.trim()) {
        socket.emit('send-message', { roomCode, message });
        setMessage('');
        }
    };

    useEffect(() => {
  const handleReceiveMessage = (data) => {
    setChat((prev) => [...prev, data]);
  };

  const handleUserJoined = (userId) => {
    setChat((prev) => [...prev, { system: true, message: `${userId} joined the room` }]);
  };

  const handleUserLeft = (userId) => {
    setChat((prev) => [...prev, { system: true, message: `${userId} left the room` }]);
  };

  socket.on('receive-message', handleReceiveMessage);
  socket.on('user-joined', handleUserJoined);
  socket.on('user-left', handleUserLeft);

  return () => {
    socket.off('receive-message', handleReceiveMessage);
    socket.off('user-joined', handleUserJoined);
    socket.off('user-left', handleUserLeft);
  };
}, [socket]);
  return (
    <div className="font-mono h-screen bg-slate-200 text-neutral-900 flex flex-col p-4 items-center">

      <div className='flex justify-between mb-4 w-5xl'>
        <h1 className='text-2xl font-bold'> Texty</h1>
        <h2 className="text-2xl font-semibold">Room: {roomCode}</h2>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 p-2 rounded-2xl bg-gray-300 w-5xl">
        {chat.map((item, index) => (
          <div key={index} className="mb-2">
            {item.system ? (
              <em className="text-gray-400">{item.message}</em>
            ) : (
              <span>
                <strong className="text-neutral-800">{item.sender}: </strong>
                {item.message}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex w-5xl">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 text-neutral-900 rounded-l-2xl bg-gray-300  outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-neutral-900 hover:bg-neutral-800 text-slate-200 text-lg px-4 py-2 rounded-r-2xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom
