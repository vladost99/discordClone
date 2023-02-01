import { createSlice } from "@reduxjs/toolkit";
import { logout } from "redux/user/thunk";

const initialState = {
    choosenChatDetails: null,
    chatType: null,
    messages: [],
    counters: {}
};

const friendsSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: { 
        setChoosenChatDetails: (state, action) => { 
            state.choosenChatDetails = action.payload.chatDetails;
            state.chatType = action.payload.chatType;
            state.messages = [];
        },
        setMessages: (state, action) => {
           const { participants, messages, userId}  = action.payload;
           const chat = JSON.parse(JSON.stringify(state.choosenChatDetails));

           if(chat && chat.id) {
            
                if(participants.includes(chat.id) && participants.includes(userId)) {
                    state.messages = messages;
                }
                
           }
        },
        clearMessages: (state) => {
            state.messages = [];
        },
        setCounter: (state, action) => {
            const {convWith, count } = action.payload;
            state.counters = {
                ...state.counters,
                [convWith]: count
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(logout.fulfilled, () => initialState)
        builder.addCase(logout.rejected, () => initialState)
    }
});


export const { setChoosenChatDetails, setMessages, setCounter, clearMessages } = friendsSlice.actions;

export default friendsSlice.reducer;