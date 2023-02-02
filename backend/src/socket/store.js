const {v4: uuidv4} = require('uuid');

class ServerStore {
    connectedUsers = new Map();
    activeRooms = [];
    io = null;

    setSocketServerInstance(ioInstance) {
        this.io = ioInstance;
    }
    setActiveChat(userId, receiverUserId) {
        const connectionSockets = this.getActiveConnections(userId);

        for(let val of connectionSockets) {
            let find = false;
            
            for(let [value, key] of this.connectedUsers) {
                if(value === val) {
                    find = true;
                    this.connectedUsers.set(value, {...key, activeChatWith: receiverUserId});    
                    break;
                }
            }
            if(find) {
                break;
            }
        }
        this.displayConsoleMapUsers();
    }
    getStore() {
        return this.connectedUsers;
    }
    getSocketServerInstance() {
        return this.io;
    }
    displayConsoleMapUsers() {
        console.log('Connected Users');
        console.log(this.connectedUsers);
    }
    displayConsoleActiveRooms() {
        console.log(`Active Rooms`, this.activeRooms);
    }
    addNewConnectedUser({ socketId, userId}) {
        this.connectedUsers.set(socketId, { userId });
        this.displayConsoleMapUsers();
    }
    removeConnectedUser(socketId) {
        if(this.connectedUsers.has(socketId)) {
            this.connectedUsers.delete(socketId);
        }
        this.displayConsoleMapUsers();
    }
    getActiveConnections(userId) {
        const activeConnections = [];

        this.connectedUsers.forEach((value, key) => {
            if(value.userId === userId) {
                activeConnections.push(key)
            }
        });
        return activeConnections;
    }
    getActiveConnectionsFullData(userId) {
        const activeConnections = [];

        this.connectedUsers.forEach((value, key) => {
            if(value.userId === userId) {
                activeConnections.push({socketId: key, data: value});
            }
        });
        return activeConnections;
    }
    getOnlineUsers() {
        const onlineUsers = [];

        this.connectedUsers.forEach((value, key) => {
            onlineUsers.push({ socketId: key, userId: value.userId});
        });

        console.log('Online users', onlineUsers);

        return onlineUsers;

    }
    addNewActiveRoom(userId, socketId) {
        const newActiveRoom = {
            roomCreator: {
                userId,
                socketId
            },
            participants: [{userId, socketId}],
            roomId: uuidv4()
        };
        this.activeRooms.push(newActiveRoom);
        this.displayConsoleActiveRooms();
        
        return newActiveRoom;
    }
    getActiveRooms() {
        return [...this.activeRooms];
    }
    getActiveRoom(roomId) {
        return this.activeRooms.find(r => r.roomId === roomId);
    }
    joinActiveRoom(roomId, participant) {
        const room = this.getActiveRoom(roomId);
        this.activeRooms = this.activeRooms.filter(r => r.roomId !== roomId);
        room.participants = room.participants.filter(p => p.userId !== participant.userId);
        room.participants.push(participant);
        this.activeRooms.push(room);
    }
    leaveActiveRoom(roomId, socketId) {
        const room = this.getActiveRoom(roomId);

        if(room) {
            const copyActiveRoom = {...room};
            copyActiveRoom.participants = copyActiveRoom.participants.filter(p => p.socketId !== socketId);
            this.activeRooms = this.activeRooms.filter(r => r.roomId !== roomId);
            
            if(copyActiveRoom.participants.length > 0) {
                this.activeRooms.push(copyActiveRoom);
            }
        }
    }
}

const store = new ServerStore();

module.exports = store;
