import { setMessages } from 'redux/chat/slice';
import { store } from 'redux/store';
import { getUserId } from 'redux/user/selector';
import ChatHandlers from 'redux/chat/handlers';

class ChatListeners {
    listenChatHistory(io) {
        io.on('direct-chat-history', data => {
            let userId = getUserId();
            store.dispatch(setMessages({ participants: data.participants, messages: data.messages, userId }));
        });
    }
    listenCounters(io) {
        io.on('chat-counters', data => {
            ChatHandlers.setCountForChat(data);
        })
    }

    turnOnListeners(socket) {
        this.listenChatHistory(socket);
        this.listenCounters(socket);
    }
}


export default new ChatListeners();