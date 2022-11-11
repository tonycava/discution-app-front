import io from 'socket.io-client';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ENDPOINT = import.meta.env.VITE_API_URL;

const webSocketClient = io(ENDPOINT);

export default webSocketClient;