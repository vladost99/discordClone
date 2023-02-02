const serverStore = require('../store');
const RoomUpdates = require('../updates/roomUpdates');

class RoomHandlers {
   create(io) {
        const socketId = io.id;
        const userId = io.user._id;

        const roomDetails = serverStore.addNewActiveRoom(userId, socketId);

        io.emit('room-create', {
            roomDetails
        })

        RoomUpdates.update();
   }
   join(io, data) {
        const roomId = data.roomId;
        const participantDetails = {
            userId: io.user._id,
            socketId: io.id
        };

        const roomDetails = serverStore.getActiveRoom(roomId);
        serverStore.joinActiveRoom(roomId, participantDetails);

        roomDetails.participants.forEach(participant => {
           if(participantDetails.socketId !== participant.socketId) {
                io.to(participant.socketId).emit('conn-prepare', {
                    connUserSocketId: participantDetails.socketId,
                })
           }
        })

        RoomUpdates.update();

   }
   leave(io, data) {
        const roomId = data.roomId;
        
        const activeRoom = serverStore.getActiveRoom(roomId);

        if(activeRoom) {
            serverStore.leaveActiveRoom(roomId, io.id);
            const repeatActiveRoom = serverStore.getActiveRoom(roomId);
            
            if(repeatActiveRoom) {
                repeatActiveRoom.participants.forEach(participant => {
                    io.to(participant.socketId).emit('room-participant-left', {
                        connUserSocketId: io.id
                    })
                })
            }

            RoomUpdates.update();
        }
   }
   initConnection(io, data) {
    const { connUserSocketId } = data;
    const initData = { connUserSocketId: io.id };
    io.to(connUserSocketId).emit('conn-init', initData);
   }
   signalingData(io, data) {
    const { connUserSocketId, signal } = data;
    const signalingData = { signal, connUserSocketId: io.id };
    
    io.to(connUserSocketId).emit('conn-signal', signalingData);
   }
}

module.exports = new RoomHandlers();