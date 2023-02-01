import { createSlice } from "@reduxjs/toolkit";
import { logout } from "redux/user/thunk";

const initialState = {
    isUserInRoom: false,
    isUserRoomCreator: false,
    roomDetails: null,
    activeRooms: [],
    localStream: null,
    remoteStreams: [],
    audioOnly: false,
    screenSharingStream: null,
    isScreenSharingActive: false,
    isUserJoinedWithOnlyAudio: false
};

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setOpenRoom: (state, action) => {
            const { isUserRoomCreator, isUserInRoom } = action.payload;
            state.isUserRoomCreator = isUserRoomCreator;
            state.isUserInRoom =  isUserInRoom;
        },
        setRoomDetails: (state, action) => {
            const { roomDetails } = action.payload;
            state.roomDetails = roomDetails;
        },
        setActiveRooms: (state, action) => {
            state.activeRooms = action.payload;
        },
        setLocalStream: (state, action) => {
            state.localStream = action.payload.stream;
        },
        setAudioOnly: (state, action) => {
            state.audioOnly = action.payload;
        },
        setRemoteStream: (state, action) => {
            state.remoteStreams = action.payload;
        },
        setScreenSharing: (state, action) => {
            const { isScreenSharingActive, screenSharingFunctionality } = action.payload;
            state.isScreenSharingActive = isScreenSharingActive;
            state.screenSharingStream = screenSharingFunctionality;
        },
        setIsUserJoinedWithOnlyAudio: (state, action) => {
            state.isUserJoinedWithOnlyAudio = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(logout.fulfilled, () => initialState)
        builder.addCase(logout.rejected, () => initialState)
    }
});


export const { 
    setIsUserJoinedWithOnlyAudio,
    setOpenRoom,
    setRoomDetails,
    setActiveRooms,
    setLocalStream,
    setAudioOnly,
    setRemoteStream,
    setScreenSharing
    } = roomSlice.actions;

export default roomSlice.reducer;