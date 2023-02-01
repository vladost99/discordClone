const ChatHandlers = require('../handlers/chatHandlers');

const listenChatListeners = (socket) => {
    
    socket.on('direct-message', data => {
        ChatHandlers.directMessage(socket, data);
    });

    socket.on('direct-chat-history', data => {
        ChatHandlers.directChatHistory({userId: socket.user._id, socketId: socket.id}, data);
    })

    socket.on('leave-direct-chat', () => {
        ChatHandlers.leaveChat(socket.user._id);
    })

}


module.exports = {listenChatListeners};
