import { store } from "redux/store";

export const roomSelector = state => state.room;
export const getRoomID = () => store.getState().room.roomDetails.roomId;
export const getAudiOnly = () => store.getState().room.audioOnly;
export const getLocalStream  = () => store.getState().room.localStream;
export const getRemoteStreams = () => store.getState().room.remoteStreams;
export const getScreenSharingStream = () => store.getState().room.screenSharingStream;