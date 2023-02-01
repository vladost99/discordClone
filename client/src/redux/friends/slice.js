import { createSlice } from "@reduxjs/toolkit";
import { inviteFriend } from 'redux/friends/thunk';
import { logout } from "redux/user/thunk";

function getInitialState() {
    return {
        friends: [],
        pendingFriendsInvitations: [],
        onlineUsers: [],
        statusInvitation: ''
    };
}


const initialState = getInitialState();

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
        setPendingFriendInvitation: (state, action) => {
            state.pendingFriendsInvitations = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(inviteFriend.pending, state => {
           state.statusInvitation = 'loading';
        })
        builder.addCase(inviteFriend.fulfilled, (state) => {
            state.statusInvitation = 'success';
            setTimeout(() => {state.statusInvitation = ''}, 1000);
        })
        builder.addCase(logout.fulfilled, () => initialState)
        builder.addCase(logout.rejected, () => initialState)
    }
});


export const { setPendingFriendInvitation, setFriends, setOnlineUsers } = friendsSlice.actions;

export default friendsSlice.reducer;