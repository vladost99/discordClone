const serverStore = require('../store');
const FriendsUpdate = require('../updates/friendsUpdates');
const FriendsService = require('../../services/friendsService');
const ChatUpdates = require('../updates/chatUpdates');
const RoomUpdates = require('../updates/roomUpdates');
const RoomHandlers = require('./roomHandlers');

class ConnectionSocketHandlers {
   async newConnectionHandler(socket, io) {
        const userDetails = socket?.user;
        serverStore.addNewConnectedUser({
            socketId: socket?.id,
            userId: userDetails._id
        });

        await Promise.all([
            FriendsUpdate.updatePendingInvitations(userDetails._id, FriendsService.getInvites),
            FriendsUpdate.updateFriends(userDetails._id),
            ChatUpdates.getInitialCounters(socket.id, userDetails._id),
        ]);
        RoomUpdates.update(socket.id);

    }
    disconnect(socket) {
        const activeRooms = serverStore.getActiveRooms();

        activeRooms.forEach(r => {
            const userInRoom = r.participants.some(p => p.socketId === socket.id);

            if(userInRoom) {
                RoomHandlers.leave(socket, r);
            }
        });
        RoomUpdates.update();

        serverStore.removeConnectedUser(socket.id);
    }
}

module.exports = new ConnectionSocketHandlers();