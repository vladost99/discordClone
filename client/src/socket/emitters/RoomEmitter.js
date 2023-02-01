import socket from 'socket/index';

class RoomEmitter {
    createRoom() {
        const io = socket.getInstance();
        io.emit('room-create');
    }
    join(data) {
        const io = socket.getInstance();
        io.emit('room-join', data);
    }
    leave(data) {
        const io = socket.getInstance();
        io.emit('room-leave', data);
    }
    connectionInit(data) {
        const io = socket.getInstance();
        io.emit('conn-init', data);
    }
    signalPeerData(data) {
        const io = socket.getInstance();
        io.emit('conn-signal', data);
    }
}

export default new RoomEmitter();