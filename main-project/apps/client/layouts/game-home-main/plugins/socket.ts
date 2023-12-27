import { io } from 'socket.io-client';
const baseURL = 'ws://localhost:8080/';

const socket = io(baseURL, {
  transports: ['websocket', 'polling', 'flashsocket'],
  autoConnect: true,
    withCredentials: true,
});


export default socket;