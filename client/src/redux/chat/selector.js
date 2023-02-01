import { store } from "redux/store";

export const chatSelector = state => state.chat;

export const getActiveConversation = () => store.getState().chat.choosenChatDetails;
