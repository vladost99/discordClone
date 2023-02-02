const serverStore = require('../store');
const ChatService = require('../../services/chatService');
const CountersService = require('../../services/countersService');
const UserService = require('../../services/userService');

class ChatUpdates {
    async updateChatHistory(convId, toSpecifiedSocketId = null) {
        const conversation = await ChatService.findConversationAndPopulateMessages(convId);
        
        if(conversation) {
            const io = serverStore.getSocketServerInstance();

            if(toSpecifiedSocketId) {
                io.to(toSpecifiedSocketId).emit('direct-chat-history', conversation);
                let store = serverStore.getStore();
                const { userId, activeChatWith } = store.get(toSpecifiedSocketId);
                io.to(toSpecifiedSocketId).emit('chat-counters', {conv_id: conversation._id, count: 0, convWith: activeChatWith});
                await CountersService.reset(userId, conversation._id);
                return
            }
            

            const lastMessage = conversation.messages[conversation.messages.length - 1];

            const receiver = conversation.participants.filter(participant => participant.toString()  !== lastMessage.author._id.toString())[0].toString();
            const sender = conversation.participants.filter(participant => participant.toString() == lastMessage.author._id.toString())[0].toString();


            const activeConnectionsSender = serverStore.getActiveConnections(sender);
            activeConnectionsSender.forEach((socketId) => {
                    io.to(socketId).emit('direct-chat-history', conversation);
            });

            const activeConnectionReceiver = serverStore.getActiveConnectionsFullData(receiver);
            const activeChatReceiver = activeConnectionReceiver.filter(el => el.data.activeChatWith && el.data.activeChatWith === sender);
            
            
            if(activeChatReceiver.length > 0) {
                activeChatReceiver.forEach(el => {
                    io.to(el.socketId).emit('direct-chat-history', conversation);
                })
            }

            if(activeConnectionReceiver.length > 0 && activeChatReceiver.length === 0) {
                const counters = await CountersService.updateIncrease(receiver, conversation._id);
                const unreadMessages = counters.unreadMessages.find(el => el.user === receiver);

                activeConnectionReceiver.forEach(el => {
                    io.to(el.socketId).emit('chat-counters', {conv_id: counters.conversation_id, count: unreadMessages.count, convWith: sender});
                })
                return;
            }


            if(activeConnectionReceiver.length === 0 || activeChatReceiver.length === 0) {
               await CountersService.updateIncrease(receiver, conversation._id);
            }
              
        }

    }

    async getInitialCounters(socketId, userId) {

        const user = await UserService.findUserById(userId);
        
        let counters = await Promise.all(user.friends.map(async friend => {
            const res = await CountersService.findCountersByParticipant(userId, friend);
            return res ? res : null
        }));

        counters = counters.filter(el => el !== null);
        const userUnreadMessageCount = [];

        counters.forEach(c => {
         
            
                let find = c.unreadMessages.find(el => el.user === userId);

                if(find) {
                    userUnreadMessageCount.push({
                        conv_id: c.conversation_id,
                        count: find.count,
                        convWith: c.participants.filter(participant => participant !== userId)[0].toString()
                    });
                }
            
        });

        const io = serverStore.getSocketServerInstance();

        userUnreadMessageCount.forEach(el => {
            io.to(socketId).emit('chat-counters', el);
        })    
    }
}


module.exports = new ChatUpdates();