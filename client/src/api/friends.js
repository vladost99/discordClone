import api from './index';


class FriendsAPI {
    name = `/api/friends`;

    async invite(data) {
        return api.post(`${this.name}/invite`, data);
    }
    async acceptFriendInvitation(data) {
        return api.post(`${this.name}/invititaions/accept`, data);
    }
    async rejectFriendInvitation(data) {
        return api.post(`${this.name}/invititaions/reject`, data);
    }
}

export default new FriendsAPI();