import { createAsyncThunk } from "@reduxjs/toolkit";
import { openAlertMessage } from "redux/alert/slice";
import friendsAPI from 'api/friends';

export const inviteFriend = createAsyncThunk(
    'friend/invite',
    async (data, thunkAPI) => {
        try {
            const response = await friendsAPI.invite(data);
            thunkAPI.dispatch(openAlertMessage('Invite was sent!'));
            return response.data.invitation;
        }
        catch (err) {
            thunkAPI.dispatch(openAlertMessage( err?.response?.data?.message  || 'Something went wrong. Please try again'));
            throw new Error(err);
        }
    }
);

export const rejectInvite = createAsyncThunk(
    'friends/rejectInvitation',
    async (data, thunkAPI) => {
        try {
            const response = await friendsAPI.rejectFriendInvitation(data)
            thunkAPI.dispatch(openAlertMessage(response.data.message || 'Invite was sent!'));
            return
        }
        catch (err) {
            thunkAPI.dispatch(openAlertMessage( err?.response?.data?.message  || 'Something went wrong. Please try again'));
            throw new Error(err);
        }
    }
)

export const acceptInvite = createAsyncThunk(
    'friends/acceptInvitation',
    async (data, thunkAPI) => {
        try {
            const response = await friendsAPI.acceptFriendInvitation(data)
            thunkAPI.dispatch(openAlertMessage(response.data.message || 'Invite was sent!'));
            return
        }
        catch (err) {
            thunkAPI.dispatch(openAlertMessage( err?.response?.data?.message  || 'Something went wrong. Please try again'));
            throw new Error(err);
        }
    }
)