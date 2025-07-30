import { io } from 'socket.io-client';

let socket;

export const connectSocket = (token) => {
  socket = io('http://localhost:8000', {
    auth: { token,name:'amol',groupName:'xxxx' },
    transports: ['websocket', 'polling'], // Enable fallback
    reconnectionAttempts: 3,
    withCredentials: true,
    autoConnect: true
  });


    socket.on('connect', () => console.log('Socket connected!'));
  socket.on('connect_error', (err) => console.error('Connection error:', err.message));
  socket.on('disconnect', (reason) => console.log('Disconnected:', reason));



  return socket;
};

export const getSocket = () => {
  if (!socket) throw new Error("Socket not connected");
  console.log("socket connected");
  
  return socket;
};