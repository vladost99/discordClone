const RoomHandlers = require('../handlers/roomHandlers');

const listenRoomListeners = (socket) => {
     
    socket.on('room-create', () => {
        RoomHandlers.create(socket);
    })

    socket.on('room-join', data => {
        RoomHandlers.join(socket, data);
    });

    socket.on('room-leave', data => {
        RoomHandlers.leave(socket, data);
    });

    socket.on('conn-init', data => {
        RoomHandlers.initConnection(socket, data);
    });

    socket.on('conn-signal', data => {
        RoomHandlers.signalingData(socket, data);
    })

}


module.exports = {listenRoomListeners};
