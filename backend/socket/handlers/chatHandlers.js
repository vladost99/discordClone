const ChatService = require('../../services/chatService');
const ChatUpdates = require('../updates/chatUpdates');
const serverStore = require('../store');


class ChatHandlers {
   async directMessage(io, data) {
        try {
            const { _id } = io.user;
            const { receiverUserId, content } = data;
            
            const message = await ChatService.sendMessageDirect({userId: _id, content});
            const conversation = await ChatService.checkConversationAndPushMessage(_id,receiverUserId, message._id);

            ChatUpdates.updateChatHistory(conversation._id.toString());
            
        }

        catch(err) {
            console.log(err);
        }
   }
   async directChatHistory({ userId, socketId }, receiverUserId) {
        try {

            const conversation = await ChatService.findConversationByParticipantsChatDirect(userId, receiverUserId);
            serverStore.setActiveChat(userId, receiverUserId);
            
            if(conversation) {
                ChatUpdates.updateChatHistory(conversation._id.toString(), socketId);
            }
        }
        catch(err) {
            console.log(err);
        }
   }
   leaveChat(userId) {
        serverStore.setActiveChat(userId, '');
   }
}

module.exports = new ChatHandlers();