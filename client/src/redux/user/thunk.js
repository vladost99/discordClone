import { createAsyncThunk} from "@reduxjs/toolkit";
import { openAlertMessage } from 'redux/alert/slice';
import authAPI from "api/auth";
import socket from "socket";

export const fetchUserLogin = createAsyncThunk(
    'user/fetchLogin',
    async (data, thunkAPI) => {
       try {
        const response = await authAPI.login(data);
        return response.data;
       }
        catch(err) {
          thunkAPI.dispatch(openAlertMessage( err?.response?.data?.message  || 'Something went wrong. Please try again'));
          throw new Error(err);
        }
    }
);
export const fetchUserRegister = createAsyncThunk(
    'user/fetchRegister',
    async (data, thunkAPI) => {
        try {
            const response = await authAPI.register(data);
            return response.data;
        }
        catch(err) {
          thunkAPI.dispatch(openAlertMessage( err?.response?.data?.message  || 'Something went wrong. Please try again'));
          throw new Error(err);
        }
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async (data, thunkAPI) => {
        
        socket.disconect();

        try {
            await authAPI.logout();
        }
        catch(err) {
            thunkAPI.dispatch(openAlertMessage( err?.response?.data?.message  || 'Something went wrong. Please try again'));
            throw new Error(err);
        }
    }
);

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (data, thunkAPI) => {
        try {
          const response = await authAPI.refresh();
          return response.data;
        }
        catch(err) {
            thunkAPI.dispatch(openAlertMessage( err?.response?.data?.message  || 'Something went wrong. Please try again'));
            throw new Error(err);
        }
    }
)