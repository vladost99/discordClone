import ChatEmitter from "socket/emitters/ChatEmitter";
import { store } from "redux/store";
import { setChoosenChatDetails, setCounter, clearMessages } from "./slice";
import { openAlertMessage } from 'redux/alert/slice';
import { getFriends } from "redux/friends/selector";


class ChatHandlers {
    sendMessage(data) {
        ChatEmitter.sendMessageEmit(data);
    }
    setActiveAndGetHistory(id) {
        ChatEmitter.setActiveChatAndGetChatHistory(id);
    }
    setActiveConversation(data) {
        store.dispatch(setChoosenChatDetails(data));
    }
    setCountForChat(data) {
        store.dispatch(setCounter(data));
        const friends = getFriends();

        const findFriend = friends.find(f => f.id === data.convWith);

        if(findFriend && data.count > 0) {
            store.dispatch(openAlertMessage(`You received new message from ${findFriend.name}`));
        }
    }
    leaveConversation() {
        ChatEmitter.leaveConversation();
        this.setActiveConversation({
            chatDetails: null,
            chatType: null,
        });
        store.dispatch(clearMessages());

    }
}

export default new ChatHandlers();