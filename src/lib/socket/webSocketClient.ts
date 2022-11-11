import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';
const webSocketClient = io(ENDPOINT);

export default webSocketClient;