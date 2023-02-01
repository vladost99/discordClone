const serverStore = require('../store');
const modelUser = require('../../models/user');

class FriendsUpdates {
    async updatePendingInvitations(userId, getInvites) {
        try {
            const pendingInvitations = await getInvites(userId);
            const receiverList = serverStore.getActiveConnections(userId);
            const io = serverStore.getSocketServerInstance();

            receiverList.forEach(receiverSocketId => {
                io.to(receiverSocketId).emit('friends-invitations', {
                    pendingInvitations: pendingInvitations ? pendingInvitations : []
                })
            })

        }
        catch(err) {
           console.log('friendUpdate sendPendigInvitations',err)
        }
    }
    async updateFriends(userId) {
        const receiverList = serverStore.getActiveConnections(userId);

        if(receiverList.length > 0) {
            const user = await modelUser.findById(userId, {_id: 1, friends: 1}).populate(
                'friends',
                '_id name mail'
            );
    
            if(user) {
                const friendsList = user.friends.map(f => {
                    return {
                        id: f._id,
                        mail: f.mail,
                        name: f.name
                    }
                });
    
                const io = serverStore.getSocketServerInstance();
                receiverList.forEach(receiverSocketId => {
                    io.to(receiverSocketId).emit('friends-list', {
                        friends: friendsList ? friendsList : []
                    })
                })   
            }
        }
    }
    emitOnlineUsers() {
        const onlineUsers = serverStore.getOnlineUsers();
        const io = serverStore.getSocketServerInstance();
        io.emit('online-users', onlineUsers);
    }
}



module.exports = new FriendsUpdates();