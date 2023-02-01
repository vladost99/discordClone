import socket from 'socket/index';

class ChatEmitter {
    sendMessageEmit(data) {
        const io = socket.getInstance();
        io.emit('direct-message', data);
    }
    setActiveChatAndGetChatHistory(receiverUserid) {
        const io = socket.getInstance();
        io.emit('direct-chat-history', receiverUserid);
    }
    leaveConversation() {
        const io = socket.getInstance();
        io.emit('leave-direct-chat');
    }
}

export default new ChatEmitter();