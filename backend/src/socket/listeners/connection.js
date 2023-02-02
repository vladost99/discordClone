const serverStore = require('../store');
const connectionHandler = require('../handlers/connectionHandler');
const FriendsUpdate = require('../updates/friendsUpdates');
const { listenChatListeners } = require('./chat');
const { listenRoomListeners } = require('./room');


let io = serverStore.getSocketServerInstance();

io.on('connection', async (socket) => {
    connectionHandler.newConnectionHandler(socket, io);
    FriendsUpdate.emitOnlineUsers();


    listenChatListeners(socket);
    listenRoomListeners(socket);

    socket.on('disconnect', () => {
        connectionHandler.disconnect(socket);
    });

    setInterval(() => {
        FriendsUpdate.emitOnlineUsers();    
    }, 1000 * 8);

});
