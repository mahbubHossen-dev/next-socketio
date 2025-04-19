'use client'
import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import {socket} from '@/app/lib/socketClient'
import { useEffect, useState } from "react";

export default function Home() {
  const [room, setRoom] = useState<string>('');
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<{ sender: string, message: string }[]>([]);
  const [userName, setUserName] = useState('');


  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prev) => [...prev, data]);
    })

    socket.on('user_joined', (message) => {
      setMessages((prev) => [...prev, { sender: 'system', message }]);
    })

    return () => {
      socket.off('user_joined');
      socket.off('message');
    }

  }, [])
  console.log(messages, 'messages');
  const handleJoinRoom = () => {
    if(room && userName) {
      socket.emit('join-room', { room, username: userName });
      setJoined(true);
    }
  } 

  const handleSendMessage = (message: string) => {
    const data = {room, message, sender: userName};
    setMessages((prev) => [...prev, { sender: userName, message }]);
    socket.emit('message', data);
    // console.log('message', message);
  }

  // console.log(joined, 'joined');
  console.log(room, 'room');
  console.log(userName, 'userName');

  return (
    <div className="justify-center mt-24">

      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Todo: Add chat room</h1>
      </div>
      <div className="w-full max-w-3xl mx-auto mt-8">
        {
          !joined ? (
            <div className="">
              <input type="text" placeholder="Enter your name" onChange={(e) => setUserName(e.target.value)} value={userName} />
              <input type="text" placeholder="Enter Room Name" value={room} onChange={(e) => setRoom(e.target.value)} />
              <button className="bg-blue-500 px-4 py-2 text-white" onClick={handleJoinRoom}>Join Room</button>
            </div>
        )
            : (

              <div>
                <div className="h-[500px] overflow-y-auto border-2 border-gray-300 rounded-lg p-4 mb-4">
                  {
                    messages.map((msg, index) => <ChatMessage key={index} sender={msg.sender} message={msg.message} isOwnMessage={msg.sender === userName} />)
                  }
                </div>
                <ChatForm onSendMessage={handleSendMessage} />
              </div>
            )
        }

      </div>


    </div>
  );
}
