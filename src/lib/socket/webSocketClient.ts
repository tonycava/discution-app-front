import io from 'socket.io-client';

const ENDPOINT = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const webSocketClient = io(ENDPOINT, {
  transports: ["polling"],
});

export default webSocketClient;