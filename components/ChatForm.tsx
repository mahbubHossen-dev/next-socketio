'use client'
import React from 'react'

function ChatForm({onSendMessage}: {onSendMessage: (message: string) => void}) {
    const [message, setMessage] = React.useState<string>('')    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submitted', message);
        if(message.trim() !== ''){
            setMessage('')
            onSendMessage(message);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Type your message..." className="border border-gray-300 rounded px-4 py-2 w-full" />
            <button type="submit" className='bg-blue-500 text-white rounded px-4 py-2'>Send</button>
        </form>
    </div>
  )
}

export default ChatForm