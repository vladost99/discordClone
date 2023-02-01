import { store }from 'redux/store';
import { setPendingFriendInvitation, setFriends, setOnlineUsers } from 'redux/friends/slice';

class FriendsListeners {
    listenFriendsInvitations(io) {
        io.on('friends-invitations', data => {
            const { pendingInvitations } = data;
            store.dispatch(setPendingFriendInvitation(pendingInvitations));
        })
    }
    listenFriendsList(io) {
        io.on('friends-list', data => {
            const { friends } = data;
            store.dispatch(setFriends(friends));
        })
    }
    listenOnlineUsers(io) {
        io.on('online-users', data => {
            store.dispatch(setOnlineUsers(data));
        })
    }
    turnOnListeners(socket) {
        this.listenFriendsInvitations(socket);
        this.listenFriendsList(socket);
        this.listenOnlineUsers(socket);
    }
}


export default  new FriendsListeners();