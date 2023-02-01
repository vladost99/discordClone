import  io from 'socket.io-client';
import friendsListeners from './listeners/friends';
import chatListeners from './listeners/chat';
import roomListeners from './listeners/room';
import { BASE_URL } from 'api';

class Socket {
    socket = null;
    
    connectWithSocketServer(userDetails) {
        this.socket = io(BASE_URL, {
            auth: {
                token: userDetails.accessToken
            }
        });

        this.socket.on('connect', () => {   
            friendsListeners.turnOnListeners(this.socket);
            chatListeners.turnOnListeners(this.socket);
            roomListeners.turnOnListeners(this.socket);
        });

    }
    disconect() {
        this.socket.disconnect();
    }
    getInstance() {
        return this.socket;
    }
}

const socket = new Socket();


export default socket;


