import io from 'socket.io-client';

const ENDPOINT = import.meta.env.VITE_API_URL;

const webSocketClient = io(ENDPOINT);

export default webSocketClient;