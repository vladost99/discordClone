const modelMessage = require('../models/message');
const modelConversation = require('../models/conversation');
const MessageService = require('./messageService');
const CountersService = require('./countersService');


class ChatService {
    async sendMessage(msg) {
      return modelMessage.create(msg);
    }
    async sendMessageDirect(data) {
       const msg = await this.sendMessage(MessageService.formatDirectMessage(data));
       return msg;
    }
    async checkConversationAndPushMessage(userId, receiverId, messageId) {
        let conversation = await modelConversation.findOne({
            participants: {$all: [userId, receiverId]}
        });

        if(conversation) {
            conversation.messages.push(messageId);
            await conversation.save();
        }
        else {
          conversation =  await modelConversation.create({
                messages:[messageId],
                participants: [userId, receiverId]
            });
          await CountersService.create(userId, receiverId, conversation._id);
        }
        
        return conversation;
    }
    async findConversationAndPopulateMessages(convId) {
        const conversation = await modelConversation.findById(convId).populate({
            path: 'messages',
            model: 'Message',
            populate: {
                path: 'author',
                model: 'User',
                select: 'name _id'
            }
        });
        return conversation;
    }
    async findConversationByParticipantsChatDirect(userId, receiverUserId) {
        return modelConversation.findOne({participants: {$all: [userId, receiverUserId]}});
    }
    async findConversationById(id) {
        const conversation = await modelConversation.findById(id);
        return conversation;
    }
}


module.exports = new ChatService();