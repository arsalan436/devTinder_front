import io from "socket.io-client";
import { SOCKET_URL } from "./Constants";

export const createSocketConnection = (token = null) => {
  return io(`${import.meta.env.VITE_BACKEND_URL}`, {// thisis for netlify
    transports: ["websocket"],         // Enforce websocket (no polling fallback)
    reconnection: true,                // Try to reconnect on disconnect
    reconnectionAttempts: 5,           // Number of reconnection tries
    reconnectionDelay: 2000,           // Wait 2s between attempts
    timeout: 10000,                    // 10s connection timeout
  });
};