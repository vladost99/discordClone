import { createSlice } from "@reduxjs/toolkit";
import { fetchUserLogin, fetchUserRegister, logout, checkAuth } from "./thunk";
import LocalStorageService from "Services/localStorage";

const initialState = {
  userDetails: LocalStorageService.getUser(),
  status: "",
  registerStatus: "",
  token: LocalStorageService.getToken(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload.userDetails;
      state.status = "success";
      state.token = action.payload.userDetails.accessToken;
      LocalStorageService.setToken(action.payload.userDetails.accessToken);
      LocalStorageService.setUser(action.payload.userDetails.user);
      LocalStorageService.setRefreshToken(
        action.payload.userDetails.refreshToken
      );
    },
    removeUser: (state) => {
      state.userDetails = null;
      state.status = "error";
      state.token = null;
      LocalStorageService.removeToken();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserLogin.pending, (state) => {
      state.userDetails = null;
      state.status = "loading";
    });
    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      state.userDetails = action.payload.userDetails;
      state.status = "success";
      state.token = action.payload.userDetails.accessToken;
      LocalStorageService.setToken(action.payload.userDetails.accessToken);
      LocalStorageService.setRefreshToken(
        action.payload.userDetails.refreshToken
      );
      LocalStorageService.setUser(action.payload.userDetails.user);
    });
    builder.addCase(fetchUserLogin.rejected, (state) => {
      state.userDetails = null;
      state.status = "error";
      state.token = null;
      LocalStorageService.removeToken();
    });

    builder.addCase(checkAuth.pending, (state) => {
      state.userDetails = null;
      state.status = "loading";
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.userDetails = action.payload.userDetails;
      state.status = "success";
      LocalStorageService.setToken(action.payload.userDetails.accessToken);
      LocalStorageService.setRefreshToken(
        action.payload.userDetails.refreshToken
      );
      state.token = action.payload.userDetails.accessToken;
      LocalStorageService.setUser(action.payload.userDetails.user);
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.userDetails = null;
      state.status = "";
      state.token = null;
      LocalStorageService.removeToken();
    });

    builder.addCase(fetchUserRegister.pending, (state) => {
      state.userDetails = null;
      state.registerStatus = "loading";
    });
    builder.addCase(fetchUserRegister.fulfilled, (state) => {
      state.registerStatus = "success";
      setTimeout(() => (state.registerStatus = ""), 700);
    });
    builder.addCase(fetchUserRegister.rejected, (state) => {
      state.userDetails = null;
      state.registerStatus = "error";
    });

    builder.addCase(logout.pending, (state) => {
      state.status = "";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.userDetails = null;
      state.status = "";
      state.token = null;
      LocalStorageService.removeToken();
    });
    builder.addCase(logout.rejected, (state) => {
      state.userDetails = null;
      state.status = "";
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
