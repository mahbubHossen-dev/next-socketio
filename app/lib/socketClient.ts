'use client'
import { io } from "socket.io-client";
export const socket = io("https://next-socketio.onrender.com", {
    transports: ["websocket"]
  })
