const modelFriendInvitation = require('../models/friendInvitation');
const modelUser = require('../models/user');
const FriendsError = require('../exeptions/friendsError');
const friendsUpdateSocket = require('../socket/updates/friendsUpdates');

class FriendService {
    async invite({ receive_mail, sender_user }) {
        if(receive_mail === sender_user.mail) throw FriendsError.InvitationYourself();

        const targetUser = await modelUser.findOne({
            mail: receive_mail
        });

        if(!targetUser) throw FriendsError.NotFound(receive_mail);

        const invitationAlreadyReceived = await modelFriendInvitation.findOne({
            senderId: sender_user._id,
            receiverId: targetUser._id
        });

        if(invitationAlreadyReceived) throw FriendsError.InvitationAlreadyExist();

        const usersAlreadyFriends = targetUser.friends.find(friendId => friendId.toString() === sender_user._id.toString());

        if(usersAlreadyFriends) throw FriendsError.FriendAlreadyExist();

        const newInvitation = await modelFriendInvitation.create({
            senderId: sender_user._id,
            receiverId: targetUser._id
        });

        await friendsUpdateSocket.updatePendingInvitations(targetUser._id.toString(), this.getInvites);

        return newInvitation;
    }
    async getInvites(userId) {
        return  modelFriendInvitation.find({receiverId: userId}).populate('senderId', '_id name mail');
    }
    async rejectInvite(docId, userId) {
        const invtitationExits = await modelFriendInvitation.exists({_id: docId});

        if(invtitationExits) {
            await modelFriendInvitation.findByIdAndDelete(docId);
        }

        await friendsUpdateSocket.updatePendingInvitations(userId, this.getInvites);
    }
    async acceptInvite(docId, userId) {
        const invitation = await modelFriendInvitation.findById(docId);

        if(!invitation) throw FriendsError.NotFoundInvite()

        const { senderId, receiverId } = invitation;
        
        const userSender = await modelUser.findById(senderId);
        userSender.friends = [...userSender.friends, receiverId];
        await userSender.save();
        
        const userReceiver = await modelUser.findById(receiverId);
        userReceiver.friends = [...userReceiver.friends, senderId];
        await userReceiver.save();

        await modelFriendInvitation.findByIdAndDelete(docId);
        await friendsUpdateSocket.updatePendingInvitations(userId, this.getInvites);
        await friendsUpdateSocket.updateFriends(userId.toString());
        await friendsUpdateSocket.updateFriends(senderId.toString());
    }
}

module.exports = new FriendService();