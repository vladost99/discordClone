const {Schema, model} = require('mongoose');

const FriendInvitationSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('FriendInvitation', FriendInvitationSchema);