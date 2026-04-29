import { io } from "socket.io-client";

// Use the API URL from environment variables, or fallback to the Render URL.
// We remove '/api' from the end because socket.io needs the base domain.
const backendUrl = import.meta.env.VITE_API_URL 
    ? import.meta.env.VITE_API_URL.replace('/api', '') 
    : 'https://block-stay.onrender.com';

const socket = io(backendUrl, {
    withCredentials: true
});

export default socket;