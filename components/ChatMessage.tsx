import React from 'react'

interface ChatMessageProps {
    sender: string;
    message: string;
    isOwnMessage: boolean;
}

function ChatMessage({sender, message, isOwnMessage }: ChatMessageProps) {
    const isSystemMessage = sender === 'system';
    return (
        <div className={`flex ${isSystemMessage
                ? 'text-center'
                : isOwnMessage
                    ? 'justify-end'
                    : 'justify-start'
            } mb-3`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${isSystemMessage
                    ? 'bg-gray-800 text-white text-center text-xs'
                    : isOwnMessage
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-black'}`
            }>
                {
                    isSystemMessage && <p className='text-sm font-bold'>{sender}</p>
                }
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ChatMessage